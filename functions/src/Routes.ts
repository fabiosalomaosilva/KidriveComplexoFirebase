import { Router, Request, Response } from "express";
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

export default router;
