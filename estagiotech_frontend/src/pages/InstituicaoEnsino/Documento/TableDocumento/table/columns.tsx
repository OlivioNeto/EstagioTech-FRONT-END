import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import api from "../../../../../service/api";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

export type DocumentoProps = {
  idDocumento: number;
  descricaoDocumento: string;
  situacaoDocumento: string;
  idTipoDocumento: number;
  descricaoTipoDocumento: string;
  idCoordenadorEstagio: number;
  nomeCoordenador: string;
  key: number;
};

export const columns: ColumnDef<DocumentoProps>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "idDocumento",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Código do documento
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "descricaoDocumento",
    header: "Descrição do documento",
  },
  {
    accessorKey: "situacaoDocumento",
    header: "Situação do documento",
  },
  {
    accessorKey: "nomeCoordenador",
    header: "Nome do Coordenador",
  },
  {
    accessorKey: "descricaoTipoDocumento",
    header: "Descrição do Tipo Documento",
  },
  {
    id: "actions",
    header: "Ação",
    cell: ({ row, table }) => {
      const meta = table.options.meta;
      const dataRow = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <Link to={`/instituicao/documento/cadastro/${dataRow.idDocumento}`}>
              <DropdownMenuItem>📝 Editar</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                meta?.removeRow(dataRow.key);
                await api.delete(`/Documento/${dataRow.idDocumento}`);
              }}
            >
              🗑️ Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
