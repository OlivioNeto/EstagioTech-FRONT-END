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
import { DocumentoProps } from "../table/columns";

const formSchema = z.object({
  descricaoDocumento: z.string(),
  situacaoDocumento: z.string(),
});

type FormCadastroProps = z.infer<typeof formSchema>;

const FormCadastroDocumento = ({ data }: { data: DocumentoProps }) => {
  const navigate = useNavigate();
  const isEdit = !!data.idDocumento;
  const form = useForm<FormCadastroProps>({
    resolver: zodResolver(formSchema),
    values: {
      descricaoDocumento: data.descricaoDocumento,
      situacaoDocumento: data.situacaoDocumento,
    },
    defaultValues: {
      descricaoDocumento: "",
      situacaoDocumento: "",
    },
  });

  async function onSubmit(values: FormCadastroProps) {
    console.log(isEdit)
    !isEdit ?
      await api
        .post("/Documento", values)
        .finally(() => navigate("/adm/documento"))
      : await api
        .put(`/Documento`, {
          idDocumento: data.idDocumento,
          descricaoDocumento: values.descricaoDocumento,
          situacaoDocumento: values.situacaoDocumento,
        })
        .finally(() => navigate("/adm/documento"));

  }

  return (
    <Card className="p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent>
            <FormField
              control={form.control}
              name="descricaoDocumento"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Descrição do documento</FormLabel>
                  <FormControl>
                    <Input placeholder="Descreva o documento" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="situacaoDocumento"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Situação do documento</FormLabel>
                  <FormControl>
                    <Input placeholder="Qual a situação do documento" {...field} />
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
              onClick={() => navigate("/adm/documento")}
            >
              Voltar
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default FormCadastroDocumento;