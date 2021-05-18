/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { TokenPayload } from '../models/TokenPayload';
import * as functions from 'firebase-functions';


export default function AutorizeAuth(
   req: Request,
   res: Response,
   next: NextFunction
) {
   const authorization = req.headers.authorization
      ?.replace('Bearer', '')
      .replace('bearer', '')
      .trim();
   if (authorization == null) return res.sendStatus(401);
   const secret = functions.config().service.jwt_key as string;
   try {
      const data = jwt.verify(authorization, secret);
      const { email } = data as TokenPayload;
      req.userId = email;
      return next();
   } catch {
      res.sendStatus(401);
   }
}
