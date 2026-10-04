/**
 * HR reminders for an employee, based on completed work experience.
 * - Probation review: during the first 6 months (including hires that start soon)
 * - Recognition meeting: during each 5-year milestone year (5, 10, 15, ...)
 */
export function getReminders({ years, months }) {
  const reminders = [];
  if (years === 0 && months < 6) reminders.push('probation');
  if (years > 0 && years % 5 === 0) reminders.push('recognition');
  return reminders;
}
