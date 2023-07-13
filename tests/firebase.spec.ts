import { test, expect } from '@playwright/test';
import {
  initializeApp,
  setLogLevel,
  SDK_VERSION,
  FirebaseApp,
  deleteApp,
} from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
// import { config, testAccount } from '../firebase-config';
import { auth, app } from '../lib/firebase';

test.afterEach(async ({ page }) => {
  signOut(auth);
  deleteApp(app);
});

test.beforeEach(async ({ page, baseURL }) => {
  await page.goto(baseURL!);
});

test('should start on root page', async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await expect(page.locator('h1')).toContainText('Test MVP App');
});

test('should navigate to auth page', async ({ page, baseURL }) => {
  await page.goto(`${baseURL}/auth`);
  await expect(page.locator('h1')).toContainText('Test MVP App - Auth Page');
});
