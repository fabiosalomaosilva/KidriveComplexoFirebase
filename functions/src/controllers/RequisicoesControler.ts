import { Request, Response } from 'express';
import { Requisicao } from '../models/Requisicao';
import RequisicaoRep from '../Repository/RequisicaoRep';

class RequisicoesController {
   async getAll(req: Request, res: Response) {
      try {
         const dados = await RequisicaoRep.getAll();
         return res.json(dados);
      } catch (error) {
         return res.status(500).send(error);
      }
   }

   async get(req: Request, res: Response) {
      try {
         const id = req.params.id;
         const dados = await RequisicaoRep.get(id);
         return res.json(dados);
      } catch (error) {
         return res.status(500).send(error);
      }
   }

   async post(req: Request, res: Response) {
      try {
         const obj: Requisicao = req.body;
         const dados = await RequisicaoRep.post(obj, req);
         return res.json(dados);
      } catch (error) {
         return res.status(500).send(error);
      }
   }

   async put(req: Request, res: Response) {
      try {
         const obj: Requisicao = req.body;
         const id = req.body.id;
         const dados = await RequisicaoRep.put(obj, id, req);
         return res.json(dados);
      } catch (error) {
         return res.status(500).send(error);
      }
   }

   async delete(req: Request, res: Response) {
      try {
         const obj: Requisicao = req.body;
         const id = req.body.id;
         const dados = await RequisicaoRep.delete(obj, id, req);
         if (dados == true) {
            return res.json({ success: true });
         }
         return res.json({ success: false });
      } catch (error) {
         return res.status(500).send(error);
      }
   }
}

export default new RequisicoesController();
