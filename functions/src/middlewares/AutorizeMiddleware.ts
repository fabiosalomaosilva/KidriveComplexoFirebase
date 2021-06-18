/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { TokenPayload } from '../models/TokenPayload';
import config from '../configs/config';


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
   const secret = config.JWT_KEY as string;
   try {
      const data = jwt.verify(authorization, secret);
      const { email, id, nomeCompleto } = data as TokenPayload;
      req.userId = id;
      req.nome = nomeCompleto;
      req.email = email;
      return next();
   } catch {
      res.sendStatus(401);
   }
}
