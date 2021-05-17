import firebase from "firebase";
import admin from "firebase-admin";
import * as functions from "firebase-functions";


class FirebaseConfig {
  constructor() {
    const firebaseConfig = {
      apiKey: functions.config().service.apy_key,
      authDomain: functions.config().service.auth_domain,
      databaseURL: functions.config().service.database_url,
      projectId: functions.config().service.project_id,
      storageBucket: functions.config().service.storage,
      messagingSenderId: functions.config().service.message,
      appId: functions.config().service.app_id,
      measurementId: functions.config().service.measurement,
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
