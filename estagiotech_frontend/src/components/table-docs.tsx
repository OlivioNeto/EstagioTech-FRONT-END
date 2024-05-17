import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { TipoDocumentoProps } from "@/pages/Admin/TipoDocumento/TableTipoDocumento/table/columns";
import api from "@/service/api";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";

interface TableDocsProps {
    data: TipoDocumentoProps[];
}

export function TableDocs({ data }: TableDocsProps) {

    return (
        <Table>
            <TableCaption>Documentos Necessários</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">ID do tipo documeto</TableHead>
                    <TableHead>Descrição tipo documento</TableHead>
                    <TableHead>Ação</TableHead> {/* Adicionando um novo cabeçalho para as ações */}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((data) => (
                    <TableRow key={data.idTipoDocumento}>
                        <TableCell className="font-medium">{data.idTipoDocumento}</TableCell>
                        <TableCell>{data.descricaoTipoDocumento}</TableCell>
                        {/* <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={async () => {
                                        // Adicione aqui a lógica para excluir o documento
                                        await api.delete(`/DocumentoNecessario/${data.idTipoDocumento}`);
                                    }}
                                >
                                    🗑️ Excluir
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu> */}
                    </TableRow>
                ))}
            </TableBody>
            {/* <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">$2,500.00</TableCell>
                </TableRow> 
            </TableFooter> */}
        </Table>
    )
}