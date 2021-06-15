import { firestore } from 'firebase-admin';

export interface Setor {
   nome: string;
   criadoEm: firestore.Timestamp;
   criadoPor: string;
   alteradoEm: firestore.Timestamp;
   alteradoPor: string;
   ativo: boolean;
}

