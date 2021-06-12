import { firestore } from 'firebase-admin';
import { Pessoa } from './Pessoa';

export interface Requisicao {
   uid?: string;
   numero: number;
   contrato: string;
   dataRequisicao: string;
   paciente: Pessoa;
   acompanhante: Pessoa;
   dataEmbarque: string;
   localOrigem: string;
   localDestino: string;
   descricao: string;

   criadoEm: firestore.Timestamp;
   criadoPor: string;
   alteradoEm: firestore.Timestamp;
   alteradoPor: string;
   ativo: boolean;
}
