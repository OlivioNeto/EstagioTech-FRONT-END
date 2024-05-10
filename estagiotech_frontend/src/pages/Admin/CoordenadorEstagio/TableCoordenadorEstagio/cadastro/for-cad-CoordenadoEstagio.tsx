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
import { CoordenadorEstagioProps } from "../table/columns";

const formSchema = z.object({
dataCadastro: z.string(),
StatusCoordenadorEstagio: z.string(),
});

type FormCadastroProps = z.infer<typeof formSchema>;

const FormCadastroCoordenadorEstagio = ({ data }: { data: CoordenadorEstagioProps }) => {
  const navigate = useNavigate();
  const isEdit = !!data.idCoordenadorEstagio;
  const form = useForm<FormCadastroProps>({
    resolver: zodResolver(formSchema),
    values: {
        dataCadastro: data.dataCadastro,
        StatusCoordenadorEstagio: data.StatusCoordenadorEstagio,
    },
    defaultValues: {
      dataCadastro: "",
      StatusCoordenadorEstagio: "",
    },
  });

  async function onSubmit(values: FormCadastroProps) {
    console.log(isEdit)
    !isEdit ?
      await api
        .post("/CoordenadorEstagio", values)
        .finally(() => navigate("/adm/coordenadorestagio"))
      : await api
        .put(`/CoordenadorEstagio`, {
          idCoordenadorEstagio: data.idCoordenadorEstagio,
          dataCadastro: values.dataCadastro,
          StatusCoordenadorEstagio: values.StatusCoordenadorEstagio,
        })
        .finally(() => navigate("/adm/coordenadorestagio"));

  }

  return (
    <Card className="p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent>
            <FormField
              control={form.control}
              name="dataCadastro"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Data do Cadastro</FormLabel>
                  <FormControl>
                    <Input placeholder="Descreva a data do cadastro" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="StatusCoordenadorEstagio"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Status do Coordenador de Estagio</FormLabel>
                  <FormControl>
                    <Input placeholder="Qual o status do coordenador" {...field} />
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
              onClick={() => navigate("/adm/coordenadorestagio")}
            >
              Voltar
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default FormCadastroCoordenadorEstagio;