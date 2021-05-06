import functions from "firebase-functions";
// import * as firebase from 'firebase-admin';
import express from "express";

import routes from "./Routes";

const app = express();
// const db =firebase.firestore().collection('testes');
// const lista: (() => FirebaseFirestore.DocumentData)[] = [];

app.use(routes);

exports.api = functions.https.onRequest(app);
