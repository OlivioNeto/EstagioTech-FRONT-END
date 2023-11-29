import { useEffect, useState } from "react";
import { documentoProps } from "./TableDocumento/data/schema";

// import dataTasks from "./data/tasks.json";
import api from "../../../service/api";
import FormsDocumento from "./TableDocumento/components/FormsDocumento";
import { Button } from "@/components/ui/button";


const Documento = () => {
  const [documento, setdocumento] = useState<documentoProps[]>([]);


  async function handleDeleteDocumento(id: number){
    await api.delete(`/Documento/${id}`).then((resp) => {
      console.log(resp)
      }).catch((error) => {
        console.log(error.message);
    })
  }


  useEffect(() => {
    (async () => {
      const documentoData = (await api.get<documentoProps[]>("/Documento"))
        .data;
      setdocumento(documentoData);
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
              <div>
              <Button variant={"outline"} className="bg-yellow-400 hover:bg-yellow-600">Editar</Button>
              <Button variant={"outline"} className="bg-red-600 hover:bg-red-800" onClick={() => handleDeleteTipoDocumento}>Excluir</Button>
              </div>
            </li>
          ))}
          <FormsDocumento />
      </ul>
    </div>
  );
};

export default Documento;
