import { useEffect, useState } from "react";
import { TipoDocumentoProps, columns} from "./TableTipoDocumento/table/columns";
import { DataTable } from "../../../components/data-table";
import api from "@/service/api";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon, PrinterIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function TipoDocumentos() {
  const [data, setData] = useState<TipoDocumentoProps[]>([]);

  useEffect(() => {
    (async () => {
      const data: TipoDocumentoProps[] = await (
        await api.get("/TipoDocumento")
      ).data;

      const includeKeyData = data.map((item, idx) => {
        return { ...item, key: idx };
      });

      setData(includeKeyData);
    })();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <span className="font-bold text-3xl">Tipo documentos cadastrados</span>
      </div>
      <div className="flex gap-2">
        <NavLink to="/adm/tipodocumento/cadastro">
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
