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
import { InstituicaoEnsinoProps } from "../table/columns";
import { phoneApplyMask } from "@/lib/utils";



const formSchema = z.object({
   nomeInstituicao: z.string(),
   localInstituicao: z.string(),
   telefoneInstituicao: z.string(),
});

type FormEnsinoInstituicaoProps = z.infer<typeof formSchema>;

const FormCadastroEnsinoProps = ({ data }: { data: InstituicaoEnsinoProps }) => {
  const navigate = useNavigate();
  const isEdit = !!data.idInstituicaoEnsino;
  const form = useForm<FormEnsinoInstituicaoProps>({
    resolver: zodResolver(formSchema),
    values: {
      nomeInstituicao: data.nomeInstituicao,
      localInstituicao: data.localInstituicao,
      telefoneInstituicao:phoneApplyMask(data.telefoneInstituicao)
    },
    defaultValues: {
      nomeInstituicao: "",
      localInstituicao: "",
      telefoneInstituicao: "",
    },
  });

  function handleChangeI(event: React.ChangeEvent<HTMLInputElement>) {
    const inputtelefoneInstituicao = event.target.value;
    const formattedtelefoneInstituicao = phoneApplyMask(inputtelefoneInstituicao);
    form.setValue("telefoneInstituicao", formattedtelefoneInstituicao);
  }

  async function onSubmit(values: FormEnsinoInstituicaoProps) {
    console.log(isEdit)
    !isEdit ?
      await api
        .post("/InstituicaoEnsino", values)
        .finally(() => navigate("/adm/instituicaoensino"))
      : await api
        .put(`/InstituicaoEnsino`, {
          idInstituicaoEnsino: data.idInstituicaoEnsino,
          nomeInstituicao: values.nomeInstituicao,
          localInstituicao: values.localInstituicao,
          telefoneInstituicao: values.telefoneInstituicao,
        })
        .finally(() => navigate("/adm/instituicaoensino"));

  }

  return (
    <Card className="p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent>
            <FormField
              control ={form.control}
              name = "nomeInstituicao"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Nome da Instituição</FormLabel>
                  <FormControl>
                    <Input placeholder="Fale o nome da instituicao" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="localInstituicao"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Local da instituição</FormLabel>
                  <FormControl>
                    <Input placeholder="Qual a situação do documento" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="telefoneInstituicao"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Telefone da instituição</FormLabel>
                  <FormControl>
                  <Input
                  maxLength={15}
                      placeholder="(XX)XXXX-XXXX"
                      {...field}
                      onChange={handleChangeI}
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
              onClick={() => navigate("/adm/instituicaoensino")}
            >
              Voltar
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default FormCadastroEnsinoProps;