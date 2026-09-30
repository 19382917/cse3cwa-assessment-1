import { test, expect } from '@playwright/test';

test('Wordle Builder - Generate Playable HTML', async ({ page }) => {
  // Go to the Wordle Builder page
  await page.goto('/wordle');
  
  // Wait for the page to load
  await expect(page.locator('h2')).toContainText('Wordle Builder');
  
  // Verify the Generate button is visible
  await expect(page.locator('button:has-text("Generate Playable HTML")')).toBeVisible();
  
  // Click the Generate button
  await page.click('button:has-text("Generate Playable HTML")');
  
  // Wait a moment for the download to trigger
  await page.waitForTimeout(2000);
  
  // Verify no error messages appeared (which would indicate a failed generation)
  const errorDialog = page.locator('text=No words in the database');
  await expect(errorDialog).not.toBeVisible({ timeout: 3000 });
});