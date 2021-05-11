import { Router } from 'express';

import SetorRep from './Repository/SetorRep';
import { Setor } from './models/Setor';
import AccountController from './controllers/AccountController';
import Autorize from './middlewares/AutorizeMiddleware';
import PacientesController from './controllers/PacientesController';
import AcompanhantesController from './controllers/AcompanhantesController';
import SetoresController from './controllers/SetoresController';

const router = Router();

router.post('/auth', AccountController.Auth);
router.post('/createuser', AccountController.CreateUser);
router.post('/forgotuser', AccountController.forgotPassword);

router.get('/pacientes', Autorize, PacientesController.getAll);
router.get('/pacientes/:id', Autorize, PacientesController.get);
router.post('/pacientes/', Autorize, PacientesController.post);
router.put('/pacientes/', Autorize, PacientesController.put);
router.delete('/pacientes/', Autorize, PacientesController.delete);

router.get('/acompanhantes', Autorize, AcompanhantesController.getAll);
router.get('/acompanhantes/:id', Autorize, AcompanhantesController.get);
router.post('/acompanhantes/', Autorize, AcompanhantesController.post);
router.put('/acompanhantes/', Autorize, AcompanhantesController.put);
router.delete('/acompanhantes/', Autorize, AcompanhantesController.delete);

router.get('/setores', Autorize, SetoresController.getAll);
router.get('/setores/:id', Autorize, SetoresController.get);
router.post('/setores/', Autorize, SetoresController.post);
router.put('/setores/', Autorize, SetoresController.put);
router.delete('/setores/', Autorize, SetoresController.delete);

router.post('/seed', async (req, res) => {
   const setor: Setor = {
      nome: 'Diretoria de Regulação',
   };
   const obj = await SetorRep.post(setor, req);
   return res.json(obj);
});

export default router;
