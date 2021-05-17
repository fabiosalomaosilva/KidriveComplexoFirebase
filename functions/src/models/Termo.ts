import { Documento } from './Documento';
import { Pessoa } from './Pessoa';

export interface Termo {
   id?: string;
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
   criadoEm?: any;
   criadoPor?: string;
   alteradoEm?: any;
   alteradoPor?: string;
   ativo?: boolean;
}

export enum TipoTermo {
   'Contrato',
   'Ata',
   'Convenio',
   'TermoFomento',
   'TermoParceria',
   'ContratoGestao',
}
