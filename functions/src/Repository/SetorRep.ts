import {Request} from 'express';
import firebase from 'firebase-admin';
import { Guid } from 'guid-typescript';

import { Setor } from '../models/Setor'

class SetorRep {
    async inserir(obj: Setor){
        const db = firebase.firestore();
        try {
            const id = Guid.create().toString();
            obj.criadoEm = new Date();
            obj.alteradoEm = new Date();
            obj.criadoPor = Request.;

            await db.collection('Setores').doc(id).set(obj);
            obj.id = id;
            return obj;         
        } catch (error) {
            return error;
        }
    }

    async update(obj: Setor, id: string){
        const db = firebase.firestore();
        try {
            await db.collection('Setores').doc(id).update(obj);
            obj.id = id;
            return obj;         
        } catch (error) {
            return error;
        }
    }

} 

export default new SetorRep();
