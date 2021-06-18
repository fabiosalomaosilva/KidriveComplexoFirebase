export interface Telefone {
   id?:string;
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
