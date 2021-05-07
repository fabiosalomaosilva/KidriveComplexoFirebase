import { Router, Request, Response } from "express";

import SetorRep from "./Repository/SetorRep";
import { Setor } from "./models/Setor";
import AccountController from "./controllers/AccountController";
import Autorize from './middlewares/AutorizeMiddleware';

const router = Router();

router.post("/auth", AccountController.Auth);

router.get("/pacientes", Autorize, (req: Request, res: Response) => {
  res.send(req.userId);
});

router.get("/acompanhantes",  (req: Request, res: Response) => {
  res.send("Get Acompanhantes deu certo");
});

router.get("/seed", async (req, res) => {
  const setor: Setor = {
    nome: "Diretoria de Regulação",
  };
  const obj = await SetorRep.inserir(setor, req);
  return res.json(obj);
});

export default router;
