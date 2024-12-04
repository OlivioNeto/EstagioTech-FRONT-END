import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormCadastroSupervisorEstagio from "./form-cad-SupervisorEstagio";
import { SupervisorEstagioProps } from "../table/columns";
import api from "@/service/api";

export default function CadastroSupervisorEstagioSE() {
  const [supervisorEstagio, setSupervisorEstagio] = useState<SupervisorEstagioProps>(
    {} as SupervisorEstagioProps
  );
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      if (id) {
        const data = (await api.get(`/supervisorestagio/${id}`)).data;
        setSupervisorEstagio(data);
      } else {
        setSupervisorEstagio({
          idSupervisor: 0, nomeSupervisor: "", status: false, concedenteId: 0, key: 0
        })
      }
      return;
    })();
  }, []);

  return (
    <div>
      <p className="text-2xl mb-4">Cadastro do Supervisor Estagio</p>
      <FormCadastroSupervisorEstagio data={supervisorEstagio} />
    </div>
  );
}