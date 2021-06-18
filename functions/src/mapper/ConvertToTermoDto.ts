import { Termo } from '../models/Termo';

class ConvertToTermoDto {
   Convert(obj: Termo) {
      return {
         id: obj.id,
         tipoTermo: obj.tipoTermo,
         numero: obj.numero,
         numeroProcesso: obj.numeroProcesso,
         contratadas: obj.contratadas,
         dataContrato: obj.dataContrato,
         tempoVigencia: obj.tempoVigencia,
         fimVigencia: obj.fimVigencia,
         valor: obj.valor,
         objeto: obj.objeto,
         documentos: obj.documentos,
         criadoEm: obj.criadoEm.toDate(),
         criadoPor: obj.criadoPor,
         alteradoEm: obj.alteradoEm.toDate(),
         alteradoPor: obj.alteradoPor,
         ativo: obj.ativo,
      };
   }
}

export default new ConvertToTermoDto();
