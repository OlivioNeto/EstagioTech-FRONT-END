import { useEffect, useState } from "react";
import { columns } from "./TableCoordenadorEstagio/table/columns";
import { DataTable } from "../../../components/data-table";
import api from "@/service/api";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon, PrinterIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";

// Tipo para Coordenador de Estágio
export type CoordenadorEstagioProps = {
  idCoordenadorEstagio: number;
  nomeCoordenador: string;
  dataCadastro: string;
  status: boolean;
  key: number;
};

export default function CoordenadorEstagio() {
  const [data, setData] = useState<CoordenadorEstagioProps[]>([]);

  useEffect(() => {
    (async () => {
      const data: CoordenadorEstagioProps[] = await (
        await api.get("/CoordenadorEstagio")
      ).data;

      // Certifique-se de adicionar a propriedade 'key' aos itens
      const includeKeyData = data.map((item, idx) => {
        return { ...item, key: idx };
      });

      setData(includeKeyData);
    })();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <span className="font-bold text-3xl">Coordenadores cadastrados</span>
      </div>
      <div className="flex gap-2">
        <NavLink to="/instituicao/coordenadorestagio/cadastro">
          <Button variant="secondary" className="gap-2">
            <PlusCircleIcon /> Novo Coordenador de Estágio
          </Button>
        </NavLink>
        <Button variant="secondary" className="gap-2">
          <PrinterIcon /> Imprimir
        </Button>
      </div>
      {/* Usando 'CoordenadorEstagioProps' para tipagem correta */}
      <DataTable columns={columns as ColumnDef<CoordenadorEstagioProps>[]} data={data} searchColumnKey={"key"} />
    </div>
  );
}
