import "./App.css";
import { mappers } from "./tarifas.ts";
import { mappers as consumo_mappers } from "./consumos.ts";
import { mappers as factura_mappers } from "./facturas.ts";
import tarifas from "../data/tarifas.json";
import consumos from "../data/consumos.json";
import { TableData } from "../components/table/tables";
import { compute_bills } from "./utils.ts";
import { Tab, Tabs } from "react-bootstrap";

function App() {
  const facturas = compute_bills(consumos, tarifas);
  return (
    <div>
      <h2>Datos</h2>
      <Tabs defaultActiveKey="consumos">
        <Tab title="Consumos" eventKey="consumos">
          <TableData data={consumos} mappers={consumo_mappers}></TableData>
        </Tab>
        <Tab title="Tarifas" eventKey="tarifas">
          <TableData data={tarifas} mappers={mappers}></TableData>
        </Tab>
      </Tabs>
      <h2>Facturas</h2>
      <TableData data={facturas} mappers={factura_mappers}></TableData>
    </div>
  );
}

export default App;
