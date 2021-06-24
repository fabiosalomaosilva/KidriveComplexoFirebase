/* eslint-disable max-len */
/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/no-explicit-any */
import firebase, { firestore } from 'firebase-admin';
import { Request } from 'express';
import { Guid } from 'guid-typescript';

import { Pessoa } from '../models/Pessoa';
import ConvertToPessoaDto from '../mapper/ConvertToPessoaDto';

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
         const listaDto: any[] = [];
         lista.map((i) => {
            const item = ConvertToPessoaDto.Convert(i);
            listaDto.push(item);
         });
         return listaDto;
      } catch (error) {
         throw error;
      }
   }

   async get(uid: string) {
      const ref = this.db.collection('pessoas');
      try {
         const snapshot = await ref.doc(uid).get();
         if (!snapshot.exists) return null;
         return ConvertToPessoaDto.Convert(snapshot.data() as Pessoa);
      } catch (error) {
         throw error;
      }
   }

   async post(obj: Pessoa, req: Request) {
      try {
         const uid = Guid.create().toString();
         obj.criadoEm = firestore.Timestamp.fromDate(new Date());
         obj.alteradoEm = firestore.Timestamp.fromDate(new Date());
         obj.criadoPor = req.email;
         obj.alteradoPor = req.email;
         obj.ativo = true;
         obj.id = uid;
         await this.db.collection('pessoas').doc(uid).set(obj);
         return obj;
      } catch (error) {
         throw error;
      }
   }

   async put(obj: Pessoa, uid: string, req: Request) {
      try {
         obj.criadoEm = firebase.firestore.Timestamp.fromDate(new Date(req.body.criadoEm));
         obj.alteradoEm = firestore.Timestamp.fromDate(new Date());
         obj.alteradoPor = req.email;
         await this.db.collection('pessoas').doc(uid).update(obj);
         return this.get(uid);
      } catch (error) {
         throw error;
      }
   }

   async delete(obj: Pessoa, uid: string, req: Request) {
      try {
         obj.criadoEm = firebase.firestore.Timestamp.fromDate(new Date(req.body.criadoEm));
         obj.alteradoEm = firestore.Timestamp.fromDate(new Date());
         obj.alteradoPor = req.email;
         obj.ativo = false;
         await this.db.collection('pessoas').doc(uid).update(obj);
         return true;
      } catch (error) {
         throw error;
      }
   }
}

export default new PessoaRep();
