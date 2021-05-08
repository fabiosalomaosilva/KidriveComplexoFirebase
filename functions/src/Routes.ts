import { Router, Request, Response } from "express";

import SetorRep from "./Repository/SetorRep";
import { Setor } from "./models/Setor";
import AccountController from "./controllers/AccountController";
import Autorize from "./middlewares/AutorizeMiddleware";
import { Pessoa, TipoPessoa } from "./models/Pessoa";
import { Telefone, TipoTelefone } from "./models/Telefone";
import PessoaRep from "./Repository/PessoaRep";
import AccountRep from "./Repository/AccountRep";

const router = Router();

router.post("/auth", AccountController.Auth);
router.post("/createuser", AccountController.CreateUser);

router.get("/pacientes", Autorize, (req: Request, res: Response) => {
  res.send(req.userId);
});

router.get("/acompanhantes", (req: Request, res: Response) => {
  res.send("Get Acompanhantes deu certo");
});

router.get("/setores/:id", async (req: Request, res: Response) => {
  try {
    const lista = await SetorRep.get(req.params.id);
    return res.status(200).json(lista);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post("/seed", async (req, res) => {
  const setor: Setor = {
    nome: "Diretoria de Regulação",
  };
  const obj = await SetorRep.post(setor, req);
  return res.json(obj);
});

router.post("/paciente", async (req, res) => {
  const tel: Telefone = {
    numero: "068999891959",
    quemAtende: "Fábio",
    tipoTelefone: TipoTelefone.Celular,
  };
  const data: Pessoa = {
    nome: "Fábio Salomão",
    cpf: "65788974291",
    dataNascimento: "08/02/1981",
    sus: "13123132132",
    tipoPessoa: TipoPessoa.Paciente,
    telefones: [tel],
    enderecos: [],
  };
  req.nome = "fabio@arquivarnet.com.br";
  const obj = await PessoaRep.post(data, req);
  return res.json(obj);
});

router.post("/esquecisenha", async (req, res) => {
  const email = req.body.email;
  try {
    const message = await AccountRep.forgotPassword(email);
    return res.status(200).send(message);
  } catch (error) {
    return res.status(500).send(error);
  }
});

export default router;
