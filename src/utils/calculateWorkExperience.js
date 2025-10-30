export function calculateWorkExperience(startDate) {
  const start = new Date(startDate);
  const now = new Date();

  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();

  // Fix negative months
  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months };
}
