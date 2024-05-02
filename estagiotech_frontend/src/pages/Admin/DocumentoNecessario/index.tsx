import { useEffect, useState } from "react";
import { DocumentoNecessarioProps, columns } from "./TabelDocumentoNecessario/table/columns";
import { DataTable } from "../../../components/data-table";
import api from "@/service/api";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon, PrinterIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function DocumentoNecessario() {
    const [data, setData] = useState<DocumentoNecessarioProps[]>([]);

    useEffect(() => {
        (async () => {
            const dataDocumentoNecessario: DocumentoNecessarioProps[] = await (
                await api.get("/DocumentoNecessario")
            ).data;

            const includeKeyData = dataDocumentoNecessario.map((item) => {
                return { ...item, key: item.idDocumentoNecessario };
            });
            console.log(includeKeyData)
            setData(includeKeyData);
        })();
    }, []);

    return (
        <div>
            <div className="mb-8">
                <span className="font-bold text-3xl">Documentos necessários cadastrados</span>
            </div>
            <div className="flex gap-2">
                <NavLink to="/adm/documentonecessario/cadastro">
                    <Button variant="secondary" className="gap-2">
                        <PlusCircleIcon /> Novo Documento Necessário
                    </Button>
                </NavLink>
                <Button variant="secondary" className="gap-2">
                    <PrinterIcon /> Imprimir
                </Button>
            </div>
            <DataTable columns={columns} data={data} />
        </div>
    );
}