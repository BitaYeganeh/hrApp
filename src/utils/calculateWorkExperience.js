// Days in a given month (month is 0-based, like Date#getMonth)
const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

/**
 * Completed years and months of work since startDate (YYYY-MM-DD).
 * A month only counts once its day is reached (31 Mar -> 1 Apr is 0 months),
 * month-end start dates count on the last day of shorter months, and a
 * start date in the future returns 0 years 0 months instead of negatives.
 */
export function calculateWorkExperience(startDate, today = new Date()) {
  const [year, month, day] = String(startDate).split('-').map(Number);
  if (!year || !month || !day) return { years: 0, months: 0 };

  const startMonth = month - 1;
  let totalMonths =
    (today.getFullYear() - year) * 12 + (today.getMonth() - startMonth);

  // e.g. started on the 31st: in a 30-day month the "monthiversary" is the 30th
  const dueDay = Math.min(
    day,
    daysInMonth(today.getFullYear(), today.getMonth())
  );
  if (today.getDate() < dueDay) totalMonths--;

  if (totalMonths < 0) return { years: 0, months: 0 };

  return { years: Math.floor(totalMonths / 12), months: totalMonths % 12 };
}
