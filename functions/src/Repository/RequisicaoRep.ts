/* eslint-disable @typescript-eslint/no-explicit-any */
import firebase from 'firebase-admin';
import { Request } from 'express';
import { Guid } from 'guid-typescript';

import { Requisicao } from '../models/Requisicao';

class RequisicaoRep {
   db: FirebaseFirestore.Firestore;
   constructor() {
      this.db = firebase.firestore();
   }

   async getAll() {
      const ref = this.db.collection('Requisicoes');
      const lista: Requisicao[] = [];
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
      const ref = this.db.collection('Requisicoes');
      try {
         const snapshot = await ref.doc(uid).get();
         if (!snapshot.exists) return null;
         return snapshot.data();
      } catch (error) {
         throw error;
      }
   }

   async post(obj: Requisicao, req: Request) {
      try {
         const uid = Guid.create().toString();
         obj.criadoEm = new Date().toDateString();
         obj.alteradoEm = new Date().toDateString();
         obj.criadoPor = req.email;
         obj.alteradoPor = req.email;
         obj.ativo = true;
         await this.db.collection('Requisicoes').doc(uid).set(obj);
         obj.uid = uid;
         return obj;
      } catch (error) {
         throw error;
      }
   }

   async put(obj: Requisicao, uid: string, req: Request) {
      try {
         obj.alteradoEm = new Date().toDateString();
         obj.alteradoPor = req.email;
         await this.db.collection('Requisicoes').doc(uid).update(obj);
         obj.uid = uid;
         return obj;
      } catch (error) {
         throw error;
      }
   }

   async delete(obj: Requisicao, uid: string, req: Request) {
      try {
         obj.alteradoEm = new Date().toDateString();
         obj.alteradoPor = req.email;
         obj.ativo = false;
         await this.db.collection('Requisicoes').doc(uid).update(obj);
         obj.uid = uid;
         return obj;
      } catch (error) {
         throw error;
      }
   }
}

export default new RequisicaoRep();
