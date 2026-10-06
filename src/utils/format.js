// Display helpers shared by the cards and the table

const euro = new Intl.NumberFormat('en-IE', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});

export const formatSalary = (salary) => {
  const value = Number(salary);
  return salary === '' || salary == null || Number.isNaN(value)
    ? '—'
    : euro.format(value);
};

export const formatDate = (isoDate) => {
  if (!isoDate) return '—';
  const date = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return isoDate;
  // e.g. "29 Sep 2015" (toLocaleDateString writes "Sept" in some browsers)
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  return `${date.getDate()} ${month} ${date.getFullYear()}`;
};

export const formatExperience = ({ years, months }) => {
  const parts = [];
  if (years > 0) parts.push(`${years} year${years > 1 ? 's' : ''}`);
  if (months > 0) parts.push(`${months} month${months > 1 ? 's' : ''}`);
  return parts.length ? parts.join(' ') : 'Less than a month';
};
