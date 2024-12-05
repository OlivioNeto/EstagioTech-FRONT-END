import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table";
import { DocumentoProps, columns} from "./TableDocumentp/table/columns"
import api from "@/service/api";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon, PrinterIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Documento() {
  const [data, setData] = useState<DocumentoProps[]>([]);

  useEffect(() => {
    (async () => {
      const data: DocumentoProps[] = await (
        await api.get("/Documento")
      ).data;

      const includeKeyData = data.map((item) => {
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