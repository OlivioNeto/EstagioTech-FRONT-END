import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CadastroDocumentoNecessario from "./form-cad-DocumentoNecessario";
import { DocumentoNecessarioProps } from "../table/columns";
import api from "@/service/api";

export default function CadDocumentoNecessarioIE() {
    const [documentoNecessario, setdocumentoNecessario] = useState<DocumentoNecessarioProps>({idDocumentoNecessario: 0, idTipoDocumento: 0, descricaoTipoEstagio: "", idTipoEstagio: 0, descricaoTipoDocumento: "", key: 0});
    const { id } = useParams();
    useEffect(() => {
      console.log(id)
    }, [id])
    
    useEffect(() => {
        (async () => {
            if (id) {
                const data = (await api.get(`/DocumentoNecessario/${id}`)).data;
                setdocumentoNecessario(data);
            } else {
                setdocumentoNecessario({
                    idDocumentoNecessario: 0,
                    idTipoDocumento: 0,
                    descricaoTipoEstagio: "", 
                    idTipoEstagio: 0,
                    descricaoTipoDocumento: "",
                    key: 0
                });
            }
            return;
        })();
    }, []);

    return (
        <div>
            <p className="text-2xl mb-4">Cadastro do Documento Necessário</p>
            <CadastroDocumentoNecessario idDocumentoNecessario={documentoNecessario.idDocumentoNecessario}
            idTipoEstagio={documentoNecessario.idTipoDocumento}
            idTipoDocumento={documentoNecessario.idTipoEstagio}/> 
        </div>
    );
}