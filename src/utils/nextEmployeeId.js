/**
 * Next free employee id: one higher than the largest existing numeric id.
 * (Using "number of employees + 1" reuses an existing id after a delete.)
 */
export function nextEmployeeId(employees) {
  const maxId = employees.reduce((max, { id }) => {
    const n = Number(id);
    return Number.isInteger(n) && n > max ? n : max;
  }, 0);
  return String(maxId + 1);
}
