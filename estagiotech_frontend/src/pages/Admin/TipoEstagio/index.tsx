import { useEffect, useState } from "react";
import { tipoEstagioProps } from "./TableTipoEstagio/data/schema";

// import dataTasks from "./data/tasks.json";
import api from "../../../service/api";
import FormsTipoEstagio from "./TableTipoEstagio/components/FormsTipoEstagio";
import { Button } from "@/components/ui/button";


const TipoDocumento = () => {
  const [tipoEstagio, setTipoEstagio] = useState<tipoEstagioProps[]>([]);


  async function handleDeleteTipoEstagio(id: number){
    await api.delete(`/TipoEstagio/${id}`).then((resp) => {
      console.log(resp)
      }).catch((error) => {
        console.log(error.message);
    })
  }


  useEffect(() => {
    (async () => {
      const tipoestagioData = (await api.get<tipoEstagioProps[]>("/TipoEstagio"))
        .data;
      setTipoEstagio(tipoestagioData);
    })();
  }, []);

  useEffect(() => {
    console.log(tipoEstagio);
  }, []);

  return (
    <div>
      <div>Tipo Estagio</div>
      <ul>
        {
          tipoestagio.length > 0 && tipoestagio.map(x =>
            (<li key={x.idTipoEstagio}>
              <p>id: {x.idTipoEstagio}</p>
              <p>descição: {x.descricaoTipoEstagio}</p>
              <div>
              <Button variant={"outline"} className="bg-yellow-400 hover:bg-yellow-600">Editar</Button>
              <Button variant={"outline"} className="bg-red-600 hover:bg-red-800" onClick={() => handleDeleteTipoDocumento}>Excluir</Button>
              </div>
            </li>
            ))}
            <FormsTipoEstagio/>
      </ul>
    </div>
  )
}

export default TipoEstagio