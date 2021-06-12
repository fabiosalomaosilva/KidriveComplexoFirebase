import { firestore } from 'firebase-admin';

export interface Setor {
   nome: string;
   criadoEm: firestore.Timestamp;
   criadoPor: string;
   alteradoEm: firestore.Timestamp;
   alteradoPor: string;
   ativo: boolean;
}

class SetorDto {
   id?: string;
   nome!: string;
   criadoEm!: Date;
   criadoPor!: string;
   alteradoEm!: Date;
   alteradoPor!: string;
   ativo!: boolean;
}
export default SetorDto;
