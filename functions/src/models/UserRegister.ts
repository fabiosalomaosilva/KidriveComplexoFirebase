export interface UserRegister{
    nomeCompleto: string;
    email: string;
    password: string;
    cpf: string;
    foto?: string;
    setor: string;
    setorId:string;
    cargo:string;
    permissoes:[];

    criadoEm: string;
    criadoPor: string;
    alteradoEm: string;
    alteradoPor: string;
    ativo: boolean;
}