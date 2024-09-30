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

export type DocumentoVersaoProps = {
    idDocumentoVersao: number;
    idDocumento: number;
    comentario: string;
    anexo: number;
    data: string;
    situacao: string;
    key: number;
};

export const columns: ColumnDef<DocumentoVersaoProps>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "idDocumentoVersao",
        header: "Código do documento Versão",
    },
    {
        accessorKey: "comentario",
        header: "Comentario Documento Versão",
    },
    {
        accessorKey: "anexo",
        header: "Anexo Documento Versão",
    },
    {
        accessorKey: "comentario",
        header: "Comentario Documento Versão",
    },
    {
        accessorKey: "data",
        header: "Data Documento Versão",
    },
    {
        accessorKey: "situacao",
        header: "Situaçao Documento Versão",
    },
    {
        accessorKey: "idDocumento",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Código Documento Versao
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
                        <Link to={`/adm/documentonecessario/cadastro/${dataRow.idDocumentoVersao}`}>
                            <DropdownMenuItem>📝 Editar</DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={async () => {
                                meta?.removeRow(dataRow.key);
                                await api.delete(`/idDocumentoVersao/${dataRow.idDocumentoVersao}`);
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