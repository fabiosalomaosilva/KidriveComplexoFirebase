export interface User {
    uid?:string;
    nomeCompleto: string;
    email: string;
    cpf: string;
    foto?: string;
    setor: string;
    setorId: string;
    cargo: string;
    permissoes?: [];
    criadoEm: string;
    criadoPor: string;
    alteradoEm: string;
    alteradoPor: string;
    ativo: boolean;
 }

