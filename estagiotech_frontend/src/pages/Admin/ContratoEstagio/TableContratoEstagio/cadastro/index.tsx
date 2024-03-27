import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CadastroContratoEstagio from "./form-cad-ContratoEstagio";
import { ContratoEstagioProps } from "../table/columns";
import api from "@/service/api";

export default function CadContratoEstagio() {
    const [contratoEstagio, setcontratoEstagio] = useState<ContratoEstagioProps>(
        {} as ContratoEstagioProps
    );
    const { id } = useParams();

    useEffect(() => {
        (async () => {
            if (id) {
                const data = (await api.get(`/ContratoEstagio/${id}`)).data;
                setcontratoEstagio(data);
            } else {
                setcontratoEstagio({
                    contratoestagioId: 0,
                    statusContratoEstagio: "",
                    notaFinal: "",
                    situacao: "",
                    horarioEntrada: "",
                    horarioSaida: "",
                    dataInicio: "",
                    dataFim: "",
                    salario: "",
                    cargaSemanal: "",
                    cargaTotal: "",
                    key: 0
                })
            }
            return;
        })();
    }, []);

    return (
        <div>
            <p className="text-2xl mb-4">Cadastro do Contrato Estágio</p>
            <CadastroContratoEstagio data={contratoEstagio} />
        </div>
    );
}