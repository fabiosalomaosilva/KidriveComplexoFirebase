import { Documento } from './Documento';
import { TipoEndereco } from './Endereco';
import { Telefone } from './Telefone';

export interface Pessoa {
   uid?: string;
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

   criadoEm: string;
   criadoPor: string;
   alteradoEm: string;
   alteradoPor: string;
   ativo: boolean;
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
