export interface Telefone {
   uid:string;
   numero: string;
   tipoTelefone: TipoTelefone;
   quemAtende: string;
}

export enum TipoTelefone {
   'Celular',
   'Residencial',
   'Trabalho',
   'Vizinho',
   'Parente',
}
