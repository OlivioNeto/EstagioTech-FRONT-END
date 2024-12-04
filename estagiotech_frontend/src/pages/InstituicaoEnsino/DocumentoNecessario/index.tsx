import { useEffect, useState } from "react";
import { DocumentoNecessarioProps, columns } from "./TableDocumentoNecessario/table/columns";
import { DataTable } from "../../../components/data-table";
import api from "@/service/api";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon, PrinterIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
import { TipoEstagioProps } from "../TipoEstagio/TableTipoEstagio/table/columns";
import { TipoDocumentoProps } from "../TipoDocumento/TableTipoDocumento/table/columns";

export default function DocumentoNecessarioIE() {
    const [data, setData] = useState<DocumentoNecessarioProps[]>([]);

    useEffect(() => {
        (async () => {
            // Obtenha os dados do TipoDocumento e TipoEstagio
            const dataTipoDocumento: TipoDocumentoProps[] = await (await api.get("/TipoDocumento")).data;
            const dataTipoEstagio: TipoEstagioProps[] = await (await api.get("/TipoEstagio")).data;
            console.log(dataTipoDocumento);
            console.log(dataTipoEstagio);

            // Crie mapas dos tipos de documento e tipos de estágio usando os IDs como chaves
            const tipoDocumentoMap = new Map(dataTipoDocumento.map(tipoDocumento => [tipoDocumento.idTipoDocumento, tipoDocumento]));
            const tipoEstagioMap = new Map(dataTipoEstagio.map(tipoEstagio => [tipoEstagio.idTipoEstagio, tipoEstagio]));
            console.log(tipoDocumentoMap);
            console.log(tipoEstagioMap);

            // Obtenha os dados dos documentos necessários
            const dataDocumentoNecessario: DocumentoNecessarioProps[] = await (await api.get("/DocumentoNecessario")).data;
            console.log(dataDocumentoNecessario);   

            // Mapeie os tipos de documento e tipos de estágio para os documentos necessários
            const documentosComDescricao = dataDocumentoNecessario.map(documento => ({
                ...documento,
                descricaoTipoDocumento: tipoDocumentoMap.get(documento.idTipoDocumento)?.descricaoTipoDocumento || 'Descrição não encontrada',
                descricaoTipoEstagio: tipoEstagioMap.get(documento.idTipoEstagio)?.descricaoTipoEstagio || 'Descrição não encontrada'
            }));
            console.log(documentosComDescricao);

            const includeKeyData = documentosComDescricao.map((item) => {
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
                <NavLink to="/instituicao/documentonecessario/cadastro">
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