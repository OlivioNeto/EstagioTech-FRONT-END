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
// import { Input } from "@/components/ui/input";
import { Combobox, ComboboxProps } from "@/components/ui/combobox";
import { Button } from "@/components/ui/button";
import api from "../../../../../service/api";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { ConcendenteProps } from "@/pages/Admin/Concedente/TableConcedente/table/colums";

export type SupervisorEstagioProps = {
  idSupervisor: number;
  statusSupervisor: boolean;
  concedenteId: number;
  key: number;
}


const formSchema = z.object({
  statusSupervisor: z.boolean(),
  concedenteId: z.number(),
});

type FormCadastroProps = z.infer<typeof formSchema>;

const FormCadastroSupervisorEstagio = ({ data }: { data: SupervisorEstagioProps }) => {
  const navigate = useNavigate();

  const [isEdit, setIsEdit] = useState(false);

  const [dataComboBoxS, setDataComboBoxS] = useState<ComboboxProps[]>([{ value: "true", label: "Ativo" }, { value: "false", label: "Inativo" }]);
  const [dataComboBoxC, setDataComboBoxC] = useState<ComboboxProps[]>([]);


  const [valueComboBoxS, setValueComboBoxS] = useState("");
  const [valueComboBoxC, setValueComboBoxC] = useState("");

  const convertStatusParaBooleano = (status: any) => {
    console.log("teste" + status);
    return status;
  };

  const form = useForm<FormCadastroProps>({
    resolver: zodResolver(formSchema),
    values: {
      statusSupervisor: convertStatusParaBooleano(data.statusSupervisor || false),
      concedenteId: 0,
    },
    defaultValues: {
      statusSupervisor: convertStatusParaBooleano(data.statusSupervisor || false),
      concedenteId: 0,
    },
  });

  useEffect(() => {
    (async () => {
      if (data.idSupervisor !== 0) {
        setValueComboBoxC(data.statusSupervisor.toString());
        setIsEdit(true);
      }
    })();
  }, [data]);

  useEffect(() => {
    (async () => {
      const concedenteSelecionado = data.concedenteId;
      const checkIsedit = Object.keys(data).length;
      if (checkIsedit > 0) setIsEdit(true);
      if (concedenteSelecionado) {
        setValueComboBoxC(concedenteSelecionado.toString());
      }

      const resp: ConcendenteProps[] = (await api.get("/concedente")).data;

      setDataComboBoxC(
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
    console.log(values);
    const status = valueComboBoxS === "true";
    console.log(status);

    !isEdit ?
      await api
        .post("/SupervisorEstagio", { ...values, statusSupervisor: status, concedenteId: Number(valueComboBoxC) }) // passando o status corretamente
        .finally(() => navigate("/adm/supervisorestagio"))
      : await api
        .put(`/SupervisorEstagio/${data.idSupervisor}`, {
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
                    <Combobox
                      data={dataComboBoxS}
                      value={valueComboBoxS}
                      setValue={setValueComboBoxS}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              key="concedenteId" // Adicionando chave única aqui
              control={form.control}
              name="concedenteId"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>ID DO CONCEDENTE</FormLabel>
                  <FormControl>
                    <Combobox
                      data={dataComboBoxC}
                      value={valueComboBoxC}
                      setValue={setValueComboBoxC}
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


