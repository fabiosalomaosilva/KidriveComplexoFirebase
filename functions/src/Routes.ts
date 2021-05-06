import { Router, Request, Response } from "express";
import AccountController from "./controllers/AccountController";

const router = Router();

router.post("/auth", AccountController.Auth);

router.get("/pacientes", (req: Request, res: Response) => {
  res.send("Get Pacientes deu certo");
});

router.get("/acompanhantes", (req: Request, res: Response) => {
  res.send("Get Acompanhantes deu certo");
});

export default router;
