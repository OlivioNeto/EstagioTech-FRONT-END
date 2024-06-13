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

export type SupervisorEstagioProps = {
  idSupervisor: number;
  nomeSupervisor: string;
  status: boolean;
  concedenteId: number;
  key: number;
};

export const columns: ColumnDef<SupervisorEstagioProps>[] = [
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
    accessorKey: "idSupervisor",
    header: "Código do supervisor",
  },
  {
    accessorKey: "nomeSupervisor",
    header: "Nome do Supervisor",
  },
  {
    accessorKey: "status",
    header: "Status do supervisor",
    cell: ({ row }) => (row.original.status ? "Ativo" : "Inativo"),
  },
  {
    accessorKey: "concedenteId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Código do supervisor
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
            <Link to={`/adm/supervisorestagio/cadastro/${dataRow.idSupervisor}`}>
              <DropdownMenuItem>📝 Editar</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                meta?.removeRow(dataRow.key);
                await api.delete(`/SupervisorEstagio/${dataRow.idSupervisor}`);
              }}
            >
              🗑️ Delete
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={async () => {
                try {
                  await api.put(`/SupervisorEstagio/${dataRow.idSupervisor}/Ativar`, { status: true });
                  location.reload()
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
                  await api.put(`/SupervisorEstagio/${dataRow.idSupervisor}/Desativar`, { status: false });
                  location.reload()
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
