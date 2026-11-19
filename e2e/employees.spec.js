import { expect, test } from '@playwright/test';

const API = 'http://localhost:3101/employees';

// Accept the app's alert()/confirm() dialogs automatically
test.beforeEach(async ({ page }) => {
  page.on('dialog', (dialog) => dialog.accept());
});

const card = (page, name) =>
  page.locator('.MuiCard-root').filter({ hasText: name });

async function addEmployee(page, { name, startDate }) {
  await page.getByRole('link', { name: /add/i }).click();
  const values = {
    name,
    title: 'Junior Developer',
    salary: '3500',
    phone: '040-0000000',
    email: 'new.hire@example.com',
    animal: 'Cat',
    startDate,
    location: 'Helsinki',
    department: 'IT',
    skills: 'React, Testing',
  };
  for (const [field, value] of Object.entries(values)) {
    await page.locator(`#${field}`).fill(value);
  }
  await page.getByRole('button', { name: /add/i }).click();
  await expect(page).toHaveURL(/\/$/);
}

test.describe.serial('Employee management', () => {
  test('lists the employees from the API', async ({ page }) => {
    await page.goto('/');
    await expect(card(page, 'Aino Virtanen')).toBeVisible();
    await expect(card(page, 'Liina Koskinen')).toBeVisible();
    await expect(card(page, 'Mikko Laine')).toBeVisible();
  });

  test('adds an employee with a unique id, even with gaps in existing ids', async ({ page, request }) => {
    await page.goto('/');
    await expect(card(page, 'Aino Virtanen')).toBeVisible();

    await addEmployee(page, { name: 'Sanna Testaaja', startDate: '2026-09-01' });
    await expect(card(page, 'Sanna Testaaja')).toBeVisible();

    // Existing ids are 1, 2, 4: the old "length + 1" rule would reuse "4"
    const employees = await (await request.get(API)).json();
    const ids = employees.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(employees.find((e) => e.name === 'Sanna Testaaja').id).toBe('5');
  });

  test('shows a probation reminder for the new hire', async ({ page }) => {
    await page.goto('/');
    await expect(card(page, 'Sanna Testaaja')).toContainText('Schedule probation review');
  });

  test('edits an employee and keeps the change after reload', async ({ page }) => {
    await page.goto('/');
    const sanna = card(page, 'Sanna Testaaja');
    await sanna.getByRole('button', { name: 'Edit' }).click();

    const location = page.locator('input[name="location"]');
    await location.fill('Tampere');
    await page.getByRole('button', { name: 'Save' }).click();

    await expect(page.getByText('Changes saved!')).toBeVisible();
    await page.reload();
    await expect(card(page, 'Sanna Testaaja')).toContainText('Location: Tampere');
  });

  test('deletes an employee and they do not come back after adding another', async ({ page }) => {
    await page.goto('/');
    await card(page, 'Liina Koskinen').getByRole('button', { name: 'Remove' }).click();
    await expect(card(page, 'Liina Koskinen')).toHaveCount(0);

    // Before the fix, the deleted employee reappeared after the next add
    await addEmployee(page, { name: 'Pekka Uusi', startDate: '2026-10-01' });
    await expect(card(page, 'Pekka Uusi')).toBeVisible();
    await expect(card(page, 'Liina Koskinen')).toHaveCount(0);
  });
});
