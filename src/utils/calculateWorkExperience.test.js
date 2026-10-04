import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { calculateWorkExperience } from './calculateWorkExperience';

// Freeze "today" so results don't depend on when the tests run
const setToday = (isoDate) => vi.setSystemTime(new Date(`${isoDate}T12:00:00`));

describe('calculateWorkExperience', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('counts whole years and months', () => {
    setToday('2026-10-04');
    expect(calculateWorkExperience('2015-09-29')).toEqual({ years: 11, months: 0 });
  });

  it('returns 0 years 0 months on the first day', () => {
    setToday('2026-10-04');
    expect(calculateWorkExperience('2026-10-04')).toEqual({ years: 0, months: 0 });
  });

  it('does not count a month until the day of the month is reached', () => {
    setToday('2026-04-01');
    // Hired 31 March: one day of work is not "1 month"
    expect(calculateWorkExperience('2026-03-31')).toEqual({ years: 0, months: 0 });
  });

  it('counts the month on the matching day', () => {
    setToday('2026-05-15');
    expect(calculateWorkExperience('2026-04-15')).toEqual({ years: 0, months: 1 });
  });

  it('does not count a year until the anniversary day', () => {
    setToday('2026-10-03');
    expect(calculateWorkExperience('2021-10-04')).toEqual({ years: 4, months: 11 });
  });

  it('handles month-end start dates in shorter months', () => {
    setToday('2026-02-28');
    // 31 Jan -> 28 Feb is a full month (February has no 31st)
    expect(calculateWorkExperience('2026-01-31')).toEqual({ years: 0, months: 1 });
  });

  it('handles a 29 February start date in a non-leap year', () => {
    setToday('2025-02-28');
    expect(calculateWorkExperience('2024-02-29')).toEqual({ years: 1, months: 0 });
  });

  it('never returns negative values for a future start date', () => {
    setToday('2026-10-04');
    expect(calculateWorkExperience('2026-11-01')).toEqual({ years: 0, months: 0 });
  });
});
