import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormCadastroDocumento from "./for-cad-Documento";
import { DocumentoProps } from "../table/columns";
import api from "@/service/api";

export default function CadastroDocumento() {
  const [documento, setDocumento] = useState<DocumentoProps>(
    {} as DocumentoProps
  );
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      if (id) {
        const data = (await api.get(`/Documento/${id}`)).data;
        setDocumento(data);
      } else {setDocumento({
        idDocumento:0, 
        descricaoDocumento:"",
        situacaoDocumento:"", 
        idCoordenadorEstagio: 0,
        nomeCoordenador: "",
        idTipoDocumento: 0, 
        descricaoTipoDocumento: "",
        key:0
      })}
      return;
    })();
  }, []);

  return (
    <div>
      <p className="text-2xl mb-4">Cadastro do documento</p>
      <FormCadastroDocumento data={documento} />
    </div>
  );
}