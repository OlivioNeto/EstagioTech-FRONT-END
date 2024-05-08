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
                    {/* <TableHead>ID do tipo estagio</TableHead>
                    <TableHead>Descrição tipo estagio</TableHead> */}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((data) => (
                    <TableRow key={data.idTipoDocumento}>
                        <TableCell className="font-medium">{data.idTipoDocumento}</TableCell>
                        <TableCell>{data.descricaoTipoDocumento}</TableCell>
                        {/* <TableCell>{data.idTipoEstagio}</TableCell>
                        <TableCell>{data.descricaoTipoEstagio}</TableCell> */}
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