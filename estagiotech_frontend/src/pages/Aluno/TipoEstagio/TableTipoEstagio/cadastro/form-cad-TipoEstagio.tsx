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
import { TipoEstagioProps } from "../table/columns";

const formSchema = z.object({
  descricaoTipoEstagio: z.string(),
});

type FormCadastroProps = z.infer<typeof formSchema>;

const FormCadastroTipoEstagio = ({ data }: { data: TipoEstagioProps }) => {
  const navigate = useNavigate();
  const isEdit = !!data.idTipoEstagio;

  const form = useForm<FormCadastroProps>({
    resolver: zodResolver(formSchema),
    values: {
      descricaoTipoEstagio: data.descricaoTipoEstagio,
    },
    defaultValues: {
      descricaoTipoEstagio: "",
    },
  });

  async function onSubmit(values: FormCadastroProps) {
    console.log(isEdit)
    !isEdit ?
      await api
        .post("/TipoEstagio", values.descricaoTipoEstagio, { headers: { "Content-Type": "application/json" } })
        .finally(() => navigate("/aluno/tipoestagio"))
      : await api
        .put(`/TipoEstagio/${data.idTipoEstagio}`, {
          ...values,
          idTipoEstagio: data.idTipoEstagio,
        })
        .finally(() => navigate("/aluno/tipoestagio"));
  }

  return (
    <Card className="p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent>
            <FormField
              control={form.control}
              name="descricaoTipoEstagio"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Descrição do Tipo Estágio</FormLabel>
                  <FormControl>
                    <Input placeholder="Descreva o tipo do estágio" {...field} />
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
              onClick={() => navigate("/aluno/tipoestagio")}
            >
              Voltar
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default FormCadastroTipoEstagio;
