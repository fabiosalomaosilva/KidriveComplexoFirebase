import firebase from 'firebase';
import admin from 'firebase-admin';
import serviceAccount from '../fbconfig.json';
import Config from './config';

class FirebaseConfig {
   sa = serviceAccount as admin.ServiceAccount;

   constructor() {
      const firebaseConfig = {
         apiKey: Config.APY_KEY,
         authDomain: Config.AUTH_DOMAIN,
         databaseURL: Config.DATABASE_URL,
         projectId: Config.PROJECT_ID,
         storageBucket: Config.STORAGE,
         messagingSenderId: Config.MESSAGE,
         appId: Config.APP_ID,
         measurementId: Config.MEASUREMENT,
      };

      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      admin.initializeApp({
         credential: admin.credential.cert(this.sa),
         databaseURL: 'https://kidrivecomplexo-default-rtdb.firebaseio.com',
      });
   }
}

export default new FirebaseConfig();
