import { useEffect, useState } from "react";
import { columns } from "./TableContratoEstagio/table/columns";
import { DataTable } from "@/components/data-table";
import api from "@/service/api";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon, PrinterIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";

// Tipo para Contrato de Estágio com a propriedade 'key'
export type ContratoEstagioProps = {
    contratoestagioId: number;
    statusContratoEstagio: string;
    notaFinal: string;
    situacao: string;
    horarioEntrada: string;
    horarioSaida: string;
    dataInicio: string;
    dataFim: string;
    salario: string;
    cargaSemanal: string;
    cargaTotal: string;
    key: number;
};

export default function ContratoEstagioCE() {
  const [data, setData] = useState<ContratoEstagioProps[]>([]);

  useEffect(() => {
    (async () => {
      const data: ContratoEstagioProps[] = await (
        await api.get("/ContratoEstagio")
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
        <span className="font-bold text-3xl">Contratos de Estágio</span>
      </div>
      <div className="flex gap-2">
        <NavLink to="/coordenador/contrato-estagio/cadastro">
          <Button variant="secondary" className="gap-2">
            <PlusCircleIcon /> Novo Contrato
          </Button>
        </NavLink>
        <Button variant="secondary" className="gap-2">
          <PrinterIcon /> Imprimir
        </Button>
      </div>
      {/* Usando 'ContratoEstagioProps' para tipagem correta */}
      <DataTable columns={columns as ColumnDef<ContratoEstagioProps>[]} data={data} searchColumnKey={"key"} />
    </div>
  );
}