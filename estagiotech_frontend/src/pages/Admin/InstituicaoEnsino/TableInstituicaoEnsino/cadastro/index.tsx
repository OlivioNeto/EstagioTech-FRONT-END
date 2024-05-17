import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormCadastroInstituicaoEnsino from "./form-cad-InstituicaoEnsino";
import { InstituicaoEnsinoProps} from "../table/columns";
import api from "@/service/api";

export default function CadastroInstituicaoEnsino() {
  const [instituicaoEnsino, setInstituicaoEnsino] = useState<InstituicaoEnsinoProps>(
    {} as InstituicaoEnsinoProps
  );
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      if (id) {
        const data = (await api.get(`/instituicaoensino/${id}`)).data;
        setInstituicaoEnsino(data);
      } else {setInstituicaoEnsino({
        idInstituicaoEnsino:0, nomeInstituicao:"",localInstituicao:"",telefoneInstituicao:"", key:0
      })}
      return;
    })();
  }, []);

  return (
    <div>
      <p className="text-2xl mb-4">Cadastro Instituicao Ensino</p>
      <FormCadastroInstituicaoEnsino data={instituicaoEnsino} />
    </div>
  );
}