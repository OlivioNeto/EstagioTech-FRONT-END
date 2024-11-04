import { useState, useEffect } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
  VisibilityState,
  TableMeta,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchColumnKey: keyof TData; // Adiciona a propriedade para coluna de pesquisa dinâmica
}

interface DataType {
  key: number;
  // Adicione outros campos que seus dados possam ter
}

export function DataTable<TData extends DataType, TValue>({
  columns,
  data,
  searchColumnKey, // Recebe a coluna de pesquisa como uma propriedade
}: DataTableProps<TData, TValue>) {
  const [dataTable, setDataTable] = useState<TData[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const [searchValue, setSearchValue] = useState<string>("");

  // Função de filtro global
  const globalFilter = (rows: TData[], filterValue: string) => {
    return rows.filter((row) => {
      return Object.values(row).some((value) =>
        String(value).toLowerCase().includes(filterValue.toLowerCase())
      );
    });
  };

  // Atualizar dataTable com o filtro
  useEffect(() => {
    if (searchValue) {
      const filteredData = globalFilter(data, searchValue);
      setDataTable(filteredData);
    } else {
      setDataTable(data); // Reseta a tabela se o filtro estiver vazio
    }
  }, [searchValue, data]);

  interface CustomTableMeta extends TableMeta<TData> {
    removeRow: (keyRow: number) => void;
  }

  const table = useReactTable<TData>({
    data: dataTable,
    columns,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    meta: {
      removeRow: (keyRow: number) => {
        setDataTable(dataTable.filter((datat) => datat.key !== keyRow));
      },
    } as CustomTableMeta, // Casting para garantir que o tipo esteja correto
  });

  return (
    <>
      <div className="flex items-center">
        <div className="flex items-center py-4">
          <Input
            placeholder="Pesquisar..."
            value={searchValue}
            onChange={(event) => {
              setSearchValue(event.target.value);
              table.getColumn(searchColumnKey as string)?.setFilterValue(event.target.value); // Filtra a coluna dinâmica
            }}
            className="max-w-sm"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              O que deseja ver?
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Selecione o combobox. Caso não haja ou sua pesquisa não foi encontrada ou cadastre um novo atributo.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </>
  );
}