import { Form } from "react-bootstrap";
import { Mapper } from "../components/table/types";
import { Consumo } from "./types";
export const mappers: Mapper<Consumo>[] = [
  {
    name: "M",
    expr: (c: Consumo, update) => {
      function change() {
        c.mostrar = !c.mostrar;
        update();
      }
      return <Form.Switch checked={c.mostrar} onChange={change} />;
    },
  },
  {
    name: "Concepto",
    expr: (c) => c.nombre,
  },
  {
    name: "Potencia (kW)",
    subname: "Punta",
    expr: (c) => c.potencia.punta.toFixed(2),
  },
  {
    name: "Potencia (kW)",
    subname: "Valle",
    expr: (c) => c.potencia.valle.toFixed(2),
  },
  {
    name: "Energia (kWh)",
    subname: "Punta",
    expr: (c) => c.energia.punta.toFixed(2),
  },
  {
    name: "Energia (kWh)",
    subname: "Llano",
    expr: (c) => c.energia.llano.toFixed(2),
  },
  {
    name: "Energia (kWh)",
    subname: "Valle",
    expr: (c) => c.energia.valle.toFixed(2),
  },
  {
    name: "Energia (kWh)",
    subname: "E",
    expr: (c) => (c.energia.excedentes ? c.energia.excedentes.toFixed(2) : ""),
  },
  {
    name: "Días",
    expr: (c) => JSON.stringify(c.dias),
  },
];
