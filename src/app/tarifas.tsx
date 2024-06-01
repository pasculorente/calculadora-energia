import { Form } from "react-bootstrap";
import { Mapper } from "../components/table/types";
import { Tarifa } from "./types";

export const mappers: Mapper<Tarifa>[] = [
  {
    name: "M",
    expr: (t: Tarifa, callback) => {
      function change() {
        t.mostrar = !t.mostrar;
        callback();
      }
      return <Form.Switch checked={t.mostrar} onChange={change} />;
    },
  },
  {
    name: "Comercializadora",
    expr: (t: Tarifa) => t.comercializadora,
  },
  {
    name: "Nombre",
    expr: (t: Tarifa) => t.nombre,
  },
  {
    name: "Potencia (€/kW/año)",
    subname: "P",
    expr: (c) => c.potencia.punta.toFixed(2),
  },
  {
    name: "Potencia (€/kW/año)",
    subname: "V",
    expr: (c) => c.potencia.valle.toFixed(2),
  },
  {
    name: "Energia (€/kWh)",
    subname: "P",
    expr: (c) => c.energia.punta.toFixed(4),
  },
  {
    name: "Energia (€/kWh)",
    subname: "L",
    expr: (c) => c.energia.llano.toFixed(4),
  },
  {
    name: "Energia (€/kWh)",
    subname: "V",
    expr: (c) => c.energia.valle.toFixed(4),
  },
  {
    name: "Energia (€/kWh)",
    subname: "E",
    expr: (c) => c.energia.excedentes!.toFixed(4),
  },
];
