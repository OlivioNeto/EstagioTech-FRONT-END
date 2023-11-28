import { useEffect, useState } from "react";
import { tipoDocumentoProps} from "../TipoDocumento/TableTipoDocumento/data/schema"

// import dataTasks from "./data/tasks.json";
import api from "../../../service/api";
import FormsTipoDocumento from "./TableTipoDocumento/components/FormsTipoDocumento";

const TipoDocumento = () => {
  const [ tipodocumento, setTipoDocumento] = useState<tipoDocumentoProps[]>([]);

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
    <div>
      <div>Tipo Documento</div>
      <ul>
        {tipodocumento.length > 0 &&
          tipodocumento.map((x) => (
            <li key={x.idTipoDocumento}>
              <p>id: {x.idTipoDocumento}</p>
              <p>descrição: {x.descricaoTipoDocumento}</p>
            </li>
          ))}
      </ul>
      <FormsTipoDocumento/>
    </div>
  );
};

export default TipoDocumento;