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
    documentoNecessarioId: z.number(),
    idTipoDocumento: z.number(),
    idTipoEstagio: z.number(),
});

type FormCadastroProps = z.infer<typeof formSchema>;

const CadastroDocumentoNecessario = ({ documentoNecessarioId, idTipoDocumento, idTipoEstagio }: FormCadastroProps) => {
    const navigate = useNavigate();
    const [isEdit, setIsEdit] = useState(false);
    const [dataComboBoxD, setDataComboBoxD] = useState<ComboboxProps[]>([]);
    const [dataComboBoxE, setDataComboBoxE] = useState<ComboboxProps[]>([]);

    const [valueComboBoxD, setValueComboBoxD] = useState("");
    const [valueComboBoxE, setValueComboBoxE] = useState("");

    const form = useForm<FormCadastroProps>({
        resolver: zodResolver(formSchema),
        values: {
            documentoNecessarioId: documentoNecessarioId,
            idTipoDocumento: idTipoDocumento,
            idTipoEstagio: idTipoEstagio,
        },
        defaultValues: {
            documentoNecessarioId: 0,
            idTipoDocumento: 0,
            idTipoEstagio: 0,
        },
    });

    useEffect(() => {
        (async () => {
            const tipoDocumentoSelecionado = idTipoDocumento;
            const tipoEstagioSelecionado = idTipoEstagio;
            setIsEdit(idTipoDocumento !== 0);
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
    }, [idTipoDocumento]);


    async function onSubmit(values: FormCadastroProps) {
        const dataTipoDocumento = Number(valueComboBoxD);
        const dataTipoEstagio = Number(valueComboBoxE);
        isEdit
            ? await api
                .put(`/documentonecessario/${documentoNecessarioId}`, {
                    ...values,
                    idTipoDocumento: dataTipoDocumento,
                    idTipoEstagio: dataTipoEstagio,
                })
                .finally(() => navigate("/adm/documentonecessario"))
            : await api
                .post("/documentonecessario", { idTipoDocumento: dataTipoDocumento, idTipoEstagio: dataTipoEstagio })
                .finally(() => navigate("/adm/documentonecessario"));
    }
    return (
        <Card className="p-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <CardContent>
                        <FormField
                            key="idTipoDocumento" // Adicionando chave única aqui
                            control={form.control}
                            name="idTipoDocumento"
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
                            key="idTipoEstagio" // Adicionando chave única aqui
                            control={form.control}
                            name="idTipoEstagio"
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
                            {isEdit ? "Salvar alterações" : "Cadastrar"}
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
