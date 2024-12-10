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
import { format } from 'date-fns';

export type CoordenadorEstagioProps = {
  idCoordenadorEstagio: number;
  nomeCoordenador: string;
  dataCadastro: string;
  status: boolean;
  key: number;
};

export const columns: ColumnDef<CoordenadorEstagioProps>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: boolean) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "idCoordenadorEstagio",
    header: "Código do Coordenador de Estágio",
  },
  {
    accessorKey: "dataCadastro",
    header: "Data de cadastro do Coordenador",
    cell: ({ row }) => {
      const date = new Date(row.original.dataCadastro);
      return format(date, 'dd/MM/yyyy');
    },
  },
  {
    accessorKey: "nomeCoordenador",
    header: "Nome do Coordenador",
  },
  {
    accessorKey: "status",
    header: "Status de Coordenador",
    cell: ({ row }) => (row.original.status ? "Ativo" : "Inativo"),
  },
  {
    accessorKey: "idCoordenadorEstagio",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID do Coordenador
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
            <Link to={`/coordenador/coordenadorestagio/cadastro/${dataRow.idCoordenadorEstagio}`}>
              <DropdownMenuItem>📝 Editar</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                meta?.removeRow(dataRow.key);
                await api.delete(`/CoordenadorEstagio/${dataRow.idCoordenadorEstagio}`);
              }}
            >
              🗑️ Delete
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={async () => {
                try {
                  await api.put(`/CoordenadorEstagio/${dataRow.idCoordenadorEstagio}/Ativar`, { status: true });
                  location.reload();
                } catch (error) {
                  console.error("Erro ao ativar o documento:", error);
                }
              }}
            >
              🔄 Ativar
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={async () => {
                try {
                  await api.put(`/CoordenadorEstagio/${dataRow.idCoordenadorEstagio}/Desativar`, { status: false });
                  location.reload();
                } catch (error) {
                  console.error("Erro ao desativar o documento:", error);
                }
              }}
            >
              🛑 Desativar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
