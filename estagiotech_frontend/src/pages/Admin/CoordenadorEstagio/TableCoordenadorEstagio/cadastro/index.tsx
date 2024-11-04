import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormCadastroCoordenadorEstagio from "./for-cad-CoordenadoEstagio";
import { CoordenadorEstagioProps } from "../table/columns";
import api from "@/service/api";

export default function CadastroCoordenadorEstagio() {
  const [coordenadoEstagio, setCoordenadoEstagio] = useState<CoordenadorEstagioProps>(
    {} as CoordenadorEstagioProps
  );
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      if (id) {
        const data = (await api.get(`/coordenadorestagio/${id}`)).data;
        console.log(data);
        setCoordenadoEstagio(data);
      } else {
        setCoordenadoEstagio({
          idCoordenadorEstagio: 0, dataCadastro: "", nomeCoordenador: "", status: false, key: 0
        })
      }
      return;
    })();
  }, []);

  return (
    <div>
      <p className="text-2xl mb-4">Cadastro do Coordenador Estagio</p>
      <FormCadastroCoordenadorEstagio data={coordenadoEstagio} />
    </div>
  );
}