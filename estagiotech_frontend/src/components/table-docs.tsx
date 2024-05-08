import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { DocumentoNecessarioProps } from "@/pages/Admin/DocumentoNecessario/TabelDocumentoNecessario/table/columns";
import api from "@/service/api";
import { useEffect, useState } from "react";

interface TableDocsProps {
    selectedTipoEstagio: string;
}

export function TableDocs({ selectedTipoEstagio }: TableDocsProps) {

    const [data, setData] = useState<DocumentoNecessarioProps[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/TipoDocumento");
                let fetchedData: DocumentoNecessarioProps[] = response.data;

                // Filtro baseado no tipo de estágio selecionado
                if (selectedTipoEstagio !== "") {
                    fetchedData = fetchedData.filter(
                        (item) => item.idTipoDocumento === parseInt(selectedTipoEstagio)
                    );
                }

                // Add 'key' property to each item for rendering purposes
                const dataWithKeys = fetchedData.map((item, idx) => ({
                    ...item,
                    key: idx,
                }));

                setData(dataWithKeys);
            } catch (error) {
                console.error("Erro ao puxar os dados:", error);
            }
        };

        fetchData();
    }, [selectedTipoEstagio]);
    console.log(selectedTipoEstagio)
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