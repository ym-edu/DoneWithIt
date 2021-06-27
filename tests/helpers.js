import {
  loadFirestoreRules,
  initializeTestApp,
  initializeAdminApp,
  clearFirestoreData,
} from '@firebase/rules-unit-testing';
import { readFileSync } from 'fs';

const PROJECT_ID = 'rt-test1-dev';

export const setup = async (auth, data) => { // auth: mock user, data: mock data
  // Clear any data from previous tests
  await clearFirestoreData({ projectId: PROJECT_ID });

  // Create DB instances
  const authorizedClient = initializeTestApp({ projectId: PROJECT_ID, auth });
  const db = authorizedClient.firestore();

  const unauthorizedClient = initializeTestApp({ projectId: PROJECT_ID });
  const udb = unauthorizedClient.firestore();

  // Seed DB before applying rules
  if (data) {
    const admin = initializeAdminApp({ projectId: PROJECT_ID });

    for (const key in data) {
      const ref = admin.firestore().doc(key);
      await ref.set(data[key]);
    }
  }

  // Apply rules
  await loadFirestoreRules({
    projectId: PROJECT_ID,
    rules: readFileSync('firestore.rules', 'utf8'),
  });

  return { db, udb };
};

// Delete app when done
export const teardown = async () => {
  Promise.all(firebase.apps().map(app => app.delete()));
  await clearFirestoreData({ projectId: PROJECT_ID });
};