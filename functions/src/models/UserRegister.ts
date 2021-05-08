export interface UserRegister{
    nomeCompleto: string;
    email: string;
    password?: string;
    cpf: string;
    foto?: string;
    setor?: string;
    setorId?:string;
    permissoes:[];
}