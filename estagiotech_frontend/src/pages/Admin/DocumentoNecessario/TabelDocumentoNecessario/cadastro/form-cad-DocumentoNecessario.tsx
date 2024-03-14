import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import api from "../../../../../service/api";
import { useEffect, useState } from "react";
import { Combobox, ComboboxProps } from "../../../../../components/ui/combobox";
import { TipoDocumentoProps } from "@/pages/Admin/TipoDocumento/TableTipoDocumento/table/columns";
import { TipoEstagioProps } from "@/pages/Admin/TipoEstagio/TableTipoEstagio/table/columns";

const formSchema = z.object({
    idTipoDocumento: z.number(),
    idTipoEstagio: z.number(),
});

type FormCadastroProps = z.infer<typeof formSchema>;

const FormCadastroDocumentoNecessario = ({ data }: { data: FormCadastroProps }) => {
    const navigate = useNavigate();
    const [isEdit, setIsEdit] = useState(false);
    const [dataComboBox, setDataComboBox] = useState<ComboboxProps[]>([]);

    const [valueComboBox, setValueComboBox] = useState("");

    const form = useForm<FormCadastroProps>({
        resolver: zodResolver(formSchema),
        values: {
            idTipoDocumento: data.idTipoDocumento,
            idTipoEstagio: data.idTipoEstagio,
        },
        defaultValues: {
            idTipoDocumento: 0,
            idTipoEstagio: 0,
        },
    });

    useEffect(() => {
        (async () => {
            const tipoDocumentoSelecionado = data.idTipoDocumento;
            const tipoEstagioSelecionado = data.idTipoEstagio;
            const checkIsedit = Object.keys(data).length;
            if (checkIsedit > 0) setIsEdit(true);
            if (tipoDocumentoSelecionado && tipoEstagioSelecionado) {
                setValueComboBox(tipoDocumentoSelecionado.toString());
                setValueComboBox(tipoEstagioSelecionado.toString());
            }

            const resp: TipoDocumentoProps[] = (await api.get("tipodocumento")).data;
            const resptypeEstagio: TipoEstagioProps[] = (await api.get("tipoestagio")).data;

            setDataComboBox([
                ...resp.map((item) => ({
                    value: item.idTipoDocumento.toString(),
                    label: item.descricaoTipoDocumento,
                })),
                ...resptypeEstagio.map((item) => ({
                    value: item.idTipoEstagio.toString(),
                    label: item.descricaoTipoEstagio,
                })),
            ]);
        })();
    }, [data]);

    async function onSubmit(values: FormCadastroProps) {
        const dataVagas = { ...values, concedenteId: Number(valueComboBox) };
        isEdit
            ? await api
                .put(`/documentonecessario/${data.idTipoDocumento}`, {
                    ...values,
                    idTipoDocumento: data.idTipoDocumento,
                    idTipoEstagio: data.idTipoEstagio,
                })
                .finally(() => navigate("/dashboard/vagas"))
            : await api
                .post("/vagas", dataVagas)
                .finally(() => navigate("/dashboard/vagas"));
    }
    return (
        <Card className="p-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <CardContent className="grid grid-cols-2 gap-x-7">
                        <FormField
                            control={form.control}
                            name="concedenteId"
                            render={({ field }) => (
                                <FormItem className="mt-5 flex flex-col">
                                    <FormLabel>Codigo da Empresa</FormLabel>
                                    <FormControl>
                                        <Combobox
                                            data={dataComboBox}
                                            value={valueComboBox}
                                            setValue={setValueComboBox}
                                        />

                                        {/* <Input
                      placeholder="Codigo da Empresa"
                      {...field}
                      onChange={(event) =>
                        field.onChange(Number(event.target.value))
                      }
                    /> */}
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="quantidade"
                            render={({ field }) => (
                                <FormItem className="mt-5">
                                    <FormLabel>Quantidade de Vagas</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Quantidade de Vagas"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="dataPublicacao"
                            render={({ field }) => (
                                <FormItem className="mt-5">
                                    <FormLabel>Data da publicação</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Data da publicação" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="dataLimite"
                            render={({ field }) => (
                                <FormItem className="mt-5">
                                    <FormLabel>Data limite</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Data limite" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="localidade"
                            render={({ field }) => (
                                <FormItem className="mt-5">
                                    <FormLabel>Localidade</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Qual a cidadde" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="descricao"
                            render={({ field }) => (
                                <FormItem className="mt-5">
                                    <FormLabel>Descrição</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Descrição da Vaga" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="titulo"
                            render={({ field }) => (
                                <FormItem className="mt-5">
                                    <FormLabel>Titulo da Vaga</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Titulo da Vaga" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="localidadeTrabalho"
                            render={({ field }) => (
                                <FormItem className="mt-5">
                                    <FormLabel>Localidade do trabalho</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Localidade do trabalho" {...field} />
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
                                    <FormLabel>Horario de Entrada</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="time"
                                            placeholder="Horario de Entrada"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="horarioSaida"
                            render={({ field }) => (
                                <FormItem className="mt-5">
                                    <FormLabel>Horario de Saida</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="time"
                                            placeholder="Horario de Saida"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="totalHorasSemanis"
                            render={({ field }) => (
                                <FormItem className="mt-5">
                                    <FormLabel>Total horas Semanais</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Total horas Semanais" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>

                    <CardFooter className="flex gap-4">
                        <Button type="submit">
                            {isEdit ? "Salvar alterações" : "Cadastrar"}
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => navigate("/dashboard/vagas")}
                        >
                            Voltar
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
};

export default FormCadastroVagas;
