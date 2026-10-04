import { describe, expect, it } from 'vitest';
import { getAnimalEmoji } from './animalEmoji';

describe('getAnimalEmoji', () => {
  it('matches names regardless of case and spaces', () => {
    expect(getAnimalEmoji('  Owl ')).toBe('🦉');
  });

  it('falls back to a question mark for missing or unknown animals', () => {
    expect(getAnimalEmoji('')).toBe('❓');
    expect(getAnimalEmoji(undefined)).toBe('❓');
    expect(getAnimalEmoji('unicorn')).toBe('❓');
  });
});
