import { Setor } from '../models/Setor';

class ConvertToSetorDto {
   Convert(setor: Setor) {
      return {
         id: '',
         nome: setor.nome,
         criadoEm: setor.criadoEm.toDate(),
         criadoPor: setor.criadoPor,
         alteradoEm: setor.alteradoEm.toDate(),
         alteradoPor: setor.alteradoPor,
         ativo: setor.ativo,
      };
   }
}

export default new ConvertToSetorDto();
