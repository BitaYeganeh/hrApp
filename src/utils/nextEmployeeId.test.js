import { describe, expect, it } from 'vitest';
import { nextEmployeeId } from './nextEmployeeId';

const withIds = (...ids) => ids.map((id) => ({ id }));

describe('nextEmployeeId', () => {
  it('starts at 1 for an empty list', () => {
    expect(nextEmployeeId([])).toBe('1');
  });

  it('returns one higher than the largest id', () => {
    expect(nextEmployeeId(withIds('1', '2', '3'))).toBe('4');
  });

  it('does not reuse an id after an employee is deleted', () => {
    // Employee "3" was deleted. The old "length + 1" rule gives "4",
    // which already exists, so saving the new employee fails.
    const afterDelete = withIds('1', '2', '4');
    expect(nextEmployeeId(afterDelete)).toBe('5');
    expect(afterDelete.some(({ id }) => id === nextEmployeeId(afterDelete))).toBe(false);
  });

  it('ignores non-numeric ids', () => {
    expect(nextEmployeeId(withIds('1', 'a1b2', '7'))).toBe('8');
  });
});
