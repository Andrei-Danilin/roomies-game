import { describe, expect, it } from 'vitest';
import { findNewSubscribers } from './subscriber-export';

describe('findNewSubscribers', () => {
  it('returns subscribers not already present in the existing set', () => {
    const result = findNewSubscribers(
      [
        { email: 'a@b.com', subscribedAt: '2026-01-01' },
        { email: 'c@d.com', subscribedAt: '2026-01-02' },
      ],
      new Set(['a@b.com']),
    );

    expect(result).toEqual([{ email: 'c@d.com', subscribedAt: '2026-01-02' }]);
  });

  it('returns an empty array when everyone is already recorded', () => {
    const result = findNewSubscribers([{ email: 'a@b.com', subscribedAt: null }], new Set(['a@b.com']));
    expect(result).toEqual([]);
  });

  it('returns all subscribers when the existing set is empty', () => {
    const subscribers = [
      { email: 'a@b.com', subscribedAt: '2026-01-01' },
      { email: 'c@d.com', subscribedAt: null },
    ];
    expect(findNewSubscribers(subscribers, new Set())).toEqual(subscribers);
  });
});
