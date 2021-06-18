import { User } from '../models/User';

class ConvertToSetorDto {
   Convert(obj: User) {
      return {
         id: obj.id,
         nomeCompleto: obj.nomeCompleto,
         email: obj.email,
         cpf: obj.cpf,
         foto: obj.foto,
         setor: obj.setor,
         setorId: obj.setorId,
         cargo: obj.cargo,
         permissoes: obj.permissoes,
         criadoEm: obj.criadoEm.toDate(),
         criadoPor: obj.criadoPor,
         alteradoEm: obj.alteradoEm.toDate(),
         alteradoPor: obj.alteradoPor,
         ativo: obj.ativo,
      };
   }
}

export default new ConvertToSetorDto();
