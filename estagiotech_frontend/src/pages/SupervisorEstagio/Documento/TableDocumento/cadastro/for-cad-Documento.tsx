
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
import { useEffect, useState } from "react";
import { Combobox, ComboboxProps } from "@/components/ui/combobox";
import { TipoDocumentoProps } from "@/pages/SupervisorEstagio/TipoDocumento/TableTipoDocumento/table/columns";
import { CoordenadorEstagioProps } from "@/pages/SupervisorEstagio/CoordenadorEstagio/TableCoordenadorEstagio/table/columns";

const formSchema = z.object({
  descricaoDocumento: z.string(),
  situacaoDocumento: z.string(),
  idCoordenadorEstagio: z.number(),
  idTipoDocumento: z.number(),
});

type FormCadastroProps = z.infer<typeof formSchema>;

const FormCadastroDocumento = ({ data }: { data: DocumentoProps }) => {
  const navigate = useNavigate(); // Inicializando navigate

  const [isEdit, setIsEdit] = useState(false);

  const [descricaoDocumento, setdescricaoDocumento] = useState("")
  const [situacaoDocumento, setsituacaoDocumento] = useState("")

  const [dataComboBoxCE, setDataComboBoxCE] = useState<ComboboxProps[]>([]);
  const [dataComboBoxTD, setDataComboBoxTD] = useState<ComboboxProps[]>([]);

  const [valueComboBoxCE, setValueComboBoxCE] = useState("");
  const [valueComboBoxTD, setValueComboBoxTD] = useState("");

  const form = useForm<FormCadastroProps>({
    resolver: zodResolver(formSchema),
    values: {
      descricaoDocumento: data.descricaoDocumento,
      situacaoDocumento: data.situacaoDocumento,
      idCoordenadorEstagio: 0,
      idTipoDocumento: 0,
    },
    defaultValues: {
      descricaoDocumento: "",
      situacaoDocumento: "",
      idCoordenadorEstagio: 0,
      idTipoDocumento: 0,
    },
  });

  useEffect(() => {
    (async () => {
      const tipoDocumentoSelecionado = data.idTipoDocumento;
      const coordenadorEstagioSelecionado = data.idCoordenadorEstagio;
      const checkIsedit = Object.keys(data).length;
      if (tipoDocumentoSelecionado && coordenadorEstagioSelecionado > 0) setIsEdit(true);
      if (tipoDocumentoSelecionado) {
        setValueComboBoxTD(tipoDocumentoSelecionado.toString()),
        setdescricaoDocumento(data.descricaoDocumento);
        setsituacaoDocumento(data.situacaoDocumento);
      }

      const respTipoDocumento: TipoDocumentoProps[] = (await api.get("/tipodocumento")).data;
      const respCoordenadorEstagio: CoordenadorEstagioProps[] = (await api.get("/coordenadorestagio")).data;

      setDataComboBoxCE(
        respCoordenadorEstagio.map((item) => {
          return {
            value: item.idCoordenadorEstagio.toString(),
            label: item.nomeCoordenador,
          };
        })
      );
      setDataComboBoxTD(
        respTipoDocumento.map((item) => {
          return {
            value: item.idTipoDocumento.toString(),
            label: item.descricaoTipoDocumento,
          };
        })
      );
    })();
  }, [data]);

  async function onSubmit(values: FormCadastroProps) {
    console.log(isEdit)
    !isEdit ?
      await api
        .post("/Documento", {
          descricaoDocumento: descricaoDocumento,
          situacaoDocumento: situacaoDocumento,
          idCoordenadorEstagio: valueComboBoxCE,
          idTipoDocumento: valueComboBoxTD
        })
        .finally(() => navigate("/supervisor/documento"))
      : await api
        .put(`/Documento`, {
          idDocumento: data.idDocumento,
          descricaoDocumento: values.descricaoDocumento,
          situacaoDocumento: values.situacaoDocumento,
          idCoordenadorEstagio: valueComboBoxCE,
          idTipoDocumento: valueComboBoxTD
        })
        .finally(() => navigate("/supervisor/documento"));

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
            <FormField
              key="idTipoDocumento" // Adicionando chave única aqui
              control={form.control}
              name="idTipoDocumento"
              render={({ field }) => (
                <FormItem className="flex items-center gap-4 mt-5">
                  <FormLabel>Descrição do Tipo Documento</FormLabel>
                  <FormControl>
                    <Combobox
                      data={dataComboBoxTD}
                      value={valueComboBoxTD}
                      setValue={setValueComboBoxTD}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              key="idCoordenadorEstagio" // Adicionando chave única aqui
              control={form.control}
              name="idCoordenadorEstagio"
              render={({ field }) => (
                <FormItem className="flex items-center gap-4 mt-5">
                  <FormLabel>Nome do Coordenador</FormLabel>
                  <FormControl>
                    <Combobox
                      data={dataComboBoxCE}
                      value={valueComboBoxCE}
                      setValue={setValueComboBoxCE}
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
              onClick={() => navigate("/supervisor/documento")}
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
