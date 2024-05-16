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
import SupervisorEstagio from "..";


const formSchema = z.object({
  statusSupervisor: z.boolean(),
});

type FormCadastroProps = z.infer<typeof formSchema>;

const FormCadastroSupervisorEstagio = ({ data }: { data: SupervisorEstagioProps }) => {
  const navigate = useNavigate();
  const isEdit = !!data.idSupervisor;
  const convertStatusParaBooleano = (status: any) => {
    // Verifica se status é definido antes de chamar toLowerCase()
    return status && status.toLowerCase() === "ativo";
  };
  const form = useForm<FormCadastroProps>({
    resolver: zodResolver(formSchema),
    values: {
      statusSupervisor: convertStatusParaBooleano(data.statusSupervisor)
    },
    // defaultValues: {
    //   statusSupervisor: false,
    // },
    defaultValues: {
      statusSupervisor: convertStatusParaBooleano(data.statusSupervisor || ''), // Garante que data.statusSupervisor seja uma string
    },
  });

  async function onSubmit(values: FormCadastroProps) {
    console.log(data.idSupervisor)
    !isEdit ?
      await api
        .post("/SupervisorEstagio", values)
        .finally(() => navigate("/adm/supervisorestagio"))
      : await api
        .put("/SupervisorEstagio/" + data.idSupervisor, {
          idSupervisor: data.idSupervisor,
          statusSupervisor: values.statusSupervisor,
        })
        .finally(() => navigate("/adm/supervisorestagio"));

  }

  return (
    <Card className="p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent>
            <FormField
              key="idSupervisor" // Adicionando chave única aqui
              control={form.control}
              name="statusSupervisor"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Status do Supervisor de Estagio</FormLabel>
                  <FormControl>
                    {/* <Input placeholder="Qual o status do coordenador" {...field} value={field.value ? 'Ativo' : 'Inativo'} /> */}

                    <Input
                      placeholder="Qual o status do coordenador"
                      {...field}
                      value={field.value ? 'Ativo' : 'Inativo'}
                      onChange={(e) => {
                        // Se o valor do input for 'Ativo', define como true, senão, define como false
                        field.onChange(e.target.value === 'Ativo');
                      }}
                    />

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


