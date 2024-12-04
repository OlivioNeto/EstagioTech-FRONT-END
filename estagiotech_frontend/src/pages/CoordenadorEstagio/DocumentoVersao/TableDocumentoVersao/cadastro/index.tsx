import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormCadastroDocumentoVersao from "./form-cad-DocumentoVersao"
import api from "@/service/api";

// Definindo a estrutura do novo tipo para o documento com os novos campos
interface DocumentoVersaoProps {
  idDocumentoVersao: number;
  comentario: string;
  anexo: string;
  data: string;
  situacao: string;
  idDocumento: number;
  key: number;
}

export default function CadastroDocumentoVersaoCE() {
  const [documentoVersao, setDocumentoVersao] = useState<DocumentoVersaoProps>(
    {} as DocumentoVersaoProps
  );
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      if (id) {
        const data = (await api.get(`/documentoversao/${id}`)).data;
        setDocumentoVersao(data);
      } else {
        // Definindo valores iniciais caso não haja id (criação de novo documento)
        setDocumentoVersao({
          idDocumentoVersao: 0,
          comentario: "",
          anexo: "",
          data: "",
          situacao: "",
          idDocumento: 0,
          key: 0,
        });
      }
      return;
    })();
  }, []);

  return (
    <div>
      <p className="text-2xl mb-4">Cadastro de Versão do Documento</p>
      <FormCadastroDocumentoVersao data={documentoVersao} />
    </div>
  );
}
