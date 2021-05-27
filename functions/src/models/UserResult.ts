export interface UserResult {
   successful: boolean;
   error?:string;
   nomeCompleto?: string;
   email?: string;
   foto?: string;
   setor?: string;
   setorId?: string;
   cargo?: string;
   token?: string;
   permissoes?: [];
}
