import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import api from "../../../../../service/api";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ContratoEstagioProps } from "../table/columns";

const formSchema = z.object({
    statusContratoEstagio: z.string(),
    notaFinal: z.string(),
    situacao: z.string(),
    horarioEntrada: z.string(),
    horarioSaida: z.string(),
    dataInicio: z.string(),
    dataFim: z.string(),
    salario: z.string(),
    cargaSemanal: z.string(),
    cargaTotal: z.string(),
});

type FormCadastroProps = z.infer<typeof formSchema>;

const CadastroContratoEstagio = ({ data }: { data: ContratoEstagioProps }) => {
    const navigate = useNavigate();
    const isEdit = !!data.contratoestagioId;
    const form = useForm<FormCadastroProps>({
        resolver: zodResolver(formSchema),
        values: {
            statusContratoEstagio: data.statusContratoEstagio,
            notaFinal: data.notaFinal,
            situacao: data.situacao,
            horarioEntrada: data.horarioEntrada,
            horarioSaida: data.horarioSaida,
            dataInicio: data.dataInicio,
            dataFim: data.dataFim,
            salario: data.salario,
            cargaSemanal: data.cargaSemanal,
            cargaTotal: data.cargaTotal,
        },
        defaultValues: {
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
        },
    });

    async function onSubmit(values: FormCadastroProps) {
        console.log(isEdit)
        !isEdit ?
            await api
                .post("/ContratoEstagio", values)
                .finally(() => navigate("/adm/contratoestagio"))
            : await api
                .put(`/ContratoEstagio`, {
                    contratoestagioId: data.contratoestagioId,
                    statusContratoEstagio: data.statusContratoEstagio,
                    notaFinal: data.notaFinal,
                    situacao: data.situacao,
                    horarioEntrada: data.horarioEntrada,
                    horarioSaida: data.horarioSaida,
                    dataInicio: data.dataInicio,
                    dataFim: data.dataFim,
                    salario: data.salario,
                    cargaSemanal: data.cargaSemanal,
                    cargaTotal: data.cargaTotal,
                })
                .finally(() => navigate("/adm/contratoestagio"));

    }

    return (
        <Card className="p-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <CardContent>
                        <FormField
                            control={form.control}
                            name="statusContratoEstagio"
                            render={({ field }) => (
                                <FormItem className="mt-5">
                                    <FormLabel>Status do Contrato</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Descreva o status atual do documento" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="notaFinal"
                            render={({ field }) => (
                                <FormItem className="mt-5">
                                    <FormLabel>Nota Final</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Qual a a nota final do estagiário deste contrato" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="situacao"
                            render={({ field }) => (
                                <FormItem className="mt-5">
                                    <FormLabel>Situação do Contrato</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Qual a situação do contrato" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="horarioEntrada"
                            render={({ field }) => (
                                <FormItem className="mt-5">
                                    <FormLabel>Horário de Entrada</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Qual o horário de entrada do estagiário" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="dataInicio"
                            render={({ field }) => (
                                <FormItem className="mt-5">
                                    <FormLabel>Horário de Saída</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Qual o horário de saída do estagiário" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="dataInicio"
                            render={({ field }) => (
                                <FormItem className="mt-5">
                                    <FormLabel>Data Início</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Qual a data que o documento começou a valer" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="salario"
                            render={({ field }) => (
                                <FormItem className="mt-5">
                                    <FormLabel>Salário</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Qual o salário do estagiário" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="cargaSemanal"
                            render={({ field }) => (
                                <FormItem className="mt-5">
                                    <FormLabel>Carga Semanal</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Qual a carga semanal de trabalho do estagiário" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="cargaTotal"
                            render={({ field }) => (
                                <FormItem className="mt-5">
                                    <FormLabel>Carga Total</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Qual a carga total de trabalho do estagiário" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>

                    <CardFooter className="flex gap-4">
                        <Button type="submit">
                            {!isEdit ? "Cadastrar" : "Salvar alterações"}
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => navigate("/adm/contratoestagio")}
                        >
                            Voltar
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
};

export default CadastroContratoEstagio;