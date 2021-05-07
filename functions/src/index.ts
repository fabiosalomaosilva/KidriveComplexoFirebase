import * as functions from "firebase-functions";
import express from "express";

import "./configs/FirebaseConfig";
import routes from "./Routes";

const app = express();

app.use(routes);

exports.api = functions.https.onRequest(app);
