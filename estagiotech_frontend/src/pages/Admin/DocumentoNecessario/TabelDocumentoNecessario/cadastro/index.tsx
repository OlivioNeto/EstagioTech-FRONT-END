import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormCadastroDocumentoNecessario from "./e";
import { DocumentoNecessarioProps } from "../table/columns";
import api from "@/service/api";

export default function CadastroDocumentoNecessario() {
    const [documentoNecessario, setdocumentoNecessario] = useState<DocumentoNecessarioProps>(
        {} as DocumentoNecessarioProps
    );
    const { id } = useParams();

    useEffect(() => {
        (async () => {
            if (id) {
                const data = (await api.get(`/DocumentoNecessario/${id}`)).data;
                setdocumentoNecessario(data);
            } else {
                setdocumentoNecessario({
                    DocumentoNecessarioId: 0,
                    idTipoDocumento: 0,
                    idTipoEstagio: 0,
                    key: 0
                })
            }
            return;
        })();
    }, []);

    return (
        <div>
            <p className="text-2xl mb-4">Cadastro do Documento Necessário</p>
            <FormCadastroDocumentoNecessario data={documentoNecessario} />
        </div>
    );
}