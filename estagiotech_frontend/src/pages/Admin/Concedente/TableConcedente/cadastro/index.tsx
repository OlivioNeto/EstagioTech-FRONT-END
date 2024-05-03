import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ConcendenteProps } from "../table/colums";
import api from "@/service/api";
import { FormCadastroEmpresa } from "./form-cad-Empresa";


export default function CadastroEmpresa() {
  const [empresa, setEmpresa] = useState<ConcendenteProps>(
    {} as ConcendenteProps
  );
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      if (id) {
        const data = (await api.get(`/concedente/${id}`)).data;
        setEmpresa(data);
      }
      return;
    })();
  }, []);

  return (
    <div>
      <p className="text-2xl mb-4">Cadastro de empresa</p>

      <FormCadastroEmpresa data={empresa} />
    </div>
  );
}
