import { firestore } from 'firebase-admin';

export interface UserRegister {
   id?: string;
   nomeCompleto: string;
   email: string;
   password: string;
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
