import { Request, Response } from 'express';
import { UserRegister } from '../models/UserRegister';
import AccountRep from '../Repository/AccountRep';

class AccountController {
   async Auth(req: Request, res: Response) {
      const { email, password } = req.body;
      try {
         const data = await AccountRep.login(email, password);
         if (data == null) {
            res.status(401).json({
               successful: false,
               error: 'O e-mail não foi informado',
            });
         }
         return res.json(data);
      } catch (error) {
         return res
            .status(401)
            .json({
               successful: false,
               error: error,
            });
      }
   }

   async CreateUser(req: Request, res: Response) {
      // const user: UserRegister = {
      //    nomeCompleto: req.body.nomeCompleto,
      //    cpf: req.body.cpf,
      //    email: req.body.email,
      //    foto: req.body?.foto,
      //    setor: req.body?.setor,
      //    setorId: req.body?.setorId,
      //    permissoes: [],
      // };
      const user: UserRegister = req.body;
      try {
         return res.json(await AccountRep.createUser(user, req));
      } catch (error) {
         return res.status(401).json({
            Successful: false,
            Error: error,
         });
      }
   }

   async forgotPassword(req: Request, res: Response) {
      const email = req.body.email;
      try {
         return res.send(await AccountRep.forgotPassword(email));
      } catch (error) {
         return res.status(401).send(error);
      }
   }
}

export default new AccountController();
