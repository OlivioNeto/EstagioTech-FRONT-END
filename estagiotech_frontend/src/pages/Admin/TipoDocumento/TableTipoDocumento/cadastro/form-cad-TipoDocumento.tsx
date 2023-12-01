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
import { TipoDocumentoProps } from "../table/columns";

const formSchema = z.object({
  descricaoTipoDocumento: z.string(),
});

type FormCadastroProps = z.infer<typeof formSchema>;

const FormCadastroTipoDocumento = ({ data }: { data: TipoDocumentoProps }) => {
  const navigate = useNavigate();
  const isEdit = !!data.idTipoDocumento;
  const form = useForm<FormCadastroProps>({
    resolver: zodResolver(formSchema),
    values: {
      descricaoTipoDocumento: data.descricaoTipoDocumento,
    },
    defaultValues: {
      descricaoTipoDocumento: "",
    },
  });
  
  async function onSubmit(values: FormCadastroProps) {
    console.log(isEdit)
    !isEdit?
    await api
        .post("/TipoDocumento", values.descricaoTipoDocumento, {headers: {"Content-Type": "application/json" }})
        .finally(() => navigate("/adm/tipodocumento"))
      : await api
          .put(`/TipoDocumento/${data.idTipoDocumento}`, {
            ...values,
            idTipoDocumento: data.idTipoDocumento,
          })
          .finally(() => navigate("/adm/tipodocumento"));

  }

  return (
    <Card className="p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent>
            <FormField
              control={form.control}
              name="descricaoTipoDocumento"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Descrição do Tipo Documento</FormLabel>
                  <FormControl>
                    <Input placeholder="Descreva o tipo do documento" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="flex gap-4">
            <Button type="submit">
              {!isEdit? "Cadastrar" : "Salvar alterações"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/adm/tipodocumento")}
            >
              Voltar
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default FormCadastroTipoDocumento;