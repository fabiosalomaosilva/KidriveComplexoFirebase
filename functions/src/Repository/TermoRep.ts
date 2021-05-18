import firebase from 'firebase-admin';
import { Request } from 'express';
import { Guid } from 'guid-typescript';

import { Termo } from '../models/Termo';

class TermoRep {
   db: FirebaseFirestore.Firestore;
   constructor() {
      this.db = firebase.firestore();
   }

   async getAll() {
      const ref = this.db.collection('Termos');
      const lista: Termo[] = [];
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
      const ref = this.db.collection('Termos');
      try {
         const snapshot = await ref.doc(id).get();
         if (!snapshot.exists) return null;
         return snapshot.data();
      } catch (error) {
         throw error;
      }
   }

   async post(obj: Termo, req: Request) {
      try {
         const id = Guid.create().toString();
         const dc = new Date(obj.dataContrato);
         const dataFimContrato = new Date(
            dc.setMonth(dc.getMonth() + obj.tempoVigencia)
         );
         obj.criadoEm = new Date().toDateString();
         obj.alteradoEm = new Date().toDateString();
         obj.criadoPor = req.nome;
         obj.alteradoPor = req.nome;
         obj.ativo = true;
         obj.fimVigencia = dataFimContrato.toDateString();
         await this.db.collection('Termos').doc(id).set(obj);
         obj.id = id;
         return obj;
      } catch (error) {
         throw error;
      }
   }

   async put(obj: Termo, id: string, req: Request) {
      try {
         obj.alteradoEm = new Date().toDateString();
         obj.alteradoPor = req.nome;
         await this.db.collection('Termos').doc(id).update(obj);
         obj.id = id;
         return obj;
      } catch (error) {
         throw error;
      }
   }

   async delete(obj: Termo, id: string, req: Request) {
      try {
         obj.alteradoEm = new Date().toDateString();
         obj.alteradoPor = req.nome;
         obj.ativo = false;
         await this.db.collection('Termos').doc(id).update(obj);
         obj.id = id;
         return obj;
      } catch (error) {
         throw error;
      }
   }
}

export default new TermoRep();
