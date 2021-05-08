import { TipoEndereco } from "./Endereco";
import { Telefone } from "./Telefone";

export interface Pessoa {
  id?: string;
  tipoPessoa: TipoPessoa;
  nome: string;
  dataNascimento: string;
  cpf: string;
  sus: string;

  telefones: Telefone[];
  enderecos: TipoEndereco[];
  
  criadoPor?: string;
  criadoEm?: any;
  alteradoPor?: string;
  alteradoEm?: any;
  ativo?:boolean;
}

export enum TipoPessoa {
  "Paciente", "Acompanhante"
}