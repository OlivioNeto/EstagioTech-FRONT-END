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
import { phoneApplyMask } from "@/lib/utils";

export type InstituicaoEnsinoProps = {
  idInstituicaoEnsino: number;
  nomeInstituicao: string;
  localInstituicao: string;
  telefoneInstituicao: string;
  key: number;
};

export const columns: ColumnDef<InstituicaoEnsinoProps>[] = [
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
    accessorKey: "idInstituicaoEnsino",
    header: "Código da instituição",
  },
  {
    accessorKey: "nomeInstituicao",
    header: "Nome da Instituição",
  },
  {
    accessorKey: "localInstituicao",
    header: "Local da Instituição",
  },
  {
    accessorKey: "telefoneInstituicao",
    header: "Telefone da Instituição",
    cell: ({ row }) => phoneApplyMask(row.original.telefoneInstituicao),
  },
  {
    accessorKey: "nomeInstituicao",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome da Instituição
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
            <Link to={`/adm/instituicaoensino/cadastro/${dataRow.idInstituicaoEnsino}`}>
              <DropdownMenuItem>📝 Editar</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                meta?.removeRow(dataRow.key);
                await api.delete(`/InstituicaoEnsino/${dataRow.idInstituicaoEnsino}`);
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
