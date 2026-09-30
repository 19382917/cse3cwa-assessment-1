import { test, expect } from '@playwright/test';

test('Admin CRUD - Create, Read, Update, Delete a word', async ({ page }) => {
  // Go to the Admin Dashboard
  await page.goto('/admin');
  
  // Wait for the page to load
  await expect(page.locator('h2')).toContainText('Admin Dashboard');
  
  // CREATE: Add a new word
  await page.fill('input[placeholder="English Word"]', 'testword');
  await page.fill('input[placeholder="Phonemes (e.g., θ,ɪ,n)"]', 't,e,s,t');
  await page.click('button:has-text("Add to Database")');
  
  // READ: Verify the word appears in the saved list
  await expect(page.locator('text=testword')).toBeVisible({ timeout: 5000 });
  
  // UPDATE: Click Edit, change the word, and save
  await page.click('button:has-text("Edit")');
  await page.fill('input[placeholder="English Word"]', 'updatedword');
  await page.click('button:has-text("Update Word")');
  
  // Verify the updated word appears
  await expect(page.locator('text=updatedword')).toBeVisible({ timeout: 5000 });
  
  // DELETE: Click Delete and verify it disappears
  await page.click('button:has-text("Delete")');
  await expect(page.locator('text=updatedword')).not.toBeVisible({ timeout: 5000 });
});