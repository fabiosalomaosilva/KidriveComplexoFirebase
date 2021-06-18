import { firestore } from 'firebase-admin';

export interface Setor {
   id?: string;
   nome: string;
   criadoEm: firestore.Timestamp;
   criadoPor: string;
   alteradoEm: firestore.Timestamp;
   alteradoPor: string;
   ativo: boolean;
}

