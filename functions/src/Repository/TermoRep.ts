/* eslint-disable @typescript-eslint/no-explicit-any */
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
      const ref = this.db.collection('termos');
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

   async get(uid: string) {
      const ref = this.db.collection('termos');
      try {
         const snapshot = await ref.doc(uid).get();
         if (!snapshot.exists) return null;
         return snapshot.data();
      } catch (error) {
         throw error;
      }
   }

   async post(obj: Termo, req: Request) {
      try {
         const uid = Guid.create().toString();
         const dc = new Date(obj.dataContrato);
         const dataFimContrato = new Date(
            dc.setMonth(dc.getMonth() + obj.tempoVigencia)
         );
         obj.criadoEm = firebase.firestore.Timestamp.fromDate(new Date());
         obj.alteradoEm = firebase.firestore.Timestamp.fromDate(new Date());
         obj.criadoPor = req.email;
         obj.alteradoPor = req.email;
         obj.ativo = true;
         obj.fimVigencia = dataFimContrato.toDateString();
         await this.db.collection('termos').doc(uid).set(obj);
         obj.uid = uid;
         return obj;
      } catch (error) {
         throw error;
      }
   }

   async put(obj: Termo, uid: string, req: Request) {
      try {
         obj.alteradoEm = firebase.firestore.Timestamp.fromDate(new Date());
         obj.alteradoPor = req.email;
         await this.db.collection('termos').doc(uid).update(obj);
         obj.uid = uid;
         return obj;
      } catch (error) {
         throw error;
      }
   }

   async delete(obj: Termo, uid: string, req: Request) {
      try {
         obj.alteradoEm = firebase.firestore.Timestamp.fromDate(new Date());
         obj.alteradoPor = req.nome;
         obj.ativo = false;
         await this.db.collection('termos').doc(uid).update(obj);
         obj.uid = uid;
         return obj;
      } catch (error) {
         throw error;
      }
   }
}

export default new TermoRep();
