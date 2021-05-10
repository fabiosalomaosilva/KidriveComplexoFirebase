import { Request, Response } from 'express';
import { Setor } from '../models/Setor';
import SetorRep from '../Repository/SetorRep';

class SetoresController {
   async getAll(req: Request, res: Response) {
      try {
         const dados = await SetorRep.getAll();
         return res.json(dados);
      } catch (error) {
         return res.send(500).send(error);
      }
   }

   async get(req: Request, res: Response) {
      try {
         const id = req.params.id;
         const dados = await SetorRep.get(id);
         return res.json(dados);
      } catch (error) {
         return res.send(500).send(error);
      }
   }

   async post(req: Request, res: Response) {
      try {
         const obj: Setor = req.body;
         const dados = await SetorRep.post(obj, req);
         return res.json(dados);
      } catch (error) {
         return res.send(500).send(error);
      }
   }

   async put(req: Request, res: Response) {
      try {
         const obj: Setor = req.body;
         const id = req.body.id;
         const dados = await SetorRep.put(obj, id, req);
         return res.json(dados);
      } catch (error) {
         return res.send(500).send(error);
      }
   }

   async delete(req: Request, res: Response) {
      try {
         const obj: Setor = req.body;         
         const id = req.body.id;
         const dados = await SetorRep.delete(obj, id, req);
         return res.json(dados);
      } catch (error) {
         return res.send(500).send(error);
      }
   }
}

export default new SetoresController();
