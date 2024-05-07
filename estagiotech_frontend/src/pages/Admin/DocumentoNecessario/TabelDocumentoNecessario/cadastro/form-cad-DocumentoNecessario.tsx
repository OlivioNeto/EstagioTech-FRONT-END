import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { TableDocs } from "@/components/table-docs";



const formSchema = z.object({
    idDocumentoNecessario: z.number(),
    idTipoEstagio: z.number(),
    idTipoDocumento: z.number(),
});

type FormCadastroProps = z.infer<typeof formSchema>;

const CadastroDocumentoNecessario = ({ idDocumentoNecessario, idTipoEstagio, idTipoDocumento }: FormCadastroProps) => {
    const navigate = useNavigate();
    const [isEdit, setIsEdit] = useState(false);
    const [dataComboBoxD, setDataComboBoxD] = useState<ComboboxProps[]>([]);
    const [dataComboBoxE, setDataComboBoxE] = useState<ComboboxProps[]>([]);

    const [valueComboBoxD, setValueComboBoxD] = useState("");
    const [valueComboBoxE, setValueComboBoxE] = useState("");

   
    const form = useForm<FormCadastroProps>({
        resolver: zodResolver(formSchema),
        values: {
            idDocumentoNecessario: idDocumentoNecessario,
            idTipoEstagio: idTipoEstagio,
            idTipoDocumento: idTipoDocumento,
        },
        defaultValues: {
            idDocumentoNecessario: 0,
            idTipoEstagio: 0,
            idTipoDocumento: 0,
        },
    });

    useEffect(() => {
        (async () => {
            const tipoEstagioSelecionado = idTipoDocumento;
            const tipoDocumentoSelecionado = idTipoEstagio;
            setIsEdit(idTipoEstagio !== 0);
            if (tipoDocumentoSelecionado && tipoEstagioSelecionado) {
                setValueComboBoxD(tipoDocumentoSelecionado.toString());
                setValueComboBoxE(tipoEstagioSelecionado.toString());
            }

            const respTypeDocumento: TipoDocumentoProps[] = (await api.get("tipodocumento")).data;
            const respTypeEstagio: TipoEstagioProps[] = (await api.get("tipoestagio")).data;

            if (!respTypeEstagio || respTypeEstagio.length == 0)
                return;
            setDataComboBoxE(
                respTypeEstagio.map((item) => {
                    return {
                        value: item.idTipoEstagio.toString(),
                        label: item.descricaoTipoEstagio,
                    };
                })
            );
            if (!respTypeDocumento || respTypeDocumento.length == 0)
                return;
            setDataComboBoxD(
                respTypeDocumento.map((item) => {
                    return {
                        value: item.idTipoDocumento.toString(),
                        label: item.descricaoTipoDocumento,
                    };
                })
            );
        })();
    }, [idTipoEstagio]);

    async function onSubmit(values: FormCadastroProps) {
        const dataTipoDocumento = Number(valueComboBoxD);
        const dataTipoEstagio = Number(valueComboBoxE);

        isEdit
            ? await api
                .put(`/documentonecessario/${idDocumentoNecessario}`, {
                    ...values,
                    idTipoEstagio: dataTipoEstagio,
                    idTipoDocumento: dataTipoDocumento,
                })
                .finally(() => navigate("/adm/documentonecessario"))
            : await api
                .post("/documentonecessario", { idTipoEstagio: dataTipoEstagio, idTipoDocumento: dataTipoDocumento })
                .finally(() => navigate("/adm/documentonecessario"));
    }

    return (
        <Card className="p-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <CardContent>
                        <FormField
                            key="idTipoEstagio" // Adicionando chave única aqui
                            control={form.control}
                            name="idTipoEstagio"
                            render={() => (
                                <FormItem className="mt-5">
                                    <FormLabel>Descrição do tipo estágio</FormLabel>
                                    <FormControl>
                                        <Combobox
                                            data={dataComboBoxE}
                                            value={valueComboBoxE}
                                            setValue={setValueComboBoxE}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            key="idTipoDocumento" // Adicionando chave única aqui
                            control={form.control}
                            name="idTipoDocumento"
                            render={() => (
                                <FormItem className="mt-5">
                                    <FormLabel>Descrição do tipo documento</FormLabel>
                                    <FormControl>
                                        <Combobox
                                            data={dataComboBoxD}
                                            value={valueComboBoxD}
                                            setValue={setValueComboBoxD}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                   <TableDocs
                   />
                    <CardFooter className="flex gap-4">
                        <Button type="submit">
                            {isEdit ? "Salvar" : "Cadastrar"}
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => navigate("/adm/documentonecessario")}
                        >
                            Voltar
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
};

export default CadastroDocumentoNecessario;
