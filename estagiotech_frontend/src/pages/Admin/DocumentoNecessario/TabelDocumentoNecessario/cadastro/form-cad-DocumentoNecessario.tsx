import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import api from "../../../../../service/api";
import { useEffect, useState } from "react";
import { Combobox, ComboboxProps } from "../../../../../components/ui/combobox";
import { TipoDocumentoProps } from "@/pages/Admin/TipoDocumento/TableTipoDocumento/table/columns";
import { TipoEstagioProps } from "@/pages/Admin/TipoEstagio/TableTipoEstagio/table/columns";
import { TableDocs } from "@/components/table-docs";
import { DocumentoNecessarioProps } from "../table/columns";
import { useParams } from "react-router-dom";

const formSchema = z.object({
  idDocumentoNecessario: z.number(),
  idTipoEstagio: z.number(),
  idTipoDocumento: z.number(),
});

type FormCadastroProps = z.infer<typeof formSchema>;

const CadastroDocumentoNecessario = () => {
  const { id } = useParams();

  const selectId = () => {
    return id === undefined ? 0 : parseInt(id);
  };

  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [update, setUpdate] = useState(false);
  const [data, setData] = useState<TipoDocumentoProps[]>([]);
  const [dataComboBoxD, setDataComboBoxD] = useState<ComboboxProps[]>([]);
  const [dataComboBoxE, setDataComboBoxE] = useState<ComboboxProps[]>([]);

  const [valueComboBoxD, setValueComboBoxD] = useState("");
  const [valueComboBoxE, setValueComboBoxE] = useState("");

  const [selectedTipoEstagio, setSelectedTipoEstagio] = useState<string>("");
  const [selectedTipoDocumento, setSelectedTipoDocumento] =
    useState<string>("");

  const form = useForm<FormCadastroProps>({
    resolver: zodResolver(formSchema),
    values: {
      idDocumentoNecessario: selectId(),
      idTipoEstagio: 0,
      idTipoDocumento: 0,
    },
    defaultValues: {
      idDocumentoNecessario: 0,
      idTipoEstagio: 0,
      idTipoDocumento: 0,
    },
  });

  useEffect(() => {
    (async () => {
      const respTypeEstagio: TipoEstagioProps[] = (await api.get("tipoestagio"))
        .data;

    if (selectId() === 0) {
      setDataComboBoxE(
        respTypeEstagio.map((item) => {
          return {
            value: item.idTipoEstagio.toString(),
            label: item.descricaoTipoEstagio,
          };
        })
      );
    } else {
        setIsEdit(true);

        const respDocumentNecessary: DocumentoNecessarioProps[] = (
          await api.get("documentonecessario")
        ).data;

        const idTipoEstagio = respDocumentNecessary.find((item) => item.idDocumentoNecessario === selectId())?.idTipoEstagio;

          setDataComboBoxE(
            respTypeEstagio
            .filter((item) => item.idTipoEstagio === idTipoEstagio)
            .map((item) => {
              return {
                value: item.idTipoEstagio.toString(),
                label: item.descricaoTipoEstagio,
              };
            })
          );

        setValueComboBoxE(idTipoEstagio !== undefined? idTipoEstagio.toString() : "");
        setSelectedTipoEstagio(idTipoEstagio !== undefined? idTipoEstagio.toString() : "");
      }
    })();
  }, []);

  useEffect(() => {
    if (selectId() !== 0 || selectedTipoEstagio !== "" || update) {
      (async () => {
        setValueComboBoxD("");
        setSelectedTipoDocumento("");

        const respTypeDocument: TipoDocumentoProps[] = (
          await api.get("tipodocumento")
        ).data;
        const respDocumentNecessary: DocumentoNecessarioProps[] = (
          await api.get("documentonecessario")
        ).data;

        const tipoDocumento = respDocumentNecessary.find(
          (item) => item.idDocumentoNecessario === selectId()
        )?.idTipoDocumento;

        const idsTipoDocumento = respDocumentNecessary
          .filter(
            (item) => item.idTipoEstagio === parseInt(selectedTipoEstagio)
          )
          .map((item) => item.idTipoDocumento);

        const relatedTypeDocument = respTypeDocument.filter((item) =>
          idsTipoDocumento.includes(item.idTipoDocumento)
        );

        const noRelatedTypeDocument =
          selectId() === 0
            ? respTypeDocument.filter(
                (item) => !idsTipoDocumento.includes(item.idTipoDocumento)
              )
            : respTypeDocument.filter(
                (item) =>
                  item.idTipoDocumento === tipoDocumento ||
                  !idsTipoDocumento.includes(item.idTipoDocumento)
              );

        if (tipoDocumento !== undefined) {
          setValueComboBoxD(tipoDocumento.toString());
          setSelectedTipoDocumento(tipoDocumento.toString());
        }

        setDataComboBoxD(
          noRelatedTypeDocument.map((item) => {
            return {
              value: item.idTipoDocumento.toString(),
              label: item.descricaoTipoDocumento,
            };
          })
        );

        setData(
          relatedTypeDocument.map((item, idx) => ({
            ...item,
            key: idx,
          }))
        );

        setUpdate(false);
      })();
    }
  }, [selectedTipoEstagio, update]);

  async function onSubmit(values: FormCadastroProps) {
    const dataTipoEstagio = parseInt(selectedTipoEstagio);
    const dataTipoDocumento = parseInt(selectedTipoDocumento);

    isEdit
      ? await api
          .put(`/documentonecessario/${selectId()}`, {
            ...values,
            idTipoEstagio: dataTipoEstagio,
            idTipoDocumento: dataTipoDocumento,
          })
          .finally(() => navigate("/adm/documentonecessario"))
      : await api
          .post("/documentonecessario", {
            idTipoEstagio: dataTipoEstagio,
            idTipoDocumento: dataTipoDocumento,
          })
          .finally(() => navigate("/adm/documentonecessario"));
    setUpdate(true);
  }

  const handleTipoEstagioChange = (value: string) => {
    setSelectedTipoEstagio(value);
  };

  const handleTipoDocumentoChange = (value: string) => {
    setSelectedTipoDocumento(value);
  };

  return (
    <Card className="p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent>
            <FormField
              key="idTipoEstagio" // Adicionando chave única aqui
              control={form.control}
              name="idTipoEstagio"
              render={() => (
                <FormItem className="mt-5">
                  <FormLabel>Descrição do tipo estágio</FormLabel>
                  <FormControl>
                    <Combobox
                      data={dataComboBoxE}
                      value={selectedTipoEstagio}
                      setValue={isEdit ? () => {} : handleTipoEstagioChange} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              key="idTipoDocumento" // Adicionando chave única aqui
              control={form.control}
              name="idTipoDocumento"
              render={() => (
                <FormItem className="mt-5">
                  <FormLabel>Descrição do tipo documento</FormLabel>
                  <FormControl>
                    <Combobox
                      data={dataComboBoxD}
                      value={selectedTipoDocumento}
                      setValue={handleTipoDocumentoChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <TableDocs data={data} />

          <CardFooter className="flex gap-4">
            <Button type="submit">{isEdit ? "Salvar" : "Cadastrar"}</Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/adm/documentonecessario")}
            >
              Voltar
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default CadastroDocumentoNecessario;