import { Request, Response } from 'express';
import { Termo } from '../models/Termo';
import TermoRep from '../Repository/TermoRep';

class TermosController {
   async getAll(req: Request, res: Response) {
      try {
         const dados = await TermoRep.getAll();
         return res.json(dados);
      } catch (error) {
         return res.status(500).send(error);
      }
   }

   async get(req: Request, res: Response) {
      try {
         const id = req.params.id;
         const dados = await TermoRep.get(id);
         return res.json(dados);
      } catch (error) {
         return res.status(500).send(error);
      }
   }

   async post(req: Request, res: Response) {
      try {
         const obj: Termo = req.body;
         const dados = await TermoRep.post(obj, req);
         return res.json(dados);
      } catch (error) {
         return res.status(500).send(error);
      }
   }

   async put(req: Request, res: Response) {
      try {
         const obj: Termo = req.body;
         const id = req.body.id;
         const dados = await TermoRep.put(obj, id, req);
         return res.json(dados);
      } catch (error) {
         return res.status(500).send(error);
      }
   }

   async delete(req: Request, res: Response) {
      try {
         const obj: Termo = req.body;
         const id = req.body.id;
         const dados = await TermoRep.delete(obj, id, req);
         if (dados == true) {
            return res.json({ success: true });
         }
         return res.json({ success: false });
      } catch (error) {
         return res.status(500).send(error);
      }
   }
}

export default new TermosController();
