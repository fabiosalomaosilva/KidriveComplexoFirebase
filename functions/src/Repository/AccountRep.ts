/* eslint-disable spaced-comment */
import { Request } from 'express';
import firebase from 'firebase';
import admin from 'firebase-admin';
import jwt from 'jsonwebtoken';
import config from '../configs/config';
import { User } from '../models/User';
import { UserRegister } from '../models/UserRegister';
import { UserResult } from '../models/UserResult';

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
         if (userEmail == null) return null;
         const ref = this.db.collection('Users');
         const doc = await ref.doc(userCredential.user?.uid as string).get();
         if (doc.exists == true) {
            const user = doc.data() as User;
            const userResult: UserResult = {
               nomeCompleto: user.nomeCompleto,
               email: user.email,
               cargo: user.cargo,
               setor: user.setor,
               setorId: user.setorId,
               foto: user.foto,
               successful: true,
               token: '',
            };

            const secret = config.JWT_KEY as string;
            userResult.token = jwt.sign(userResult, secret as string, {
               expiresIn: '20d',
            });
            return userResult;
         }
         return {
            successful: false,
            error: 'Usuário ou a senha estão errados',
         };
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
         user.criadoPor = req.nome == undefined ? 'administrador' : req.nome;
         user.alteradoPor = req.nome == undefined ? 'administrador' : req.nome;
         user.ativo = true;
         user.uid = userResult.user?.uid;
         await this.db
            .collection('Users')
            .doc(user.uid as string)
            .set(user);
         user.password = '';
         return user as User;
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
