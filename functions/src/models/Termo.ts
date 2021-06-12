import { firestore } from 'firebase-admin';
import { Documento } from './Documento';
import { Pessoa } from './Pessoa';

export interface Termo {
   uid?: string;
   tipoTermo: TipoTermo;
   numero: string;
   numeroProcesso: string;
   contratadas: Pessoa[];
   dataContrato: string;
   tempoVigencia: number;
   fimVigencia: string;
   valor: number;
   objeto: string;
   documentos: Documento[];
   criadoEm: firestore.Timestamp;
   criadoPor: string;
   alteradoEm: firestore.Timestamp;
   alteradoPor: string;
   ativo: boolean;
}

export enum TipoTermo {
   'Contrato',
   'Ata',
   'Convenio',
   'TermoFomento',
   'TermoParceria',
   'ContratoGestao',
}
