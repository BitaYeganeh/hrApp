import { describe, expect, it } from 'vitest';
import { getReminders } from './reminders';

describe('getReminders', () => {
  it.each([
    [{ years: 0, months: 0 }, ['probation']],
    [{ years: 0, months: 5 }, ['probation']],
    [{ years: 0, months: 6 }, []], // probation ends at exactly 6 months
    [{ years: 0, months: 11 }, []],
    [{ years: 1, months: 0 }, []],
    [{ years: 4, months: 11 }, []], // the day before the 5-year milestone
    [{ years: 5, months: 0 }, ['recognition']],
    [{ years: 5, months: 11 }, ['recognition']], // whole milestone year
    [{ years: 6, months: 0 }, []],
    [{ years: 10, months: 3 }, ['recognition']],
    [{ years: 15, months: 0 }, ['recognition']],
    [{ years: 11, months: 0 }, []],
  ])('%o -> %o', (experience, expected) => {
    expect(getReminders(experience)).toEqual(expected);
  });
});
