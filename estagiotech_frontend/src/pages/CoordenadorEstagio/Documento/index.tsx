import { useEffect, useState } from "react";
import { columns } from "./TableDocumento/table/columns";
import { DataTable } from "../../../components/data-table";
import api from "@/service/api";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon, PrinterIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";

// Tipo para Coordenador de Estágio
export type DocumentoProps = {
  idDocumento: number;
  descricaoDocumento: string;
  situacaoDocumento: string;
  idTipoDocumento: number;
  descricaoTipoDocumento: string;
  idCoordenadorEstagio: number;
  nomeCoordenador: string;
  key: number;
};

export default function DocumentoCE() {
  const [data, setData] = useState<DocumentoProps[]>([]);

  useEffect(() => {
    (async () => {
      const data: DocumentoProps[] = await (
        await api.get("/Documento")
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
        <span className="font-bold text-3xl">Documentos cadastrados</span>
      </div>
      <div className="flex gap-2">
        <NavLink to="/coordenador/documento/cadastro">
          <Button variant="secondary" className="gap-2">
            <PlusCircleIcon /> Novo Documento
          </Button>
        </NavLink>
        <Button variant="secondary" className="gap-2">
          <PrinterIcon /> Imprimir
        </Button>
      </div>
      {/* Usando 'DocumentoProps' para tipagem correta */}
      <DataTable columns={columns as ColumnDef<DocumentoProps>[]} data={data} searchColumnKey={"key"} />
    </div>
  );
}
