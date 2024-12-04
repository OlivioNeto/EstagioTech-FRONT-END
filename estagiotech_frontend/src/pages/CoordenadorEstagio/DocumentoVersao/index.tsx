import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table";
import { DocumentoVersaoProps, columns } from "./TableDocumentoVersao/table/columms";
import api from "@/service/api";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon, PrinterIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function DocumentoVersaoCE() {
  const [data, setData] = useState<DocumentoVersaoProps[]>([]);

  useEffect(() => {
    (async () => {
      const data: DocumentoVersaoProps[] = await (
        await api.get("/DocumentoVersao") // Chamada API correta para DocumentoVersao
      ).data;

      const includeKeyData = data.map((item) => {
        return { ...item, key: item.idDocumentoVersao }; // Adicionando a chave baseada no idDocumentoVersao
      });
      console.log(includeKeyData);
      setData(includeKeyData);
    })();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <span className="font-bold text-3xl">Versões de Documentos cadastrados</span>
      </div>
      <div className="flex gap-2">
        <NavLink to="/adm/documentoversao/cadastro">
          <Button variant="secondary" className="gap-2">
            <PlusCircleIcon /> Nova Versão de Documento
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
