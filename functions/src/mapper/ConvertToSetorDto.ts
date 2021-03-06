import { Setor } from '../models/Setor';

class ConvertToSetorDto {
   Convert(obj: Setor) {
      return {
         id: obj.id,
         nome: obj.nome,
         criadoEm: obj.criadoEm.toDate(),
         criadoPor: obj.criadoPor,
         alteradoEm: obj.alteradoEm.toDate(),
         alteradoPor: obj.alteradoPor,
         ativo: obj.ativo,
      };
   }
}

export default new ConvertToSetorDto();
