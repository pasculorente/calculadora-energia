export type Energia = {
  punta: number;
  valle: number;
  llano: number;
  excedentes?: number;
};

export type Potencia = {
  punta: number;
  valle: number;
};

export type Tarifa = {
  comercializadora: string;
  nombre: string;
  energia: Energia;
  potencia: Potencia;
  mostrar?: boolean;
};

export type Consumo = {
  nombre: string;
  energia: Energia;
  potencia: Potencia;
  dias: number;
  mostrar?: boolean;
};
