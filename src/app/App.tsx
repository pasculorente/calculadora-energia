import "./App.css";
import { mappers } from "./tarifas";
import { mappers as consumo_mappers } from "./consumos";
import { mappers as factura_mappers } from "./facturas.ts";
import _tarifas from "../data/tarifas.json";
import _consumos from "../data/consumos.json";
import { TableData } from "../components/table/tables";
import { compute_bills } from "./utils.ts";
import { Tab, Tabs } from "react-bootstrap";
import { useState } from "react";
import { Consumo, Tarifa } from "./types";

function App() {
  const [consumos, setConsumos] = useState<Consumo[]>(
    _consumos.map((c) => {
      return { ...c, mostrar: true };
    }),
  );
  const [tarifas, setTarifas] = useState<Tarifa[]>(
    _tarifas.map((t) => {
      return { ...t, mostrar: true };
    }),
  );

  const facturas = compute_bills(
    consumos.filter((c) => c.mostrar),
    tarifas.filter((t) => t.mostrar),
  );
  return (
    <div>
      <h2>Datos</h2>
      <Tabs defaultActiveKey="consumos">
        <Tab title="Consumos" eventKey="consumos">
          <TableData
            data={consumos}
            mappers={consumo_mappers}
            update={() => setConsumos(structuredClone(consumos))}
          ></TableData>
        </Tab>
        <Tab title="Tarifas" eventKey="tarifas">
          <TableData
            data={tarifas}
            mappers={mappers}
            update={() => setTarifas(structuredClone(tarifas))}
          ></TableData>
        </Tab>
      </Tabs>
      <h2>Facturas</h2>
      <TableData data={facturas} mappers={factura_mappers}></TableData>
    </div>
  );
}

export default App;
