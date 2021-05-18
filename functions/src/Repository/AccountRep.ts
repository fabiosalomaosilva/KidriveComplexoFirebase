import { Request } from 'express';
import firebase from 'firebase';
import admin from 'firebase-admin';
import jwt from 'jsonwebtoken';
import { UserRegister } from '../models/UserRegister';
import * as functions from 'firebase-functions';

class AccountRep {
   async login(email: string, password: string) {
      try {
         const userCredential = await firebase
            .auth()
            .signInWithEmailAndPassword(email, password);
         const userEmail = userCredential.user?.email;
         if (userEmail != null) {
            const user = await admin.auth().getUserByEmail(userEmail);
            const secret = functions.config().service.jwt_key;
            user.passwordHash = undefined;
            const token = jwt.sign(
               user,
               secret as string,
               { expiresIn: '20d' }
            );
            return {
               user,
               token: token,
            };
         }
         return null;
      } catch (error) {
         throw error;
      }
   }

   async createUser(user: UserRegister, req: Request) {
      try {
         user.password = user.cpf;
         user.criadoEm = new Date().toDateString();
         user.alteradoEm = new Date().toDateString();
         user.criadoPor = req.nome;
         user.alteradoPor = req.nome;
         user.ativo = true;
         await admin.auth().createUser(user);
         return await admin.auth().getUserByEmail(user.email);
      } catch (error) {
         throw error;
      }
   }

   async forgotPassword(email: string) {
      try {
         await firebase.auth().sendPasswordResetEmail(email);
         return 'E-mail de redefinição foi enviada para sua caixa de entrada';
      } catch (error) {
         throw error;
      }
   }
}

export default new AccountRep();
