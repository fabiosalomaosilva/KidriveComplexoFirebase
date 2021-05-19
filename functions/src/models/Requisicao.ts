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

   criadoEm: string;
   criadoPor: string;
   alteradoEm: string;
   alteradoPor: string;
   ativo: boolean;
}
