import { useEffect, useState } from "react";
import { tipoDocumentoProps } from "../TipoDocumento/TableTipoDocumento/data/schema"

// import dataTasks from "./data/tasks.json";
import api from "../../../service/api";
import FormsTipoDocumento from "./TableTipoDocumento/components/FormsTipoDocumento";

const TipoDocumento = () => {
  const [tipodocumento, setTipoDocumento] = useState<tipoDocumentoProps[]>([]);

  useEffect(() => {
    (async () => {
      const tipodocumentoData = (await api.get<tipoDocumentoProps[]>("/TipoDocumento"))
        .data;
      setTipoDocumento(tipodocumentoData);
    })();
  }, []);

  useEffect(() => {
    console.log(tipodocumento);
  }, []);

  return (
    <div className="h-full">
      <div>Tipo Documento</div>
      <ul className="h-full">
        {tipodocumento.length > 0 &&
          tipodocumento.map((x) => (
            <li key={x.idTipoDocumento}>
              <p>id: {x.idTipoDocumento}</p>
              <p>descrição: {x.descricaoTipoDocumento}</p>
            </li>
          ))}
        <FormsTipoDocumento />
      </ul>
    </div>
  );
};

export default TipoDocumento;