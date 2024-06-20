import { useEffect, useState } from "react";
import { DocumentoProps, columns } from "./TableDocumento/table/columns";
import { DataTable } from "../../../components/data-table";
import api from "@/service/api";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon, PrinterIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
import { TipoDocumentoProps } from "../TipoDocumento/TableTipoDocumento/table/columns";
import { CoordenadorEstagioProps } from "../CoordenadorEstagio/TableCoordenadorEstagio/table/columns";

export default function Documento() {
  const [data, setData] = useState<DocumentoProps[]>([]);
  const [dataTipoDocumento, setDataTipoDocumento] = useState<TipoDocumentoProps[]>([])
  const [dataCoordenadorEstagio, setDataCoordenadorEstagio] = useState<CoordenadorEstagioProps[]>([])


  useEffect(() => {
    (async () => {
      // Obtenha os dados do TipoDocumento e CoordenadorEstagio
      const dataTipoDocumento: TipoDocumentoProps[] = await (await api.get("/TipoDocumento")).data;
      const dataCoordenadorEstagio: CoordenadorEstagioProps[] = await (await api.get("/CoordenadorEstagio")).data;
      console.log(dataTipoDocumento);
      console.log(dataCoordenadorEstagio);

      // Crie mapas dos tipos de documento e coordenador estágio usando os IDs como chaves
      const tipoDocumentoMap = new Map(dataTipoDocumento.map(tipoDocumento => [tipoDocumento.idTipoDocumento, tipoDocumento]));
      const coordenadorEstagioMap = new Map(dataCoordenadorEstagio.map(coordenadorEstagio => [coordenadorEstagio.idCoordenadorEstagio, coordenadorEstagio]));
      console.log(tipoDocumentoMap);
      console.log(coordenadorEstagioMap);

      // Obtenha os dados dos documentos
      const dataDocumento: DocumentoProps[] = await (await api.get("/Documento")).data;
      console.log(dataDocumento);

      // Mapeie os tipos de documento e coordenador estágio para os documentos
      const documentosComDescricao = dataDocumento.map(documento => ({
        ...documento,
        descricaoTipoDocumento: tipoDocumentoMap.get(documento.idTipoDocumento)?.descricaoTipoDocumento || 'Descrição não encontrada',
        nomeCoordenador: coordenadorEstagioMap.get(documento.idCoordenadorEstagio)?.nomeCoordenador || 'Descrição não encontrada'
      }));
      console.log(documentosComDescricao);

      const includeKeyData = documentosComDescricao.map((item) => {
        return { ...item, key: item.idDocumento };
      });
      console.log(includeKeyData)
      setData(includeKeyData);
    })();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <span className="font-bold text-3xl">Documentos cadastrados</span>
      </div>
      <div className="flex gap-2">
        <NavLink to="/adm/documento/cadastro">
          <Button variant="secondary" className="gap-2">
            <PlusCircleIcon /> Novo Documento
          </Button>
        </NavLink>
        <Button variant="secondary" className="gap-2">
          <PrinterIcon /> Imprimir
        </Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}