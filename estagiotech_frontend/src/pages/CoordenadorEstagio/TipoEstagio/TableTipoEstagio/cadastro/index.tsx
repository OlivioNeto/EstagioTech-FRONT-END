import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormCadastroTipoEstagio from "./form-cad-TipoEstagio";
import { TipoEstagioProps } from "../table/columns";
import api from "@/service/api";

export default function CadastroTipoEstagio() {
  const [tipoEstagio, setTipoEstagio] = useState<TipoEstagioProps>(
    {} as TipoEstagioProps
  );
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      if (id) {
        const data = (await api.get(`/TipoEstagio/${id}`)).data;
        setTipoEstagio(data);
      } else {
        setTipoEstagio({
          idTipoEstagio: 0, descricaoTipoEstagio: "", key: 0
        })
      }
      return;
    })();
  }, []);

  return (
    <div>
      <p className="text-2xl mb-4">Cadastro do tipo estágio</p>
      <FormCadastroTipoEstagio data={tipoEstagio} />
    </div>
  );
}