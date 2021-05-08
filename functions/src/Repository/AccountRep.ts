import firebase from "firebase";
import admin from "firebase-admin";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserRegister } from "../models/UserRegister";

dotenv.config();

class AccountRep {
  async login(email: string, password: string) {
    try {
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      const userEmail = userCredential.user?.email;
      if (userEmail != null) {
        const user = await admin.auth().getUserByEmail(userEmail);
        const secret = process.env.JWT_KEY;
        const token = jwt.sign(
          {
            nomeCompleto: user.displayName,
            email: user.email,
            id: user.uid,
          },
          secret as string,
          { expiresIn: "20d" }
        );
        return {
          nomeCompleto: user.displayName,
          email: user.email,
          id: user.uid,
          token: token,
        };
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async createUser(user: UserRegister) {
    try {
      user.password = user.cpf;
      await admin.auth().createUser(user);
      return await admin.auth().getUserByEmail(user.email);
    } catch (error) {
      throw error;
    }
  }

  async forgotPassword(email:string) {
    try {
        await firebase.auth().sendPasswordResetEmail(email);
        return "E-mail de redefinição foi enviada para sua caixa de entrada";
      } catch (error) {
        throw error;
      }  }

}

export default new AccountRep();
