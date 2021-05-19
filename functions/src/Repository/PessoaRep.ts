/* eslint-disable @typescript-eslint/no-explicit-any */
import firebase from 'firebase-admin';
import { Request } from 'express';
import { Guid } from 'guid-typescript';

import { Pessoa } from '../models/Pessoa';

class PessoaRep {
   db: FirebaseFirestore.Firestore;
   constructor() {
      this.db = firebase.firestore();
   }

   async getAll() {
      const ref = this.db.collection('pessoas');
      const lista: Pessoa[] = [];
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
      const ref = this.db.collection('pessoas');
      try {
         const snapshot = await ref.doc(uid).get();
         if (!snapshot.exists) return null;
         return snapshot.data();
      } catch (error) {
         throw error;
      }
   }

   async post(obj: Pessoa, req: Request) {
      try {
         const uid = Guid.create().toString();
         obj.criadoEm = new Date().toDateString();
         obj.alteradoEm = new Date().toDateString();
         obj.criadoPor = req.nome;
         obj.alteradoPor = req.nome;
         obj.ativo = true;
         await this.db.collection('pessoas').doc(uid).set(obj);
         obj.uid = uid;
         return obj;
      } catch (error) {
         throw error;
      }
   }

   async put(obj: Pessoa, uid: string, req: Request) {
      try {
         obj.alteradoEm = new Date().toDateString();
         obj.alteradoPor = req.nome;
         await this.db.collection('pessoas').doc(uid).update(obj);
         obj.uid = uid;
         return obj;
      } catch (error) {
         throw error;
      }
   }

   async delete(obj: Pessoa, uid: string, req: Request) {
      try {
         obj.alteradoEm = new Date().toDateString();
         obj.alteradoPor = req.nome;
         obj.ativo = false;
         await this.db.collection('pessoas').doc(uid).update(obj);
         obj.uid = uid;
         return obj;
      } catch (error) {
         throw error;
      }
   }
}

export default new PessoaRep();
