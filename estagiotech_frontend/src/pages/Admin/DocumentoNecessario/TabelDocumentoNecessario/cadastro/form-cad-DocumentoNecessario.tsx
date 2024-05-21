import { Link, useNavigate } from "react-router-dom";
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
// import { TableDocs } from "@/components/table-docs";

import { useParams } from "react-router-dom";
import { DataTable } from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export type DocumentoNecessarioProps = {
  idDocumentoNecessario: number;
  idTipoEstagio: number;
  descricaoTipoEstagio: string;
  idTipoDocumento: number;
  descricaoTipoDocumento: string;
  status: boolean;
  key: number;
};

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
  const [selectedTipoDocumento, setSelectedTipoDocumento] = useState<string>("");

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

        setValueComboBoxE(idTipoEstagio !== undefined ? idTipoEstagio.toString() : "");
        setSelectedTipoEstagio(idTipoEstagio !== undefined ? idTipoEstagio.toString() : "");
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
          noRelatedTypeDocument
            .filter((item) => item.status) // Adicione este filtro para excluir documentos desativados
            .map((item) => ({
              value: item.idTipoDocumento.toString(),
              label: item.descricaoTipoDocumento,
            }))
        );

        setData(
          relatedTypeDocument.map((item, idx) => ({
            ...item,
            key: idx,
          }))
        );
        setData(
          relatedTypeDocument.filter((item) => item.status).map((item, idx) => ({
            ...item,
            key: idx,
          }))
        );

        setUpdate(false);
      })();
    }
  }, [selectedTipoEstagio, update]);


  //chamando a tabela
  const columns: ColumnDef<TipoDocumentoProps>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) =>
            table.toggleAllPageRowsSelected(!!value)
          }
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "idTipoDocumento",
      header: "Código do tipo documento",
    },
    {
      accessorKey: "descricaoTipoDocumento",
      header: "Descrição do tipo documento",
    },
    {
      accessorKey: "status",
      header: "Status do tipo documento",
    },
    {
      accessorKey: "descricaoTipoDocumento",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Descrição do tipo documento
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      id: "actions",
      header: "Ação",
      cell: ({ row, table }) => {
        const meta = table.options.meta;
        const dataRow = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <Link to={`/adm/documentonecessario/cadastro/${dataRow.idTipoDocumento}`}>
                <DropdownMenuItem>📝 Editar</DropdownMenuItem>
              </Link>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={async () => {
                  meta?.removeRow(dataRow.key);
                  await api.delete(`/DocumentoNecessario/${dataRow.idTipoDocumento}`);
                }}
              >
                🗑️ Delete
              </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={async () => {
                try {
                  await api.put(`/TipoDocumento/${dataRow.idTipoDocumento}/Desativar`, { status: false });
                  meta?.removeRow(dataRow.key);
                } catch (error) {
                  console.error("Erro ao desativar o documento:", error);
                }
              }}
            >
              🛑 Desativar
            </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

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
                      setValue={isEdit ? () => { } : handleTipoEstagioChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <FormField
                key="idTipoDocumento" // Adicionando chave única aqui
                control={form.control}
                name="idTipoDocumento"
                render={() => (
                  <FormItem className="flex items-center gap-3 mt-5">
                    <FormLabel>Descrição do tipo documento</FormLabel>
                    <FormControl >
                      <Combobox
                        data={dataComboBoxD}
                        value={selectedTipoDocumento}
                        setValue={handleTipoDocumentoChange}
                      />

                    </FormControl >
                    <div>
                      <Button className="mr-4" type="submit">{isEdit ? "Salvar" : "Cadastrar"}</Button>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => navigate("/adm/documentonecessario/cadastro")}
                      >
                        Voltar
                      </Button>
                    </div>
                    <FormMessage />

                  </FormItem>
                )}
              />
              <CardFooter className="flex gap-4">

              </CardFooter>
            </div>

          </CardContent>

          <DataTable data={data} columns={columns} />

        </form>
      </Form>
    </Card>
  );
};

export default CadastroDocumentoNecessario;