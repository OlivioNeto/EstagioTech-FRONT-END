import { useEffect, useState } from "react";
import { ContratoEstagioProps, columns } from "./TableContratoEstagio/table/columns";
import { DataTable } from "../../../components/data-table";
import api from "@/service/api";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon, PrinterIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function ContratoEstagio() {
    const [data, setData] = useState<ContratoEstagioProps[]>([]);

    useEffect(() => {
        (async () => {
            const dataContratoEstagio: ContratoEstagioProps[] = await (
                await api.get("/ContratoEstagio")
            ).data;

            const includeKeyData = dataContratoEstagio.map((item) => {
                return { ...item, key: item.contratoestagioId };
            });
            console.log(includeKeyData)
            setData(includeKeyData);
        })();
    }, []);

    return (
        <div>
            <div className="mb-8">
                <span className="font-bold text-3xl">Contratos de Estágio Cadastrados</span>
            </div>
            <div className="flex gap-2">
                <NavLink to="/adm/contratoestagio/cadastro">
                    <Button variant="secondary" className="gap-2">
                        <PlusCircleIcon /> Novo Contrato Estagio
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