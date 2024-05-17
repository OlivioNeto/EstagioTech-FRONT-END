import { useEffect, useState } from "react";
import { InstituicaoEnsinoProps, columns } from "./table/columns";
import { DataTable } from "@/components/data-table";
import api from "@/service/api";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon, PrinterIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function InstituicaoEnsino() {
  const [data, setData] = useState<InstituicaoEnsinoProps[]>([]);

  useEffect(() => {
    (async () => {
      const dataInstituicaoEnsino: InstituicaoEnsinoProps[] = await (
        await api.get("/InstituicaoEnsino")
      ).data;

      const includeKeyData = dataInstituicaoEnsino.map((item) => {
        return { ...item, key: item.idInstituicaoEnsino };
      });
      console.log(includeKeyData)
      setData(includeKeyData);
    })();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <span className="font-bold text-3xl">Instituições cadastradas</span>
      </div>
      <div className="flex gap-2">
        <NavLink to="/adm/instituicaoensino/cadastro">
          <Button variant="secondary" className="gap-2">
            <PlusCircleIcon /> Nova Instituição de Ensino
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