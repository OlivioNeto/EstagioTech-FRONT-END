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
import { Combobox,ComboboxProps } from "@/components/ui/combobox";
import { Button } from "@/components/ui/button";
import api from "../../../../../service/api";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { SupervisorEstagioProps } from "../table/columns";
import { useEffect, useState } from "react";
// import SupervisorEstagio from "..";


const formSchema = z.object({
  statusSupervisor: z.boolean(),
});

type FormCadastroProps = z.infer<typeof formSchema>;

const FormCadastroSupervisorEstagio = ({ data }: { data: SupervisorEstagioProps }) => {
  const navigate = useNavigate();
  // const isEdit = !!data.idSupervisor;
  const [isEdit, setIsEdit] = useState(false);

  const [dataComboBoxS, setDataComboBoxS] = useState<ComboboxProps[]>([]);
  const [valueComboBoxS, setValueComboBoxS] = useState("true");

  const convertStatusParaBooleano = (status: any) => {
    // Verifica se status é definido antes de chamar toLowerCase()
    console.log(valueComboBoxS);
    return valueComboBoxS === "true";
  };
  const form = useForm<FormCadastroProps>({
    resolver: zodResolver(formSchema),
    values: {
      statusSupervisor: convertStatusParaBooleano(data.statusSupervisor || ''),
    },
    // defaultValues: {
    //   statusSupervisor: false,
    // },
    defaultValues: {
      statusSupervisor: convertStatusParaBooleano(data.statusSupervisor || ''), // Garante que data.statusSupervisor seja uma string
    },
  });

  useEffect(() => {
    (async () => {
      const supervisorestagioSelecionado = data.idSupervisor;

      //const checkIsedit = Object.keys(data).length;
      if (supervisorestagioSelecionado == 0) {
        setValueComboBoxS("true");
        setIsEdit(true);
      } else {
        const resp: SupervisorEstagioProps[] = (await api.get(`/supervisorestagio/${supervisorestagioSelecionado}`)).data;
        setValueComboBoxS(resp.statusSupervisor.toString());
      }
 
      // const resp: SupervisorEstagioProps[] = (await api.get("/supervisorestagio")).data;

      const status = [{ value: true, label: "Ativo" }, { value: false, label: "Inativo" }];
      setDataComboBoxS(
        status.map((item) => {
          return {
            value: item.value.toString(),
            label: item.label
          };
        })
      );
    })();
  }, [data]);

  async function onSubmit(values: FormCadastroProps) {
    console.log(values);
    const status = valueComboBoxS === "true";
    console.log(status);
  
    isEdit ?
      await api
        .post("/SupervisorEstagio", {idSupervisor: 0, statusSupervisor: status}) // passando o status corretamente
        .finally(() => navigate("/adm/supervisorestagio"))
      : await api
        .put("/SupervisorEstagio/" + data.idSupervisor, {
          idSupervisor: data.idSupervisor,
          statusSupervisor: status,
        })
        .finally(() => navigate("/adm/supervisorestagio"));
  }

  useEffect(() => {
    console.log(valueComboBoxS);
    console.log(dataComboBoxS);
  }, [valueComboBoxS]);

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

                    {/* <Input
                      placeholder="Qual o status do coordenador"
                      {...field}
                      value={field.value ? 'Ativo' : 'Inativo'}
                      onChange={(e) => {
                        // Se o valor do input for 'Ativo', define como true, senão, define como false
                        field.onChange(e.target.value === 'Ativo');
                      }}
                    /> */}
                   <Combobox
                      data={dataComboBoxS}
                      value={valueComboBoxS}
                      setValue={(option) => setValueComboBoxS(option)}
                    />

                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="flex gap-4">
            <Button type="submit">
              {isEdit ? "Cadastrar" : "Salvar alterações"}
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


