import { useEffect, useState } from "react";
// import { DataTable } from "../../../components/data-table";
import { DataTable } from "../../../../components/data-table";
import { SupervisorEstagioProps, columns } from "./table/columns";
import api from "@/service/api";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon, PrinterIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function SupervisorEstagio() {
  const [data, setData] = useState<SupervisorEstagioProps[]>([]);

  useEffect(() => {
    (async () => {
      const data: SupervisorEstagioProps[] = await (
        await api.get("/SupervisorEstagio")
      ).data;

      const includeKeyData = data.map((item) => {
        return { ...item, key: item.idSupervisor };
      });
      console.log(includeKeyData)
      setData(includeKeyData);
    })();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <span className="font-bold text-3xl">Supervisores cadastrados</span>
      </div>
      <div className="flex gap-2">
        <NavLink to="/supervisor/supervisorestagio/cadastro">
          <Button variant="secondary" className="gap-2">
            <PlusCircleIcon /> Novo Supervisor
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