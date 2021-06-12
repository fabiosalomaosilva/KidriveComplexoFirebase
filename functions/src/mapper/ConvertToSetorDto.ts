import SetorDto, { Setor } from '../models/Setor';

class ConvertToSetorDto {
   setorDTO: SetorDto = new SetorDto();

   Convert(setor: Setor) {
      this.setorDTO = {
         nome: setor.nome,
         criadoEm: setor.criadoEm.toDate(),
         criadoPor: setor.criadoPor,
         alteradoEm: setor.alteradoEm.toDate(),
         alteradoPor: setor.alteradoPor,
         ativo: setor.ativo,
      };
      return this.setorDTO;
   }
}

export default new ConvertToSetorDto();
