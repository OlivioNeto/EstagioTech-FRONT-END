import { useEffect, useState } from "react";
import { TipoDocumentoProps, columns } from "./TableTipoDocumento/table/columns";
import { DataTable } from "../../../components/data-table";
import api from "@/service/api";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon, PrinterIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function TipoDocumentos() {
  const [data, setData] = useState<TipoDocumentoProps[]>([]);

  useEffect(() => {
    (async () => {
      const dataTipoDocumento: TipoDocumentoProps[] = await (
        await api.get("/TipoDocumento")
      ).data;

      const includeKeyData = dataTipoDocumento.map((item) => {
        return { ...item, key: item.idTipoDocumento };
      });
      console.log(includeKeyData)
      setData(includeKeyData);
    })();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <span className="font-bold text-3xl">Tipo documentos cadastrados</span>
      </div>
      <div className="flex gap-2">
        <NavLink to="/supervisor/tipodocumento/cadastro">
          <Button variant="secondary" className="gap-2">
            <PlusCircleIcon /> Novo Tipo Documento
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
