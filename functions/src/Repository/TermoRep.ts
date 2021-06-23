/* eslint-disable max-len */
/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/no-explicit-any */
import firebase from 'firebase-admin';
import { Request } from 'express';
import { Guid } from 'guid-typescript';

import { Termo } from '../models/Termo';
import ConvertToTermoDto from '../mapper/ConvertToTermoDto';

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
         const listaDto: any[] = [];
         lista.map((i) => {
            const item = ConvertToTermoDto.Convert(i);
            listaDto.push(item);
         });
         return listaDto;
      } catch (error) {
         throw error;
      }
   }

   async get(uid: string) {
      const ref = this.db.collection('termos');
      try {
         const snapshot = await ref.doc(uid).get();
         if (!snapshot.exists) return null;
         return ConvertToTermoDto.Convert(snapshot.data() as Termo);
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
         obj.id = uid;
         await this.db.collection('termos').doc(uid).set(obj);
         return obj;
      } catch (error) {
         throw error;
      }
   }

   async put(obj: Termo, uid: string, req: Request) {
      try {
         obj.criadoEm = firebase.firestore.Timestamp.fromDate(req.body.criadoEm);
         obj.alteradoEm = firebase.firestore.Timestamp.fromDate(new Date());
         obj.alteradoPor = req.email;
         await this.db.collection('termos').doc(uid).update(obj);
         return this.get(uid);
      } catch (error) {
         throw error;
      }
   }

   async delete(obj: Termo, uid: string, req: Request) {
      try {
         obj.criadoEm = firebase.firestore.Timestamp.fromDate(req.body.criadoEm);
         obj.alteradoEm = firebase.firestore.Timestamp.fromDate(new Date());
         obj.alteradoPor = req.nome;
         obj.ativo = false;
         await this.db.collection('termos').doc(uid).update(obj);
         return true;
      } catch (error) {
         throw error;
      }
   }
}

export default new TermoRep();
