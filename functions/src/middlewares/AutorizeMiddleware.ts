import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import { TokenPayload } from '../models/TokenPayload';

dotenv.config();

export default function AutorizeAuth(req:Request, res:Response, next:NextFunction){
    const authorization = req.headers.authorization?.replace('Bearer', '').replace('bearer', '').trim();
    if(authorization == null) return res.sendStatus(401);
    const secret = process.env.JWT_KEY as string;
    try{
        const data = jwt.verify(authorization, secret);
        const { email } = data  as TokenPayload;
        req.userId = email;
        return next();
    } catch {
        res.sendStatus(401);
    }
}