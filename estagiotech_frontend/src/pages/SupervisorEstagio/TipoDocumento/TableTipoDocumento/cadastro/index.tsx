import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormCadastroTipoDocumento from "./form-cad-TipoDocumento";
import { TipoDocumentoProps } from "../table/columns";
import api from "@/service/api";
import { boolean } from "zod";

export default function CadastroTipoDocumentoSE() {
  const [tipoDocumento, setTipoDocumento] = useState<TipoDocumentoProps>(
    {} as TipoDocumentoProps
  );
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      if (id) {
        const data = (await api.get(`/TipoDocumento/${id}`)).data;
        setTipoDocumento(data);
      } else {
        setTipoDocumento({
          idTipoDocumento: 0, descricaoTipoDocumento: "", status: false, key: 0
        })
      }
      return;
    })();
  }, []);

  return (
    <div>
      <p className="text-2xl mb-4">Cadastro do tipo do documento</p>
      <FormCadastroTipoDocumento data={tipoDocumento} />
    </div>
  );
}