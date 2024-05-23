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
import { useEffect, useState } from "react";
import { Combobox, ComboboxProps } from "@/components/ui/combobox";

const formSchema = z.object({
  dataCadastro: z.string(),
  statusCoordenadorEstagio: z.boolean(),
});

type FormCadastroProps = z.infer<typeof formSchema>;

const FormCadastroCoordenadorEstagio = ({ data }: { data: CoordenadorEstagioProps }) => {
  const navigate = useNavigate();

  const [isEdit, setIsEdit] = useState(false);

  const [dataComboBoxC, setDataComboBoxC] = useState<ComboboxProps[]>([{value: "true", label: "Ativo"}, {value: "false", label: "Inativo"}]);
  const [valueComboBoxC, setValueComboBoxC] = useState("");

  const convertStatusParaBooleano = (status: any) => {
    // Verifica se status é definido antes de chamar toLowerCase()
    console.log("teste"+status);
    return status;
  };

  const form = useForm<FormCadastroProps>({
    resolver: zodResolver(formSchema),
    values: {
      dataCadastro: data.dataCadastro,
      statusCoordenadorEstagio: convertStatusParaBooleano(data.statusCoordenadorEstagio || false),
    },
    defaultValues: {
      dataCadastro: "",
      statusCoordenadorEstagio: convertStatusParaBooleano(data.statusCoordenadorEstagio || false),
    },
  });

  useEffect(() => {
    (async () => {
      if (data.idCoordenadorEstagio !== 0) 
      {
        setValueComboBoxC(data.statusCoordenadorEstagio.toString());
        setIsEdit(true);
      }
    })();
  }, [data]);

  async function onSubmit(values: FormCadastroProps) {
    console.log(isEdit);
    const status = valueComboBoxC;

    !isEdit ?
      await api
        .post("/CoordenadorEstagio", values)
        .finally(() => navigate("/adm/coordenadorestagio"))
      : await api
        .put(`/CoordenadorEstagio`, {
          idCoordenadorEstagio: data.idCoordenadorEstagio,
          dataCadastro: values.dataCadastro,
          statusCoordenadorEstagio: valueComboBoxC === "true",
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
              key="idCoordenadorEstagio" // Adicionando chave única aqui
              control={form.control}
              name="statusCoordenadorEstagio"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Status do Coordenador de Estagio</FormLabel>
                  <Combobox
                      data={dataComboBoxC}
                      value={valueComboBoxC}
                      setValue={setValueComboBoxC}
                    />
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