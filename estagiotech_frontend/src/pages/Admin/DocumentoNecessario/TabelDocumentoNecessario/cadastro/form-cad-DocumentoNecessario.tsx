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

const formSchema = z.object({
    descricaoTipoDocumento: z.string(),
    descricaoTipoEstagio: z.string(),
});

type FormCadastroProps = z.infer<typeof formSchema>;

const CadastroDocumentoNecessario = ({ data }: { data: FormCadastroProps }) => {
    const navigate = useNavigate();
    const [isEdit, setIsEdit] = useState(false);
    const [dataComboBoxD, setDataComboBoxD] = useState<ComboboxProps[]>([]);
    const [dataComboBoxE, setDataComboBoxE] = useState<ComboboxProps[]>([]);

    const [valueComboBoxD, setValueComboBoxD] = useState("");
    const [valueComboBoxE, setValueComboBoxE] = useState("");

    const form = useForm<FormCadastroProps>({
        resolver: zodResolver(formSchema),
        values: {
            descricaoTipoDocumento: data.descricaoTipoDocumento,
            descricaoTipoEstagio: data.descricaoTipoEstagio,
        },
        defaultValues: {
            descricaoTipoDocumento: "",
            descricaoTipoEstagio: "",
        },
    });

    useEffect(() => {
        (async () => {
            const tipoDocumentoSelecionado = data.descricaoTipoDocumento;
            const tipoEstagioSelecionado = data.descricaoTipoEstagio;
            const checkIsedit = Object.keys(data).length;
            if (checkIsedit > 0) setIsEdit(true);
            if (tipoDocumentoSelecionado && tipoEstagioSelecionado) {
                setValueComboBoxD(tipoDocumentoSelecionado.toString());
                setValueComboBoxE(tipoEstagioSelecionado.toString());
            }

            const resp: TipoDocumentoProps[] = (await api.get("tipodocumento")).data;
            const resptypeEstagio: TipoEstagioProps[] = (await api.get("tipoestagio")).data;

            if (!resp || resp.length == 0)
                return;
            setDataComboBoxD(
                resp.map((item) => {
                    return {
                        value: item.idTipoDocumento.toString(),
                        label: item.descricaoTipoDocumento,
                    };
                })
            );
            if (!resptypeEstagio || resptypeEstagio.length == 0)
                return;
            setDataComboBoxE(
                resptypeEstagio.map((item) => {
                    return {
                        value: item.idTipoEstagio.toString(),
                        label: item.descricaoTipoEstagio,
                    };
                })
            );
        })();
    }, [data]);


    // async function onSubmit(values: FormCadastroProps) {
    //     const dataTipoDocumento = { ...values, idTipoDocumento: Number(valueComboBoxD) };
    //     const dataTipoEstagio = { ...values, idTipoEstagio: Number(valueComboBoxE) };
    //     isEdit
    //         ? await api
    //             // .put(`/documentonecessario/${data.idTipoDocumento, data.idTipoEstagio}`, {
    //             .put(`/documentonecessario/${data.idTipoDocumento}/${data.idTipoEstagio}`, {
    //                 ...values,
    //                 idTipoDocumento: data.idTipoDocumento,
    //                 idTipoEstagio: data.idTipoEstagio,
    //             })
    //             .finally(() => navigate("/adm/documentonecessario"))
    //         : await api
    //             .post("/documentonecessario", { dataTipoDocumento, dataTipoEstagio })
    //             .finally(() => navigate("/adm/documentonecessario"));
    // }
    const onSubmit = async (values: FormCadastroProps) => {
        const dataTipoDocumento = { idTipoDocumento: Number(valueComboBoxD) };
        const dataTipoEstagio = { idTipoEstagio: Number(valueComboBoxE) };
        !isEdit
            ? await api
                .put(`/documentonecessario/${data.descricaoTipoDocumento}/${data.descricaoTipoEstagio}`, {
                    ...values,
                    ...dataTipoDocumento,
                    ...dataTipoEstagio,
                })
                .finally(() => navigate("/adm/documentonecessario"))
            : await api
                .post("/documentonecessario", { ...values, ...dataTipoDocumento, ...dataTipoEstagio })
                .finally(() => navigate("/adm/documentonecessario"));
    };

    return (
        <Card className="p-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <CardContent>
                        <FormField
                            control={form.control}
                            name="descricaoTipoDocumento"
                            render={() => (
                                <FormItem className="mt-5">
                                    <FormLabel>ID DO TIPO DOCUMENTO</FormLabel>
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
                        <FormField
                            control={form.control}
                            name="descricaoTipoEstagio"
                            render={({ field }) => (
                                <FormItem className="mt-5">
                                    <FormLabel>ID DO TIPO ESTÁGIO</FormLabel>
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
                    </CardContent>
                    <CardFooter className="flex gap-4">
                        <Button type="submit">
                            {!isEdit ? "Salvar alterações" : "Cadastrar"}
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
