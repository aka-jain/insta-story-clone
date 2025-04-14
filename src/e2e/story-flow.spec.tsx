import { test, expect } from '@playwright/test';

test.describe('Story Viewer Flow', () => {
  test('should autoplay stories and close at end', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    const storyThumbnail = page.locator('[data-test-id="first-story-thumb-1"]');
    console.log(storyThumbnail)
    await expect(storyThumbnail).toBeVisible();
    await storyThumbnail.click();

    const viewer = page.locator('[data-test-id="story-viewer"]');
    await expect(viewer).toBeVisible();

    const progressBars = page.locator('[data-test-id^="progress-bar-"]');
    const count = await progressBars.count();

    await page.waitForTimeout(count * 5000 + 1000);

    const closeButton = page.locator('[data-test-id="cross-icon"]');
    await closeButton.click();

    await expect(viewer).not.toBeVisible();

  });
});
