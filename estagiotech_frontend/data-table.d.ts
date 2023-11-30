import "@tanstack/react-table";
declare module "@tanstack/table-core" {
  interface TableMeta<TData extends RowData> {
    removeRow: (row: any) => void;
  }
}