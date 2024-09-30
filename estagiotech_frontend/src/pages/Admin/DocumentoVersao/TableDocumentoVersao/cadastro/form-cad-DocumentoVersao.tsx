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
import { Combobox, ComboboxProps } from "@/components/ui/combobox";
import { Button } from "@/components/ui/button";
import api from "../../../../../service/api";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { DocumentoVersaoProps } from "../table/columms";

export type DocumentoVersaoProps = {
  idDocumentoVersao: number;
  comentario: string;
  anexo: number;
  data: string;
  situacao: string;
  idDocumento: number;
  key: number;
}


const formSchema = z.object({
  nomeSupervisor: z.string(),
  concedenteId: z.number(),
});

type DocumentoVersaoProps = z.infer<typeof formSchema>;

const DocumentoVersaoProps = ({ data }: { data: DocumentoVersaoProps }) => {
  const navigate = useNavigate();

  const [isEdit, setIsEdit] = useState(false);
  const [nomeSupervisor, setnomeSupervisor] = useState("") 
  const [dataComboBoxC, setDataComboBoxC] = useState<ComboboxProps[]>([]);
  const [valueComboBoxC, setValueComboBoxC] = useState("");

  const form = useForm<DocumentoVersaoProps>({
    resolver: zodResolver(formSchema),
    values: {
      idDocumentoVersao: "",
      comentario: "", 
      anexo:""
      data: 0,
      situacao: "", 
      idDocumento: 0,
      key:0,
    },
    defaultValues: {
      idDocumentoVersao: "",
      comentario: "", 
      anexo:"",
      data: 0,
      situacao: "", 
      idDocumento: 0,
      key:0,
    },
  });

  useEffect(() => {
    (async () => {
      const concedenteSelecionado = data.concedenteId;
      const checkIsedit = Object.keys(data).length;
      if (concedenteSelecionado > 0) setIsEdit(true);
      if (concedenteSelecionado) {
        setValueComboBoxC(concedenteSelecionado.toString()),
        setnomeSupervisor(data.nomeSupervisor);
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
    console.log(values)
   ! isEdit ?
      await api
        .post("/SupervisorEstagio", {
          concedenteId: valueComboBoxC, nomeSupervisor: nomeSupervisor
        })
        .finally(() => navigate("/adm/supervisorestagio"))
      : await api
        .put(`/SupervisorEstagio/${data.idSupervisor}`, {
          idSupervisor: data.idSupervisor,
          nomeSupervisor: nomeSupervisor,
          concedenteId: valueComboBoxC,
        })
        .finally(() => navigate("/adm/supervisorestagio"));
  }

  return (
    <Card className="p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent>
            <FormField
              key="nomeSupervisor" // Adicionando chave única aqui
              control={form.control}
              name="nomeSupervisor"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Nome do Supervisor</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do Supervisor"onChange={(e)=> setnomeSupervisor(e.target.value)} value = {nomeSupervisor} />
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
                <FormItem className="flex items-center gap-4 mt-5">
                  <FormLabel>Nome do concedente</FormLabel>
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