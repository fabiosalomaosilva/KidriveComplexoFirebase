/* eslint-disable @typescript-eslint/no-explicit-any */
import firebase from 'firebase-admin';
import { Request } from 'express';
import { Guid } from 'guid-typescript';

import { Setor } from '../models/Setor';

class SetorRep {
   db: FirebaseFirestore.Firestore;
   constructor() {
      this.db = firebase.firestore();
   }

   async getAll() {
      const ref = this.db.collection('setores');
      const lista: Setor[] = [];
      try {
         const snapshot = await ref.where('ativo', '==', true).get();
         if (snapshot.empty) return lista;
         snapshot.forEach((doc: any) => lista.push(doc.data()));
         return lista;
      } catch (error) {
         throw error;
      }
   }

   async get(uid: string) {
      const ref = this.db.collection('setores');
      try {
         const snapshot = await ref.doc(uid).get();
         if (!snapshot.exists) return null;
         return snapshot.data();
      } catch (error) {
         throw error;
      }
   }

   async post(obj: Setor, req: Request) {
      try {
         const uid = Guid.create().toString();
         obj.criadoEm = new Date().toDateString();
         obj.alteradoEm = new Date().toDateString();
         obj.criadoPor = req.email;
         obj.alteradoPor = req.email;
         obj.ativo = true;
         await this.db.collection('setores').doc(uid).set(obj);
         obj.uid = uid;
         return obj;
      } catch (error) {
         throw error;
      }
   }

   async put(obj: Setor, uid: string, req: Request) {
      try {
         obj.alteradoEm = new Date().toDateString();
         obj.alteradoPor = req.email;
         await this.db.collection('setores').doc(uid).update(obj);
         obj.uid = uid;
         return obj;
      } catch (error) {
         throw error;
      }
   }

   async delete(obj: Setor, uid: string, req: Request) {
      try {
         obj.alteradoEm = new Date().toDateString();
         obj.alteradoPor = req.email;
         obj.ativo = false;
         await this.db.collection('setores').doc(uid).update(obj);
         obj.uid = uid;
         return obj;
      } catch (error) {
         throw error;
      }
   }
}

export default new SetorRep();
