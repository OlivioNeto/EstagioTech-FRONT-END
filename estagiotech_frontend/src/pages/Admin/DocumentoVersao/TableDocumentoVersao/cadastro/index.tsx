// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { DocumentoVersaoProps } from "./form-cad-DocumentoVersao";
// import { DocumentoVersaoProps } from "../table/columms";
// import api from "@/service/api";
// import DocumentoVersaoForm from "./form-cad-DocumentoVersao";

// export default function CadDocumentove() {
//     const [documentoNecessario, setdocumentoNecessario] = useState<DocumentoVersaoProps>({idDocumentoVersao: 0, idDocumento: 0, comentario: "", anexo: 0, data: "", situacao:"" ,key 0});
//     const { id } = useParams();
//     useEffect(() => {
//       console.log(id)
//     }, [id])
    
//     useEffect(() => {
//         (async () => {
//             if (id) {
//                 const data = (await api.get(`/DocumentoNecessario/${id}`)).data;
//                 setdocumentoNecessario(data);
//             } else {
//                 setdocumentoNecessario({
//                     idDocumento: 0,
//                     idDocumentoVersao: 0,
//                     anexo: 0 , 
//                     data: 0,
//                     // situacao: "",
//                     key: 0,
//                 });
//             }
//             return;
//         })();
//     }, []);

//     return (
//         <div>
//             <p className="text-2xl mb-4">Cadastro do Documento Versao</p>
//             <CadastroDocumento i={DocumentoVersaoForm.idDocumentoVersao}
//             idTipoEstagio={documentoNecessario.idTipoDocumento}
//             idTipoDocumento={documentoNecessario.idTipoEstagio}/> 
//         </div>
//     );
// }
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

// Definição do tipo DocumentoVersaoProps para representar as versões de documentos
export type DocumentoVersaoProps = {
  idDocumentoVersao: number;
  comentario: string;
  anexo: number;
  data: string;
  situacao: string;
  idDocumento: number;
  key: number;
};

// Definindo o esquema de validação para o formulário com Zod
const formSchema = z.object({
  comentario: z.string().min(1, "O comentário é obrigatório"),
  anexo: z.number().min(1, "O anexo é obrigatório"),
  idDocumento: z.number().min(1, "O documento é obrigatório"),
});

const DocumentoVersaoForm = ({ data }: { data: DocumentoVersaoProps }) => {
  const navigate = useNavigate();

  // Estado para verificar se é uma edição ou um novo cadastro
  const [isEdit, setIsEdit] = useState(false);
  const [comentario, setComentario] = useState("");
  const [dataComboBoxD, setDataComboBoxD] = useState<ComboboxProps[]>([]);
  const [valueComboBoxD, setValueComboBoxD] = useState("");

  // Inicialização do hook useForm para gerenciamento do formulário
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comentario: "",
      anexo: 0,
      idDocumento: 0,
    },
  });

  // useEffect para carregar dados ao montar o componente
  useEffect(() => {
    (async () => {
      if (data) {
        const documentoSelecionado = data.idDocumento;
        if (documentoSelecionado > 0) setIsEdit(true);
        if (documentoSelecionado) {
          setValueComboBoxD(documentoSelecionado.toString());
          setComentario(data.comentario);
        }
      }

      const resp: DocumentoVersaoProps[] = (await api.get("/documento")).data;

      setDataComboBoxD(
        resp.map((item) => ({
          value: item.idDocumento.toString(),
          label: item.comentario.toString(),
        }))
      );
    })();
  }, [data]);

  // Função de submissão do formulário, realizando POST ou PUT conforme o caso
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    if (!isEdit) {
      await api
        .post("/DocumentoVersao", {
          idDocumento: valueComboBoxD,
          comentario: comentario,
          anexo: values.anexo,
        })
        .finally(() => navigate("/adm/documentoversao"));
    } else {
      await api
        .put(`/DocumentoVersao/${data.idDocumentoVersao}`, {
          idDocumentoVersao: data.idDocumentoVersao,
          comentario: comentario,
          anexo: values.anexo,
          idDocumento: valueComboBoxD,
        })
        .finally(() => navigate("/adm/documentoversao"));
    }
  }

  // Renderização do formulário
  return (
    <Card className="p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent>
            {/* Campo para o Comentário */}
            <FormField
              control={form.control}
              name="comentario"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Comentário</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Comentário"
                      {...field}
                      value={comentario}
                      onChange={(e) => setComentario(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Campo para o Anexo */}
            <FormField
              control={form.control}
              name="anexo"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Anexo</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Combobox para Selecionar Documento */}
            <FormField
              control={form.control}
              name="idDocumento"
              render={({ field}) => (
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

          {/* Botões de Ação */}
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

export default DocumentoVersaoForm;
