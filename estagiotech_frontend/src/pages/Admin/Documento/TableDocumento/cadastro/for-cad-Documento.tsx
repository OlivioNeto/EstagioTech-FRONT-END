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
import { TipoDocumentoProps } from "@/pages/Admin/TipoDocumento/TableTipoDocumento/table/columns";
import { CoordenadorEstagioProps } from "@/pages/Admin/CoordenadorEstagio";

export type DocumentoProps = {
  idDocumento: number;
  descricaoDocumento: string;
  situacaoDocumento: string;
  idTipoDocumento: number;
  descricaoTipoDocumento: string;
  idCoordenadorEstagio: number;
  nomeCoordenador: string;
  status: boolean
  key: number;
};



const formSchema = z.object({
  descricaoDocumento: z.string(),
  situacaoDocumento: z.string(),
  idCoordenadorEstagio: z.number(),
  idTipoDocumento: z.number(),
});

type FormCadastroProps = z.infer<typeof formSchema>;

const FormCadastroDocumento = ({ data }: { data: DocumentoProps }) => {
  const navigate = useNavigate();

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

      // Detectar se é uma edição
      const checkIsEdit = Object.keys(data).length;
      if (checkIsEdit > 0) setIsEdit(true);

      if (tipoDocumentoSelecionado && coordenadorEstagioSelecionado > 0) {
        setValueComboBoxTD(tipoDocumentoSelecionado.toString());
        setValueComboBoxCE(coordenadorEstagioSelecionado.toString()); // Atribuir valor ao Combobox
        setdescricaoDocumento(data.descricaoDocumento);
        setsituacaoDocumento(data.situacaoDocumento);
      }

      const respTipoDocumento: TipoDocumentoProps[] = (await api.get("/tipodocumento")).data;
      const respCoordenadorEstagio: CoordenadorEstagioProps[] = (await api.get("/coordenadorestagio")).data;

      setDataComboBoxCE(
        respCoordenadorEstagio.map((item) => ({
          value: item.idCoordenadorEstagio.toString(),
          label: item.nomeCoordenador,
        }))
      );
      setDataComboBoxTD(
        respTipoDocumento.map((item) => ({
          value: item.idTipoDocumento.toString(),
          label: item.descricaoTipoDocumento,
        }))
      );
    })();
  }, [data]);


  async function onSubmit(values: FormCadastroProps) {
    console.log(values)
    !isEdit ?
      await api
        .post("/Documento", {
          idCoordenadorEstagio: valueComboBoxCE,
          idTipoDocumento: valueComboBoxTD,
          descricaoDocumento: descricaoDocumento,
          situacaoDocumento: situacaoDocumento,
        })
        .finally(() => navigate("/aluno/documento"))
      : await api
        .put(`/Documento/${data.idDocumento}`, {
          idCoordenadorEstagio: valueComboBoxCE,
          idDocumento: data.idDocumento,
          idTipoDocumento: valueComboBoxTD,
          descricaoDocumento: descricaoDocumento,
          situacaoDocumento: situacaoDocumento,
        })
        .finally(() => navigate("/aluno/documento"))
  };


  console.log({
    idCoordenadorEstagio: valueComboBoxCE,
    idDocumento: data.idDocumento,
    idTipoDocumento: valueComboBoxTD,
    descricaoDocumento: descricaoDocumento,
    situacaoDocumento: situacaoDocumento,
  });



  return (
    <Card className="p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent>
            <FormField
              key="descricaoDocumento" // Adicionando chave única aqui
              control={form.control}
              name="descricaoDocumento"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Descrição do Documento</FormLabel>
                  <FormControl>
                    <Input placeholder="Descreva o documento" onChange={(e) => setdescricaoDocumento(e.target.value)} value={descricaoDocumento} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              key="situacaoDocumento" // Adicionando chave única aqui
              control={form.control}
              name="situacaoDocumento"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Situação do Documento</FormLabel>
                  <FormControl>
                    <Input placeholder="Situção do documento" onChange={(e) => setsituacaoDocumento(e.target.value)} value={situacaoDocumento} />
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
                      value={valueComboBoxCE} // Estado para controlar o valor selecionado
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
              onClick={() => navigate("/adm/documento")}
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