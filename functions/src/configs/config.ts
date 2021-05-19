/* eslint-disable max-len */
import dotenv from 'dotenv';
import * as functions from 'firebase-functions';

dotenv.config();

class Config {
   APY_KEY =
      process.env.APY_KEY == undefined ?
         functions.config().service.apy_key :
         process.env.APY_KEY;
   AUTH_DOMAIN =
      process.env.AUTH_DOMAIN == undefined ?
         functions.config().service.auth_domain :
         process.env.AUTH_DOMAIN;
   DATABASE_URL =
      process.env.DATABASE_URL == undefined ?
         functions.config().service.database_url :
         process.env.DATABASE_URL;
   PROJECT_ID =
      process.env.PROJECT_ID == undefined ?
         functions.config().service.project_id :
         process.env.PROJECT_ID;
   STORAGE =
      process.env.STORAGE == undefined ?
         functions.config().service.storage :
         process.env.STORAGE;
   MESSAGE =
      process.env.MESSAGE == undefined ?
         functions.config().service.message :
         process.env.MESSAGE;
   APP_ID =
      process.env.APP_ID == undefined ?
         functions.config().service.app_id :
         process.env.APP_ID;
   MEASUREMENT =
      process.env.MEASUREMENT == undefined ?
         functions.config().service.measurement :
         process.env.MEASUREMENT;
   JWT_KEY =
      process.env.JWT_KEY == undefined ?
         functions.config().service.jwt_key :
         process.env.JWT_KEY;
}

export default new Config();
