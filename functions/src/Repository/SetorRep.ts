import { Request } from "express";
import firebase from "firebase-admin";
import { Guid } from "guid-typescript";

import { Setor } from "../models/Setor";

class SetorRep {
  async inserir(obj: Setor, req: Request) {
    const db = firebase.firestore();
    try {
      req.nome = "fabio@arquivarnet.com.br";
      const id = Guid.create().toString();
      obj.criadoEm = firebase.firestore.Timestamp.fromDate(new Date());
      obj.alteradoEm = firebase.firestore.Timestamp.fromDate(new Date());
      obj.criadoPor = req.nome;
      obj.alteradoPor = req.nome;
      obj.ativo = true;
      await db.collection("Setores").doc(id).set(obj);
      obj.id = id;
      return obj;
    } catch (error) {
      return error;
    }
  }

  async update(obj: Setor, id: string, req: Request) {
    const db = firebase.firestore();
    try {
      obj.alteradoEm = firebase.firestore.Timestamp.fromDate(new Date());
      obj.criadoPor = req.nome;
      obj.alteradoPor = req.nome;
      obj.ativo = true;
      await db.collection("Setores").doc(id).update(obj);
      obj.id = id;
      return obj;
    } catch (error) {
      return error;
    }
  }
}

export default new SetorRep();
