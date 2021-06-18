import { Pessoa } from '../models/Pessoa';

class ConvertToPessoaDto {
   Convert(obj: Pessoa) {
      return {
         id: '',
         nome: obj.nome,
         naturezaPessoa: obj.naturezaPessoa,
         tipoPessoa: obj.tipoPessoa,
         dataNascimento: obj.dataNascimento.toDate(),
         identidade: obj.identidade,
         cpf: obj.cpf,
         sus: obj.sus,
         nomeFantasia: obj.nomeFantasia,
         cnpj: obj.cnpj,
         telefones: obj.telefones,
         enderecos: obj.enderecos,
         documentos: obj.documentos,
         representante: obj.representante,
         criadoEm: obj.criadoEm.toDate(),
         criadoPor: obj.criadoPor,
         alteradoEm: obj.alteradoEm.toDate(),
         alteradoPor: obj.alteradoPor,
         ativo: obj.ativo,
      };
   }
}

export default new ConvertToPessoaDto();
