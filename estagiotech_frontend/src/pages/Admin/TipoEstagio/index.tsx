import { useEffect, useState } from "react";
import { tipoEstagioProps } from '../TipoEstagio/TableTipoEstagio/data/schema';

// import dataTasks from "./data/tasks.json";
import api from "../../../service/api"

const TipoEstagio = () => {
  const [tipoestagio, setTipoEstagio] = useState<tipoEstagioProps[]>([]);

  useEffect(() => {
    (async () => {
      const tipoestagioData = (await api.get<tipoEstagioProps[]>("/TipoEstagio")).data;
      setTipoEstagio(tipoestagioData);
    })();
  }, []);

  useEffect(() => {
    console.log(tipoestagio)
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
            </li>))
          }
      </ul>
    </div>
  )
}

export default TipoEstagio