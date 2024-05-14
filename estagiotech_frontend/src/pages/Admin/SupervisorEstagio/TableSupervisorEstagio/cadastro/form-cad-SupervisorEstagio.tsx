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
import { SupervisorEstagioProps } from "../table/columns";


const formSchema = z.object({
StatusSupervisorEstagio: z.string(),
});

type FormCadastroProps = z.infer<typeof formSchema>;

const FormCadastroSupervisorEstagio = ({ data }: { data: SupervisorEstagioProps }) => {
  const navigate = useNavigate();
  const isEdit = !!data.idSupervisorEstagio;
  const form = useForm<FormCadastroProps>({
    resolver: zodResolver(formSchema),
    values: {
        StatusSupervisorEstagio: data.statusSupervisorEstagio,
    },
    defaultValues: {
      StatusSupervisorEstagio: "",
    },
  });

  async function onSubmit(values: FormCadastroProps) {
    console.log(isEdit)
    !isEdit ?
      await api
        .post("/SupervisorEstagio", values)
        .finally(() => navigate("/adm/supervisorestagio"))
      : await api
        .put(`/supervisorEstagio`, {
          idSupervisorEstagio: data.idSupervisorEstagio,
          StatusSupervisorEstagio: values.StatusSupervisorEstagio,
        })
        .finally(() => navigate("/adm/supervisorestagio"));

  }

  return (
    <Card className="p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent>
            <FormField
              control={form.control}
              name="StatusSupervisorEstagio"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Status do Supervisor de Estagio</FormLabel>
                  <FormControl>
                    <Input placeholder="Qual o status do Supervisor" {...field} />
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
              onClick={() => navigate("/adm/supervisorestagio")}
            >
              Voltar
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default FormCadastroSupervisorEstagio;
