import { firestore } from 'firebase-admin';
import { Pessoa } from './Pessoa';

export interface Requisicao {
   id?: string;
   numero: number;
   contrato: string;
   dataRequisicao: firestore.Timestamp;
   paciente: Pessoa;
   acompanhante: Pessoa;
   dataEmbarque: firestore.Timestamp;
   localOrigem: string;
   localDestino: string;
   descricao: string;

   criadoEm: firestore.Timestamp;
   criadoPor: string;
   alteradoEm: firestore.Timestamp;
   alteradoPor: string;
   ativo: boolean;
}


