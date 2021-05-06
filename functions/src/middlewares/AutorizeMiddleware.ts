import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

export function AutorizeAuth(req:Request, res:Response, next:NextFunction){
    const token = req.headers.authorization?.replace('Bearer', '').trim() as string;
    const secret = process.env.JWT_KEY as string;
    const dados = jwt.verify(token, secret)
}