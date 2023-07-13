import { test, expect } from '@playwright/test';
import {
  initializeApp,
  setLogLevel,
  SDK_VERSION,
  FirebaseApp,
  deleteApp,
} from 'firebase/app';
import { getAuth, signOut } from 'firebase/auth';
// import { config, testAccount } from '../firebase-config';

const config = {
  projectId: 'jscore-sandbox-141b5',
  appId: '1:280127633210:web:1eb2f7e8799c4d5a46c203',
  databaseURL: 'https://jscore-sandbox-141b5.firebaseio.com',
  storageBucket: 'jscore-sandbox-141b5.appspot.com',
  locationId: 'us-central',
  apiKey: 'AIzaSyBNHCyZ-bpv-WA-HpXTmigJm2aq3z1kaH8',
  authDomain: 'jscore-sandbox-141b5.firebaseapp.com',
  messagingSenderId: '280127633210',
  measurementId: 'G-1VL38N8YFE',
};

const testAccount = {
  email: 'totpuser-donotdelete@test.com',
  password: 'password',
};
let app: FirebaseApp;

test.afterEach(async ({ page }) => {
  signOut(getAuth(app));
  deleteApp(app);
});

test.beforeEach(async ({ page, baseURL }) => {
  await page.goto(baseURL!);
  app = initializeApp(config);
});

test('should start on root page', async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await expect(page.locator('h1')).toContainText('Test MVP App');
});
