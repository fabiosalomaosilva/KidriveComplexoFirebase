import firebase from "firebase";
import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

class FirebaseConfig {
  constructor() {
    const firebaseConfig = {
      apiKey: process.env.APY_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      databaseURL: process.env.DATABASE_URL,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE,
      messagingSenderId: process.env.MESSAGE,
      appId: process.env.APP_ID,
      measurementId: process.env.MEASUREMENT,
    };
    const serviceAccount = require("../../fbconfig.json");

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://kidrivecomplexo-default-rtdb.firebaseio.com",
    });
  }
}

export default new FirebaseConfig();
