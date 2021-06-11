export interface Telefone {
   uid:string;
   tipoEndereco: TipoEndereco;
   logradouro: string;
   numero: string;
   bairro: string;
   complemento: string;
   cep: string;
   estado: string;
   municipio: string;
}

export enum TipoEndereco {
   'Residencia',
   'Trabalho',
   'Parente',
}
