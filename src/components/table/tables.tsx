import Table from "react-bootstrap/Table";
import { Mapper } from "./types";

function groupBy<T extends { [key: string]: string | number | unknown }>(
  xs: T[],
  key: string,
): [string, T[]][] {
  const groups = xs.reduce(function (rv: { [key: string]: T[] }, x) {
    const k = x[key] as string | number;
    (rv[k] = rv[k] || []).push(x);
    return rv;
  }, {});
  return Object.entries(groups);
}

export function TableData<T>({
  data,
  mappers,
}: {
  data: T[];
  mappers: Mapper<T>[];
}) {
  let key = 0;
  const rows = data.map((item: T) => {
    const cells = mappers.map((m: Mapper<T>) => (
      <td key={"td_" + key++}>{m.expr(item)}</td>
    ));
    return <tr key={"tr_" + key++}>{cells}</tr>;
  });
  const groups = groupBy(mappers, "name");
  let headerRows;
  if (groups.some((g) => g[1].length > 1)) {
    // 2 row header
    const row1 = groups.map((g) => (
      <th key={"th_" + key++} colSpan={g[1].length}>
        {g[0]}
      </th>
    ));
    const row2 = groups.flatMap((g) =>
      g[1].map((w) => <th key={"th_" + key++}>{w.subname}</th>),
    );
    headerRows = [<tr>{row1}</tr>, <tr>{row2}</tr>];
  } else {
    const headerRow: React.ReactElement[] = mappers.map((m) => (
      <th key={"th_" + key++}>{m.name}</th>
    ));
    headerRows = <tr>{headerRow}</tr>;
  }
  return (
    <Table striped bordered responsive>
      <thead>{headerRows}</thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}
