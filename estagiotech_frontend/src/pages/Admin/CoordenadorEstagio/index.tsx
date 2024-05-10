import { useEffect, useState } from "react";
import { CoordenadorEstagioProps, columns } from "./TableCoordenadorEstagio/table/columns";
import { DataTable } from "../../../components/data-table";
import api from "@/service/api";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon, PrinterIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function CoordenadorEstagio() {
  const [data, setData] = useState<CoordenadorEstagioProps[]>([]);

  useEffect(() => {
    (async () => {
      const dataCoordenadorEstagio: CoordenadorEstagioProps[] = await (
        await api.get("/CoordenadorEstagio")
      ).data;

      const includeKeyData = dataCoordenadorEstagio.map((item) => {
        return { ...item, key: item.idCoordenadorEstagio };
      });
      console.log(includeKeyData)
      setData(includeKeyData);
    })();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <span className="font-bold text-3xl">Coordenadores cadastrados</span>
      </div>
      <div className="flex gap-2">
        <NavLink to="/adm/coordenadorestagio/cadastro">
          <Button variant="secondary" className="gap-2">
            <PlusCircleIcon /> Novo Coordenador de Estagio
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