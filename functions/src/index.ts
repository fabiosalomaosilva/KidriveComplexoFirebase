import * as functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';

import './configs/FirebaseConfig';
import routes from './Routes';

const app = express();

app.use(cors());
app.use(routes);

exports.api = functions.region('southamerica-east1').https.onRequest(app);
