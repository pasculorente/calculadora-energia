import { Factura } from "./facturas";
import { Consumo, Tarifa } from "./types";

export function compute_bills(
  consumos: Consumo[],
  tarifas: Tarifa[],
): Factura[] {
  return tarifas.map((t) => new Factura(t, consumos));
}

export function format(n: number, fixed: number, unit: string) {
  return `${n.toFixed(fixed)} ${unit}`;
}
