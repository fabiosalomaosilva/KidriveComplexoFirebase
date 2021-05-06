import { Router, Request, Response } from "express";

const router = Router();

router.get("/pacientes", (req: Request, res: Response) => {
  res.send("Get Pacientes deu certo");
});

router.get("/acompanhantes", (req: Request, res: Response) => {
  res.send("Get Acompanhantes deu certo");
});

export default router;
