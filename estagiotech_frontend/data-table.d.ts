import "@tanstack/react-table";
declare module "@tanstack/table-core" {
  interface TableMeta<TData extends RowData> {
    removeRow: (row: any) => void;
    DesableRow: (row: any) => void;
    ActiveRow: (row: any) => void;
  }
}