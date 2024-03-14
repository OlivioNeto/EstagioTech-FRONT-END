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
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import api from "../../../../../service/api";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { DocumentoNecessarioProps } from "../table/columns";
import { TipoDocumentoProps } from "@/pages/Admin/TipoDocumento/TableTipoDocumento/table/columns";
import { TipoEstagioProps } from "@/pages/Admin/TipoEstagio/TableTipoEstagio/table/columns";

const formSchema = z.object({
    idTipoDocumento: z.number(),
    idTipoEstagio: z.number(),
});

type FormCadastroProps = z.infer<typeof formSchema>;

const FormCadastroDocumentoNecessario = ({ data }: { data: DocumentoNecessarioProps }) => {
    const navigate = useNavigate();
    // const [isEdit, setIsEdit] = !!data.DocumentoNecessarioId;
    const [isEdit, setIsEdit] = useState(false);
    const [valueComboBox, setValueComboBox] = useState("");
    const [dataComboBox, setDataComboBox] = useState<ComboboxProps[]>([]);
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
    //transformando o id em string
    useEffect(() => {
        (async () => {
          const tipoDocumentoSelecionado = data.idTipoDocumento;
          const checkIsedit = Object.keys(data).length;
          if (checkIsedit > 0) setIsEdit(true);
          if (tipoDocumentoSelecionado) {
            setValueComboBox(tipoDocumentoSelecionado.toString());
          }
          const tipoEstagioSelecionado = data.idTipoEstagio;
          const checkIsEdit = Object.keys(data).length;
          if (checkIsEdit > 0) setIsEdit(true);
          if (tipoEstagioSelecionado) {
            setValueComboBox(tipoEstagioSelecionado.toString());
          }
    
          const resp: TipoDocumentoProps[] = (await api.get("tipodocumento")).data;
          const respe: TipoEstagioProps[] = (await api.get("tipoestagio")).data;
    
          setDataComboBox(
            resp.map((item) => {
              return {
                value: item.concedenteId.toString(),
                label: item.razaoSocial,
              };
            })
          );
        })();
      }, [data]);
    async function onSubmit(values: FormCadastroProps) {
        console.log(isEdit)
        !isEdit ?
            await api
                .post("/DocumentoNecessario", values.idTipoDocumento, { headers: { "Content-Type": "application/json" } })
                .finally(() => navigate("/adm/documentonecessario"))
            : await api
                .put(`/TipoNecessario/${data.DocumentoNecessarioId}`, {
                    ...values,
                    DocumentoNecessarioId: data.DocumentoNecessarioId,
                    idTipoDocumento: data.idTipoDocumento,
                    idTipoEstagio: data.idTipoEstagio,
                })
                .finally(() => navigate("/adm/documentonecessario"));

    }
    return (
        <Card className="p-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <CardContent>
                        <FormField
                            control={form.control}
                            name="idTipoDocumento"
                            render={({ field }) => (
                                <FormItem className="mt-5">
                                    <FormLabel>ID DO TIPO DOCUMENTO</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Descreva o código do tipo documento" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="idTipoEstagio"
                            render={({ field }) => (
                                <FormItem className="mt-5">
                                    <FormLabel>ID DO TIPO ESTÁGIO</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Descreva o código do tipo estágio" {...field} />
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

export default FormCadastroDocumentoNecessario;