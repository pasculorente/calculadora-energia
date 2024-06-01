import { Mapper } from "../components/table/types";
import { Consumo, Tarifa, Energia, Potencia } from "./types";
export class Factura {
  tarifa: Tarifa;
  consumos: Consumo[];
  total: number;
  energia: Energia;
  potencia: Potencia;
  impuestos: number;
  bono_social: number;
  alquiler: number;

  constructor(tarifa: Tarifa, consumos: Consumo[]) {
    this.tarifa = tarifa;
    this.consumos = consumos;
    this.energia = { punta: 0, valle: 0, llano: 0, excedentes: 0 };
    this.potencia = { punta: 0, valle: 0 };
    this.bono_social = 0;
    this.alquiler = 0;
    for (const cons of consumos) {
      this.energia.valle += tarifa.energia.valle * cons.energia.valle;
      this.energia.punta += tarifa.energia.punta * cons.energia.punta;
      this.energia.llano += tarifa.energia.llano * cons.energia.llano;
      if (tarifa.energia.excedentes && cons.energia.excedentes)
        this.energia.excedentes! +=
          tarifa.energia.excedentes * cons.energia.excedentes;
      this.potencia.punta +=
        (tarifa.potencia.punta * cons.potencia.punta * cons.dias) / 365;
      this.potencia.valle +=
        (tarifa.potencia.valle * cons.potencia.valle * cons.dias) / 365;
      this.bono_social += cons.dias * 0.038455;
      this.alquiler += cons.dias * 0.027;
    }
    const totalEnergia =
      this.energia.llano + this.energia.valle + this.energia.punta;
    const totalPotencia = this.potencia.valle + this.potencia.punta;
    this.impuestos = 0.025 * (totalEnergia + totalPotencia);
    this.total =
      totalEnergia + totalPotencia + this.impuestos - this.energia.excedentes!;
  }
}
export const mappers: Mapper<Factura>[] = [
  {
    expr: (f) => f.tarifa.nombre,
    name: "Tarifa",
  },
  {
    name: "Total",
    expr: (f) => f.total.toFixed(2),
  },
  {
    name: "Potencia (€)",
    subname: "P",
    expr: (c) => c.potencia.punta.toFixed(2),
  },
  {
    name: "Potencia (€)",
    subname: "V",
    expr: (c) => c.potencia.valle.toFixed(2),
  },
  {
    name: "Energia (€)",
    subname: "P",
    expr: (c) => c.energia.punta.toFixed(2),
  },
  {
    name: "Energia (€)",
    subname: "L",
    expr: (c) => c.energia.llano.toFixed(2),
  },
  {
    name: "Energia (€)",
    subname: "V",
    expr: (c) => c.energia.valle.toFixed(2),
  },
  {
    name: "Energia (€)",
    subname: "E",
    expr: (c) => (-c.energia.excedentes!).toFixed(2),
  },
  {
    name: "BS",
    expr: (c) => c.bono_social.toFixed(2),
  },
  {
    name: "ALQ",
    expr: (c) => c.alquiler.toFixed(2),
  },
  {
    name: "IGIC",
    expr: (c) => c.impuestos.toFixed(2),
  },
];
