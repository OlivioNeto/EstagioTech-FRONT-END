import { useEffect, useState } from "react";
import { tipoDocumentoProps} from "../TipoDocumento/TableTipoDocumento/data/schema";

// import dataTasks from "./data/tasks.json";
import api from "../../../service/api";
import FormsTipoDocumento from "./TableTipoDocumento/components/FormsTipoDocumento";
import { Button } from "@/components/ui/button";


const TipoDocumento = () => {
  const [tipodocumento, setTipoDocumento] = useState<tipoDocumentoProps[]>([]);


  async function handleDeleteTipoDocumento(id: number){
    await api.delete(`/TipoDocumento/${id}`).then((resp) => {
      console.log(resp)
      }).catch((error) => {
        console.log(error.message);
    })
  }


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
            <li key={x.idTipoDocumento} style={{display:"flex", justifyContent:"space-between"}}>
              <p>id: {x.idTipoDocumento}</p>
              <p>descrição: {x.descricaoTipoDocumento}</p>
              <div>
              <Button variant={"outline"} className="bg-yellow-400 hover:bg-yellow-600">Editar</Button>
              <Button variant={"outline"} className="bg-red-600 hover:bg-red-800" onClick={() => handleDeleteTipoDocumento}>Excluir</Button>
              </div>
            </li>
          ))}
        <FormsTipoDocumento />
      </ul>
    </div>
  );
};

export default TipoDocumento;