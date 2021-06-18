import { Requisicao } from '../models/Requisicao';

class ConvertToRequisicaoDto {
   Convert(obj: Requisicao) {
      return {
         id: '',
         numero: obj.numero,
         contrato: obj.contrato,
         dataRequisicao: obj.dataRequisicao.toDate(),
         paciente: obj.paciente,
         acompanhante: obj.acompanhante,
         dataEmbarque: obj.dataEmbarque.toDate(),
         localOrigem: obj.localOrigem,
         localDestino: obj.localDestino,
         descricao: obj.descricao,
         criadoEm: obj.criadoEm.toDate(),
         criadoPor: obj.criadoPor,
         alteradoEm: obj.alteradoEm.toDate(),
         alteradoPor: obj.alteradoPor,
         ativo: obj.ativo,
      };
   }
}

export default new ConvertToRequisicaoDto();
