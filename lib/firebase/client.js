import { initializeApp, getApps } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

function createFirebaseApp() {

  const clientCredentials = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
  };

  const apps = getApps();

  if (apps.length <= 0) {
    const app = initializeApp(clientCredentials);

    if (typeof window !== 'undefined') {
      if ('measurementId' in clientCredentials) {
        getAnalytics(app);
      }
    }

    return app;
  }

  console.log(apps);
  return apps[0];
};

export default createFirebaseApp();