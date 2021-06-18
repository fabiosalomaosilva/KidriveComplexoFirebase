import { firestore } from 'firebase-admin';
import { Documento } from './Documento';
import { TipoEndereco } from './Endereco';
import { Telefone } from './Telefone';

export interface Pessoa {
   id?: string;
   naturezaPessoa: NaturezaPessoa;

   tipoPessoa: TipoPessoaFisica;

   nome: string;
   email: string;

   dataNascimento: firestore.Timestamp;
   identidade: string;
   cpf: string;
   sus: string;

   nomeFantasia: string;
   cnpj: string;

   telefones: Telefone[];
   enderecos: TipoEndereco[];
   documentos: Documento[];
   representante: Pessoa[];

   criadoEm: firestore.Timestamp;
   criadoPor: string;
   alteradoEm: firestore.Timestamp;
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

