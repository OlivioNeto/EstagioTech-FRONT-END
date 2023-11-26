import React from 'react'
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
console.log(tipoestagio);
  return (
    <div>Tipo Estagio</div>
  )
}

export default TipoEstagio