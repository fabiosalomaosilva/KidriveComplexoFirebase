import { Documento } from './Documento';
import { TipoEndereco } from './Endereco';
import { Telefone } from './Telefone';

export interface Pessoa {
   id?: string;
   naturezaPessoa: NaturezaPessoa;

   tipoPessoa: TipoPessoaFisica;

   nome: string;
   email: string;

   dataNascimento: string;
   identidade: string;
   cpf: string;
   sus: string;

   nomeFantasia: string;
   cnpj: string;

   telefones: Telefone[];
   enderecos: TipoEndereco[];
   documentos: Documento[];
   representante: Pessoa[];

   criadoPor?: string;
   criadoEm?: any;
   alteradoPor?: string;
   alteradoEm?: any;
   ativo?: boolean;
}

export enum TipoPessoaFisica {
   'Paciente',
   'Acompanhante',
   'Representante',
   'Requerente',
}

export enum NaturezaPessoa {
   'PessoaFisica',
   'PessoaJuridica',
}
