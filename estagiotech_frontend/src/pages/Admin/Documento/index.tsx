import { useEffect, useState } from "react";
import { documentoProps } from "../Documento/TableDocumento/data/schema";
import api from "../../../service/api";

const Documento = () => {
  const [documento, setDocumento] = useState<documentoProps[]>([]);

  useEffect(() => {
    (async () => {
      const documentoData = (await api.get<documentoProps[]>("/Documento"))
        .data;
      setDocumento(documentoData);
    })();
  }, []);

  useEffect(() => {
    console.log(documento);
  }, []);

  return (
    <div>
      <div>Documento</div>
      <ul>
        {documento.length > 0 &&
          documento.map((x) => (
            <li key={x.documentoId}>
              <p>id: {x.documentoId}</p>
              <p>descrição: {x.descricaoDocumento}</p>
              <p>situação: {x.situacaoDocumento}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Documento;
