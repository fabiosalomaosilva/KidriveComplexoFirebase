export interface Pessoa {
  id?: string;
  tipoPessoa: string;
  nome: string;
  dataNascimento: Date;
  cpf: string;
  sus: string;
  criadoEm?: Date;
  criadoPor?: string;
  alteradoEm?: Date;
  alteradoPor?: string;
  ativo: boolean;
}
