/* eslint-disable max-len */
/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/no-explicit-any */
import firebase from 'firebase-admin';
import { Request } from 'express';
import { Guid } from 'guid-typescript';

import { Setor } from '../models/Setor';
import ConvertToSetorDto from '../mapper/ConvertToSetorDto';

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
         const listaDto: any[] = [];
         lista.map((i) => {
            const item = ConvertToSetorDto.Convert(i);
            listaDto.push(item);
         });
         return listaDto;
      } catch (error) {
         throw error;
      }
   }

   async get(uid: string) {
      const ref = this.db.collection('setores');
      try {
         const snapshot = await ref.doc(uid).get();
         if (!snapshot.exists) return null;
         return ConvertToSetorDto.Convert(snapshot.data() as Setor);
      } catch (error) {
         throw error;
      }
   }

   async post(obj: Setor, req: Request) {
      try {
         const uid = Guid.create().toString();
         obj.criadoEm = firebase.firestore.Timestamp.fromDate(new Date());
         obj.alteradoEm = firebase.firestore.Timestamp.fromDate(new Date());
         obj.criadoPor = req.email;
         obj.alteradoPor = req.email;
         obj.ativo = true;
         obj.id = uid;
         await this.db.collection('setores').doc(uid).set(obj);
         return obj;
      } catch (error) {
         throw error;
      }
   }

   async put(obj: Setor, uid: string, req: Request) {
      try {
         obj.criadoEm = firebase.firestore.Timestamp.fromDate(new Date(req.body.criadoEm));
         obj.alteradoEm = firebase.firestore.Timestamp.fromDate(new Date());
         obj.alteradoPor = req.email;
         await this.db.collection('setores').doc(uid).update(obj);
         return this.get(uid);
      } catch (error) {
         throw error;
      }
   }

   async delete(obj: Setor, uid: string, req: Request) {
      try {
         obj.criadoEm = firebase.firestore.Timestamp.fromDate(new Date(req.body.criadoEm));
         obj.alteradoEm = firebase.firestore.Timestamp.fromDate(new Date());
         obj.alteradoPor = req.email;
         obj.ativo = false;
         await this.db.collection('setores').doc(uid).update(obj);
         return true;
      } catch (error) {
         throw error;
      }
   }
}

export default new SetorRep();
