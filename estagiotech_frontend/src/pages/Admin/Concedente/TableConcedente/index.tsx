import { useEffect, useState } from "react";
// import { columns } from "./table/colums"; // Removi o import desnecessário de ConcendenteProps
import { DataTable } from "@/components/data-table";
import api from "@/service/api";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon, PrinterIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cnpjApplyMask } from "@/lib/utils";

// Tipo corrigido com a propriedade 'key'
type ConcendenteProps = {
  concedenteId: number;
  razaoSocial: string;
  responsavelEstagio: string;
  cnpj: string;
  localidade: string;
  descricaoTipoDocumento: string; // Propriedade adicionada
  key: number; // Certifique-se de que 'key' está incluído
};

export default function Empresas() {
  const [data, setData] = useState<ConcendenteProps[]>([]);

  useEffect(() => {
    (async () => {
      const data: ConcendenteProps[] = await (
        await api.get("/concedente")
      ).data;

      // Certifique-se de que a propriedade 'key' é adicionada aos itens
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
      {/* Certifique-se de passar os dados com 'key' */}
      <DataTable columns={columns} data={data} />
    </div>
  );
}