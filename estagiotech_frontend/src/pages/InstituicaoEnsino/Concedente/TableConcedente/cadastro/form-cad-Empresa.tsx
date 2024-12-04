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
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import api from "@/service/api";
import { ConcendenteProps } from "../table/colums";
import { cnpjApplyMask, numbersOnly } from "@/lib/utils";

const formSchema = z.object({
  razaoSocial: z
    .string()
    .min(2, { message: "Razão Social deve ter no mínino 2 caracteres" })
    .max(50),
  responsavelEstagio: z
    .string()
    .min(2, {
      message: "Responsavel pelo Estágio deve ter no mínino 2 caracteres",
    })
    .max(50),
  cnpj: z.string().min(18, { message: "O CNPJ deve ter 14 digitos" }),
  localidade: z
    .string()
    .min(2, { message: "Cidade deve ter no mínimo 2 caracteres." })
    .max(50),
});

type FormCadastroProps = z.infer<typeof formSchema>;

export const FormCadastroEmpresa = ({ data }: { data: ConcendenteProps }) => {
  const navigate = useNavigate();
  const isEdit = Object.keys(data).length === 0; // true or false
  const form = useForm<FormCadastroProps>({
    resolver: zodResolver(formSchema),
    values: {
      razaoSocial: data.razaoSocial,
      responsavelEstagio: data.responsavelEstagio,
      cnpj: cnpjApplyMask(data.cnpj),
      localidade: data.localidade,
    },
    defaultValues: {
      razaoSocial: "",
      responsavelEstagio: "",
      cnpj: "",
      localidade: "",
    },
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inputCnpj = event.target.value;
    const formattedCnpj = cnpjApplyMask(inputCnpj);
    form.setValue("cnpj", formattedCnpj);
  }

  async function onSubmit(values: FormCadastroProps) {
    try {
      isEdit
        ? await api
            .post("/concedente", { ...values, cnpj: numbersOnly(values.cnpj) })
            .finally(() => navigate("/instituicao/empresa"))
        : await api
            .put(`/concedente/${data.concedenteId}`, {
              ...values,
              cnpj: numbersOnly(values.cnpj),
              concedenteId: data.concedenteId,
            })
            .finally(() => navigate("/instituicao/empresa"));
      isEdit
        ? toast("Empresa Cadastrada com Sucesso. ✅")
        : toast("Empresa Alterada com Sucesso. ✅");
    } catch (error: any) {
      isEdit
        ? toast("OPS, algo deu errado ao cadastrar a Empresa. ❌")
        : toast("OPS, algo deu errado ao alterar a Empresa. ❌");
      console.log(error.message);
    }
  }
  return (
    <Card className="p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent>
            <FormField
              control={form.control}
              name="razaoSocial"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Razão Social</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome da Empresa" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="responsavelEstagio"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Responsável</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do responsável" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cnpj"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>CNPJ</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="00.000.000.000-00"
                      {...field}
                      onChange={handleChange}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="localidade"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Localidade</FormLabel>
                  <FormControl>
                    <Input placeholder="Qual a cidadde" {...field} />
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
              onClick={() => navigate("/instituicao/empresa")}
            >
              Voltar
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};



