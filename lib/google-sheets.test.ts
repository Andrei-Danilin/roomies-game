import { generateKeyPairSync } from 'crypto';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { GoogleSheetsError, appendRows, readExistingEmails } from './google-sheets';

const { privateKey } = generateKeyPairSync('rsa', { modulusLength: 2048 });
const TEST_PRIVATE_KEY_PEM = privateKey.export({ type: 'pkcs1', format: 'pem' }).toString();

function mockTokenExchange() {
  return new Response(JSON.stringify({ access_token: 'test-access-token' }), { status: 200 });
}

describe('lib/google-sheets', () => {
  const original = {
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
    sheet: process.env.SUBSCRIBER_BACKUP_SPREADSHEET_ID,
  };

  beforeEach(() => {
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL = 'test@example.iam.gserviceaccount.com';
    process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY = TEST_PRIVATE_KEY_PEM;
    process.env.SUBSCRIBER_BACKUP_SPREADSHEET_ID = 'test-sheet-id';
  });

  afterEach(() => {
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL = original.email;
    process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY = original.key;
    process.env.SUBSCRIBER_BACKUP_SPREADSHEET_ID = original.sheet;
    vi.restoreAllMocks();
  });

  describe('readExistingEmails', () => {
    it('throws GoogleSheetsError when not configured', async () => {
      delete process.env.SUBSCRIBER_BACKUP_SPREADSHEET_ID;
      await expect(readExistingEmails()).rejects.toThrow(GoogleSheetsError);
    });

    it('exchanges the service account JWT for a token, then reads column A', async () => {
      const fetchSpy = vi
        .spyOn(global, 'fetch')
        .mockResolvedValueOnce(mockTokenExchange())
        .mockResolvedValueOnce(
          new Response(JSON.stringify({ values: [['a@b.com'], ['c@d.com']] }), { status: 200 }),
        );

      const emails = await readExistingEmails();

      expect(emails).toEqual(new Set(['a@b.com', 'c@d.com']));
      expect(fetchSpy).toHaveBeenNthCalledWith(1, 'https://oauth2.googleapis.com/token', expect.anything());
      const sheetsCall = fetchSpy.mock.calls[1];
      expect(sheetsCall[0]).toContain('test-sheet-id');
      expect((sheetsCall[1] as RequestInit).headers).toMatchObject({ Authorization: 'Bearer test-access-token' });
    });

    it('returns an empty set when the sheet has no data rows yet', async () => {
      vi.spyOn(global, 'fetch')
        .mockResolvedValueOnce(mockTokenExchange())
        .mockResolvedValueOnce(new Response(JSON.stringify({}), { status: 200 }));

      await expect(readExistingEmails()).resolves.toEqual(new Set());
    });

    it('throws GoogleSheetsError when the Sheets API call fails', async () => {
      vi.spyOn(global, 'fetch')
        .mockResolvedValueOnce(mockTokenExchange())
        .mockResolvedValueOnce(new Response('forbidden', { status: 403 }));

      await expect(readExistingEmails()).rejects.toThrow(GoogleSheetsError);
    });

    it('throws GoogleSheetsError when the token exchange fails', async () => {
      vi.spyOn(global, 'fetch').mockResolvedValueOnce(new Response('bad request', { status: 400 }));
      await expect(readExistingEmails()).rejects.toThrow(GoogleSheetsError);
    });
  });

  describe('appendRows', () => {
    it('does nothing (no HTTP calls) for an empty list', async () => {
      const fetchSpy = vi.spyOn(global, 'fetch');
      await appendRows([]);
      expect(fetchSpy).not.toHaveBeenCalled();
    });

    it('appends email + subscribedAt pairs to the sheet', async () => {
      const fetchSpy = vi
        .spyOn(global, 'fetch')
        .mockResolvedValueOnce(mockTokenExchange())
        .mockResolvedValueOnce(new Response(JSON.stringify({}), { status: 200 }));

      await appendRows([{ email: 'a@b.com', subscribedAt: '2026-01-01' }, { email: 'c@d.com', subscribedAt: null }]);

      const appendCall = fetchSpy.mock.calls[1];
      expect(appendCall[0]).toContain(':append');
      expect((appendCall[1] as RequestInit).body).toBe(
        JSON.stringify({
          values: [
            ['a@b.com', '2026-01-01'],
            ['c@d.com', ''],
          ],
        }),
      );
    });
  });
});
