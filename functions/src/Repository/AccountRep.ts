/* eslint-disable spaced-comment */
import { Request } from 'express';
import firebase from 'firebase';
import admin from 'firebase-admin';
import jwt from 'jsonwebtoken';
import config from '../configs/config';
import { UserRegister } from '../models/UserRegister';

class AccountRep {
   db: FirebaseFirestore.Firestore;
   constructor() {
      this.db = admin.firestore();
   }
   async login(email: string, password: string) {
      try {
         const userCredential = await firebase
            .auth()
            .signInWithEmailAndPassword(email, password);
         const userEmail = userCredential.user?.email;
         if (userEmail != null) {
            const ref = this.db.collection('pessoas');
            const doc = await ref.doc(userCredential.user?.uid as string).get();
            const user = doc.data() as UserRegister;
            const secret = config.JWT_KEY as string;
            const token = jwt.sign(user as UserRegister, secret as string, {
               expiresIn: '20d',
            });
            return {
               user: user,
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
         const userResult = await firebase
            .auth()
            .createUserWithEmailAndPassword(user.email, user.password);

         user.criadoEm = new Date().toDateString();
         user.alteradoEm = new Date().toDateString();
         user.criadoPor = req.nome;
         user.alteradoPor = req.nome;
         user.ativo = true;
         user.uid = userResult.user?.uid;
         await this.db
            .collection('Users')
            .doc(user.uid as string)
            .set(user);
         user.password = '';
         return user;
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
