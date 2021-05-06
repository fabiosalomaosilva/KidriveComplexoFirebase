import { Request, Response } from "express";
import firebase from "firebase";
import admin from "firebase-admin";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class AccountController {
  async Auth(req: Request, res: Response) {
    const { email, password } = req.body;
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
          { expiresIn: '1h' }
        );
        res.json({
          nomeCompleto: user.displayName,
          email: user.email,
          id: user.uid,
          token: token
        });
      }      
    } catch (erro) {
      res.send(erro);
    }
  }
}

export default new AccountController();
