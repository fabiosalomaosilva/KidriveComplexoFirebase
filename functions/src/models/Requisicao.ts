import { Pessoa } from './Pessoa';

export interface Requisicao {
   id?: string;
   numero: number;
   contrato: string;
   dataRequisicao: string;
   paciente: Pessoa;
   acompanhante: Pessoa;
   dataEmbarque: string;
   localOrigem: string;
   localDestino: string;
   descricao: string;

   criadoEm?: any;
   criadoPor?: string;
   alteradoEm?: any;
   alteradoPor?: string;
   ativo?: boolean;
}
