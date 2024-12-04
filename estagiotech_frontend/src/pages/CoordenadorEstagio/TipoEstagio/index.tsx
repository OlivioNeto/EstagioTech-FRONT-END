import { useEffect, useState } from "react";
import { TipoEstagioProps, columns } from "./TableTipoEstagio/table/columns";
import { DataTable } from "../../../components/data-table";
import api from "@/service/api";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon, PrinterIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function TipoEstagioA() {
  const [data, setData] = useState<TipoEstagioProps[]>([]);

  useEffect(() => {
    (async () => {
      const dataTipoEstagio: TipoEstagioProps[] = await (
        await api.get("/TipoEstagio")
      ).data;

      const includeKeyData = dataTipoEstagio.map((item) => {
        return { ...item, key: item.idTipoEstagio };
      });
      console.log(includeKeyData)
      setData(includeKeyData);
    })();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <span className="font-bold text-3xl">Tipos de estágio cadastrados</span>
      </div>
      <div className="flex gap-2">
        <NavLink to="/coordenador/tipoestagio/cadastro">
          <Button variant="secondary" className="gap-2">
            <PlusCircleIcon /> Novo Tipo Estagio
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