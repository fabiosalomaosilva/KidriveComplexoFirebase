import { Request, Response } from 'express';
import { Pessoa, TipoPessoaFisica } from '../models/Pessoa';
import PessoaRep from '../Repository/PessoaRep';

class PacientesController {
   async getAll(req: Request, res: Response) {
      try {
         const dados = await PessoaRep.getAll();
         return res.json(dados);
      } catch (error) {
         return res.status(500).send(error);
      }
   }

   async get(req: Request, res: Response) {
      try {
         const id = req.params.id;
         const dados = await PessoaRep.get(id);
         return res.json(dados);
      } catch (error) {
         return res.status(500).send(error);
      }
   }

   async post(req: Request, res: Response) {
      try {
         const obj: Pessoa = req.body;
         obj.tipoPessoa = TipoPessoaFisica.Paciente;
         const dados = await PessoaRep.post(obj, req);
         return res.json(dados);
      } catch (error) {
         return res.status(500).send(error);
      }
   }

   async put(req: Request, res: Response) {
      try {
         const obj: Pessoa = req.body;
         const id = req.body.id;
         const dados = await PessoaRep.put(obj, id, req);
         return res.json(dados);
      } catch (error) {
         return res.status(500).send(error);
      }
   }

   async delete(req: Request, res: Response) {
      try {
         const obj: Pessoa = req.body;
         const id = req.body.id;
         const dados = await PessoaRep.delete(obj, id, req);
         if (dados == true) {
            return res.json({ success: true });
         }
         return res.json({ success: false });
      } catch (error) {
         return res.status(500).send(error);
      }
   }
}

export default new PacientesController();
