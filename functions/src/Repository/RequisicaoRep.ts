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

   async get(id: string) {
      const ref = this.db.collection('Requisicoes');
      try {
         const snapshot = await ref.doc(id).get();
         if (!snapshot.exists) return null;
         return snapshot.data();
      } catch (error) {
         throw error;
      }
   }

   async post(obj: Requisicao, req: Request) {
      try {
         const id = Guid.create().toString();
         obj.criadoEm = (new Date()).toDateString();
         obj.alteradoEm = (new Date()).toDateString();
         obj.criadoPor = req.nome;
         obj.alteradoPor = req.nome;
         obj.ativo = true;
         await this.db.collection('Requisicoes').doc(id).set(obj);
         obj.id = id;
         return obj;
      } catch (error) {
         throw error;
      }
   }

   async put(obj: Requisicao, id: string, req: Request) {
      try {
         obj.alteradoEm = (new Date()).toDateString();
         obj.alteradoPor = req.nome;
         await this.db.collection('Requisicoes').doc(id).update(obj);
         obj.id = id;
         return obj;
      } catch (error) {
         throw error;
      }
   }

   async delete(obj: Requisicao, id: string, req: Request) {
      try {
         obj.alteradoEm = (new Date()).toDateString();
         obj.alteradoPor = req.nome;
         obj.ativo = false;
         await this.db.collection('Requisicoes').doc(id).update(obj);
         obj.id = id;
         return obj;
      } catch (error) {
         throw error;
      }
   }
}

export default new RequisicaoRep();
