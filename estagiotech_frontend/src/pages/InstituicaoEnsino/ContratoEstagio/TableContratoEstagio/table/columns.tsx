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

export type ContratoEstagioProps = {
    contratoestagioId: number;
    statusContratoEstagio: string;
    notaFinal: string;
    situacao: string;
    horarioEntrada: string;
    horarioSaida: string;
    dataInicio: string;
    dataFim: string;
    salario: string;
    cargaSemanal: string;
    cargaTotal: string;
    key: number;
};

export const columns: ColumnDef<ContratoEstagioProps>[] = [
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
        accessorKey: "contratoestagioId",
        header: "Código do contrato estágio",
    },
    {
        accessorKey: "statusContratoEstagio",
        header: "Qual o status do contrato estágio",
    },
    {
        accessorKey: "notaFinal",
        header: "Nota final do contrato estágio",
    },
    {
        accessorKey: "situacao",
        header: "Situação do contrato estágio",
    },
    {
        accessorKey: "horarioEntrada",
        header: "Qual o horário de entrada desse contrato",
    },
    {
        accessorKey: "horarioSaida",
        header: "Qual o horário de saída desse contrato",
    },
    {
        accessorKey: "dataInicio",
        header: "Quando começa esse contrato",
    },
    {
        accessorKey: "dataFim",
        header: "Quando termina esse contrato",
    },
    {
        accessorKey: "salario",
        header: "Qual o salário do estagiário deste contrato",
    },
    {
        accessorKey: "cargaSemanal",
        header: "Qual a carga semanal do estagiário deste contrato",
    },
    {
        accessorKey: "cargaTotal",
        header: "Qual a carga total do estagiário deste contrato",
    },
    {
        accessorKey: "contratoestagioId",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Código Contrato Estágio
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
                        <Link to={`/instituicao/contratoestagio/cadastro/${dataRow.contratoestagioId}`}>
                            <DropdownMenuItem>📝 Editar</DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={async () => {
                                meta?.removeRow(dataRow.key);
                                await api.delete(`/ContratoEstagio/${dataRow.contratoestagioId}`);
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