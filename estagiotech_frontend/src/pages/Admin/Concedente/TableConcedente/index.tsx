import { useEffect, useState } from "react";
import { columns } from "./table/colums";
import { DataTable } from "@/components/data-table";
import api from "@/service/api";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon, PrinterIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cnpjApplyMask } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

type ConcendenteProps = {
  concedenteId: number;
  razaoSocial: string;
  responsavelEstagio: string;
  cnpj: string;
  localidade: string;
  descricaoTipoDocumento: string; 
  key: number; 
};

export default function Empresas() {
  const [data, setData] = useState<ConcendenteProps[]>([]);

  useEffect(() => {
    (async () => {
      const data: ConcendenteProps[] = await (
        await api.get("/concedente")
      ).data;

      const includeKeyData = data.map((item, idx) => {
        return { ...item, cnpj: cnpjApplyMask(item.cnpj), key: idx };
      });

      setData(includeKeyData);
    })();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <span className="font-bold text-3xl">Empresas cadastradas</span>
      </div>
      <div className="flex gap-2">
        <NavLink to="/adm/empresa/cadastro">
          <Button variant="secondary" className="gap-2">
            <PlusCircleIcon /> Nova Empresa
          </Button>
        </NavLink>
        <Button variant="secondary" className="gap-2">
          <PrinterIcon /> Imprimir
        </Button>
      </div>
      <DataTable columns={columns as ColumnDef<ConcendenteProps>[]} data={data} searchColumnKey={"key"} />
    </div>
  );
}