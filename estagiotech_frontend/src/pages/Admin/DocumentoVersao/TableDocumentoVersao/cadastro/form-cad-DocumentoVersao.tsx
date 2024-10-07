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

// Definindo o tipo de props para DocumentoVersao
export type DocumentoVersaoProps = {
  idDocumentoVersao: number;
  comentario: string;
  anexo: number;
  data: string;
  situacao: string;
  idDocumento: number;
  key: number;
};

// Esquema de validação usando Zod para o formulário
const formSchema = z.object({
  comentario: z.string(),
  anexo: z.number(),
  data: z.string(),
  situacao: z.string(),
  idDocumento: z.number(),
});

type FormCadastroProps = z.infer<typeof formSchema>;

const FormCadastroDocumentoVersao = ({ data }: { data: DocumentoVersaoProps }) => {
  const navigate = useNavigate();

  const [isEdit, setIsEdit] = useState(false);
  const [comentario, setComentario] = useState("");
  const [anexo, setAnexo] = useState(0);
  const [dataDocumento, setDataDocumento] = useState("");
  const [situacao, setSituacao] = useState("");
  const [dataComboBoxD, setDataComboBoxD] = useState<ComboboxProps[]>([]);
  const [valueComboBoxD, setValueComboBoxD] = useState("");

  const form = useForm<FormCadastroProps>({
    resolver: zodResolver(formSchema),
    values: {
      comentario: data.comentario,
      anexo: data.anexo,
      data: data.data,
      situacao: data.situacao,
      idDocumento: data.idDocumento,
    },
    defaultValues: {
      comentario: "",
      anexo: 0,
      data: "",
      situacao: "",
      idDocumento: 0,
    },
  });

  useEffect(() => {
    (async () => {
      const documentoSelecionado = data.idDocumento;
      const checkIsEdit = Object.keys(data).length;
      if (documentoSelecionado > 0) setIsEdit(true);
      if (documentoSelecionado) {
        setValueComboBoxD(documentoSelecionado.toString());
        setComentario(data.comentario);
        setAnexo(data.anexo);
        setDataDocumento(data.data);
        setSituacao(data.situacao);
      }

      const resp = (await api.get("/documento")).data;

      setDataComboBoxD(
        resp.map((item: { idDocumento: number; descricaoDocumento: string }) => {
          return {
            value: item.idDocumento.toString(),
            label: item.descricaoDocumento,
          };
        })
      );
    })();
  }, [data]);

  async function onSubmit(values: FormCadastroProps) {
    console.log(values);
    !isEdit
      ? await api
          .post("/DocumentoVersao", {
            comentario: comentario,
            anexo: anexo,
            data: dataDocumento,
            situacao: situacao,
            idDocumento: valueComboBoxD,
          })
          .finally(() => navigate("/adm/documentoversao"))
      : await api
          .put(`/DocumentoVersao/${data.idDocumentoVersao}`, {
            idDocumentoVersao: data.idDocumentoVersao,
            comentario: comentario,
            anexo: anexo,
            data: dataDocumento,
            situacao: situacao,
            idDocumento: valueComboBoxD,
          })
          .finally(() => navigate("/adm/documentoversao"));
  }

  return (
    <Card className="p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent>
            <FormField
              key="comentario"
              control={form.control}
              name="comentario"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Comentário</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Comentário"
                      onChange={(e) => setComentario(e.target.value)}
                      value={comentario}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              key="anexo"
              control={form.control}
              name="anexo"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Anexo</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Anexo"
                      onChange={(e) => setAnexo(Number(e.target.value))}
                      value={anexo}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              key="data"
              control={form.control}
              name="data"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Data</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      onChange={(e) => setDataDocumento(e.target.value)}
                      value={dataDocumento}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              key="situacao"
              control={form.control}
              name="situacao"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Situação</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Situação"
                      onChange={(e) => setSituacao(e.target.value)}
                      value={situacao}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              key="idDocumento"
              control={form.control}
              name="idDocumento"
              render={({ field }) => (
                <FormItem className="flex items-center gap-4 mt-5">
                  <FormLabel>Documento</FormLabel>
                  <FormControl>
                    <Combobox
                      data={dataComboBoxD}
                      value={valueComboBoxD}
                      setValue={setValueComboBoxD}
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
              onClick={() => navigate("/adm/documentoversao")}
            >
              Voltar
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default FormCadastroDocumentoVersao;
