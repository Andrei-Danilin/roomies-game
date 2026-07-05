import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { getContent } from '@/lib/content';
import NotifyForm from './NotifyForm';

const content = getContent('en').notify;

describe('NotifyForm', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows an inline error for an invalid email without calling the API', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch');
    const user = userEvent.setup();
    render(<NotifyForm content={content} />);

    await user.type(screen.getByPlaceholderText(content.placeholder), 'not-an-email');
    await user.click(screen.getByRole('button', { name: content.button }));

    expect(screen.getByText(content.error)).toBeInTheDocument();
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('posts to /api/notify and shows the success state on success', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 }));
    const user = userEvent.setup();
    render(<NotifyForm content={content} />);

    await user.type(screen.getByPlaceholderText(content.placeholder), 'a@b.com');
    await user.click(screen.getByRole('button', { name: content.button }));

    expect(await screen.findByText(content.success)).toBeInTheDocument();
  });

  it('shows an inline error when the API call fails', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(new Response(JSON.stringify({ error: 'nope' }), { status: 502 }));
    const user = userEvent.setup();
    render(<NotifyForm content={content} />);

    await user.type(screen.getByPlaceholderText(content.placeholder), 'a@b.com');
    await user.click(screen.getByRole('button', { name: content.button }));

    expect(await screen.findByText(content.error)).toBeInTheDocument();
  });

  it('shows an inline error when fetch itself throws (network failure)', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValue(new Error('network down'));
    const user = userEvent.setup();
    render(<NotifyForm content={content} />);

    await user.type(screen.getByPlaceholderText(content.placeholder), 'a@b.com');
    await user.click(screen.getByRole('button', { name: content.button }));

    expect(await screen.findByText(content.error)).toBeInTheDocument();
  });

  it('ignores a second submit fired while the first request is still in flight', async () => {
    let resolveFetch: (value: Response) => void = () => {};
    const fetchSpy = vi.spyOn(global, 'fetch').mockReturnValue(
      new Promise((resolve) => {
        resolveFetch = resolve;
      }),
    );
    const user = userEvent.setup();
    render(<NotifyForm content={content} />);

    await user.type(screen.getByPlaceholderText(content.placeholder), 'a@b.com');
    const button = screen.getByRole('button', { name: content.button });
    await user.click(button);
    await user.click(button);

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    resolveFetch(new Response(JSON.stringify({ ok: true }), { status: 200 }));
    expect(await screen.findByText(content.success)).toBeInTheDocument();
  });
});
