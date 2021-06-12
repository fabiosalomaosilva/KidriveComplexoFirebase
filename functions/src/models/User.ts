import { firestore } from 'firebase-admin';

export interface User {
   uid?: string;
   nomeCompleto: string;
   email: string;
   cpf: string;
   foto?: string;
   setor: string;
   setorId: string;
   cargo: string;
   permissoes?: [];
   criadoEm: firestore.Timestamp;
   criadoPor: string;
   alteradoEm: firestore.Timestamp;
   alteradoPor: string;
   ativo: boolean;
}
