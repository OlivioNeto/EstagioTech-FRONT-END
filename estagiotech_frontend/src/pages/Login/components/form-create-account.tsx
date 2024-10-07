import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Badge } from "@/components/ui/badge";
import { z } from "zod";
import api from "@/service/api";
import Grid from "@mui/material/Grid";
import { Label } from "@/components/ui/label";
import { cpfApplyMask, numbersOnly } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { AlertCircle, CheckCircle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const accountSchema = z.object({
  nome: z
    .string()
    .min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
  cpfCnpj: z
    .string()
    .min(14, { message: "CPF/CNPJ deve ter 11 caracteres" })
    .max(14, { message: "CPF/CNPJ não deve exceder 14 caracteres" }),
  email: z.string().email({ message: "Formato de e-mail inválido" }),
  senha: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
  confirmarSenha: z
    .string()
    .min(6, { message: "Confirme a senha corretamente" }),
});

export default function FormCreateAccount() {
  const navigate = useNavigate();
  const { setAuthState } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [credencial, setCredencial] = useState({
    email: "",
    password: "",
  });
  const [account, setAccount] = useState({
    nome: "",
    cpfCnpj: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    userTypeDto: 2,
  });

  const renderErrorBadge = (message: string) => (
    <div className="flex items-center space-x-2 mt-1">
      <AlertCircle className="text-red-600 w-4 h-4" /> {/* Ícone de erro */}
      <Badge className="bg-red-100 text-red-600 border-red-600 border rounded-md px-2 py-1 hover:bg-red-100">
        {message}
      </Badge>
    </div>
  );

  function handleCredencial(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setCredencial({
      ...credencial,
      [name]: value,
    });
    setAccount({
      ...account,
      [name]: value,
    });
  }

  function checkPasswordsMatch() {
    return account.senha === account.confirmarSenha;
  }

  function handleCpfChange(event: ChangeEvent<HTMLInputElement>) {
    const maskedCpf = cpfApplyMask(event.target.value);
    setAccount({
      ...account,
      cpfCnpj: maskedCpf,
    });
  }

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const auth = await api.post("/Sessao/Autentication", {
        email: credencial.email,
        senha: credencial.password,
      });

      const { status, response } = auth.data;
      localStorage.setItem("authToken", response);
      localStorage.setItem("authStatus", status);

      setAuthState({ isAuthenticated: true, token: response, status });
      navigate("/adm/dashboard"); 
      //depois deixar apenas uma barra, para ele navegar para a home do projeto
    } catch (error: any) {
      setErrors(
        error.message || "Falha ao realizar login, verifique suas credenciais"
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCreateAccount(event: FormEvent) {
    event.preventDefault();

    // Validar os dados com Zod
    const result = accountSchema.safeParse(account);
    if (!result.success) {
      const fieldErrors = result.error.errors.reduce((acc: any, err) => {
        acc[err.path[0]] = err.message;
        return acc;
      }, {});
      setErrors(fieldErrors); // Mantém os erros no estado
      return;
    }

    if (!checkPasswordsMatch()) {
      setErrors({ confirmarSenha: "As senhas não coincidem" }); // Mantém os erros no estado
      return;
    }

    // Limpar os erros apenas se não houver erros de validação
    setErrors({});

    setIsLoading(true);
    try {
      await api.post("/Usuario", {
        nome: account.nome,
        cpfCnpj: numbersOnly(account.cpfCnpj),
        email: account.email,
        senha: account.senha,
        userType: account.userTypeDto,
      });

      setIsConfirmDialogOpen(true);
    } catch (error) {
      console.log(error);
      setErrors({
        geral: "Falha ao realizar a criação da conta, verifique as credenciais",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Tabs defaultValue="authLogin" className="w-[600px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="authLogin">Login</TabsTrigger>
        <TabsTrigger value="createAccount">Criar conta</TabsTrigger>
      </TabsList>
      <TabsContent value="authLogin">
        <form onSubmit={handleLogin}>
          <Card className="border-none">
            <CardHeader>
              <CardTitle>Acessar sua conta</CardTitle>
              <CardDescription>
                Acesse sua conta no Tech Vagas da Fatec e descubra oportunidades
                em diferentes áreas!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="nome@exemplo.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                  value={credencial.email || ""}
                  onChange={(e) => handleCredencial(e)}
                  required
                />
              </div>
              {errors.email && renderErrorBadge(errors.email)}
              <div className="space-y-1">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  name="password"
                  placeholder="password"
                  type="password"
                  autoCapitalize="none"
                  autoCorrect="off"
                  disabled={isLoading}
                  value={credencial.password || ""}
                  onChange={(e) => handleCredencial(e)}
                  required
                />
              </div>
              {errors.senha && renderErrorBadge(errors.senha)}
            </CardContent>
            <CardFooter>
              <Button disabled={isLoading} type="submit" className="w-full">
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Entrar
              </Button>
            </CardFooter>
          </Card>
        </form>
      </TabsContent>

      <TabsContent value="createAccount">
        <form onSubmit={handleCreateAccount}>
          <Card className="border-none">
            <CardHeader>
              <CardTitle>Criar sua conta</CardTitle>
              <CardDescription className="text-gray-400 font-light">
                Crie sua conta e inicie sua jornada para um futuro profissional
                extraordinário!
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  name="nome"
                  type="text"
                  placeholder="Nome"
                  value={account.nome}
                  onChange={(e) => handleCredencial(e)}
                />
              </div>
              {errors.nome && renderErrorBadge(errors.nome)}

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <div className="space-y-1">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      name="email"
                      autoComplete="email"
                      type="email"
                      value={account.email}
                      placeholder="nome@exemplo.com"
                      onChange={(e) => handleCredencial(e)}
                    />
                  </div>
                  {errors.email && renderErrorBadge(errors.email)}
                </Grid>
                <Grid item xs={12} md={6}>
                  <div className="space-y-1">
                    <Label htmlFor="cpfCnpj">CPF</Label>
                    <Input
                      id="cpfCnpj"
                      name="cpfCnpj"
                      type="text"
                      placeholder="CPF"
                      maxLength={11}
                      value={account.cpfCnpj}
                      onChange={handleCpfChange}
                    />
                  </div>
                  {errors.cpfCnpj && renderErrorBadge(errors.cpfCnpj)}
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <div className="space-y-1">
                    <Label htmlFor="senha">Senha</Label>
                    <Input
                      id="senha"
                      name="senha"
                      type="password"
                      placeholder="Senha"
                      value={account.senha}
                      onChange={(e) => handleCredencial(e)}
                    />
                  </div>
                  {errors.senha && renderErrorBadge(errors.senha)}
                </Grid>
                <Grid item xs={12} md={6}>
                  <div className="space-y-1">
                    <Label htmlFor="confirmarSenha">Confirmar senha</Label>
                    <Input
                      id="confirmarSenha"
                      name="confirmarSenha"
                      type="password"
                      value={account.confirmarSenha}
                      placeholder="Confirmar senha"
                      onChange={(e) => handleCredencial(e)}
                    />
                  </div>
                  {errors.confirmarSenha &&
                    renderErrorBadge(errors.confirmarSenha)}
                </Grid>
                {errors.geral && renderErrorBadge(errors.geral)}
              </Grid>
            </CardContent>

            <CardFooter>
              <Button disabled={isLoading} type="submit" className="w-full">
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Criar Conta
              </Button>

              <AlertDialog
                open={isConfirmDialogOpen}
                onOpenChange={setIsConfirmDialogOpen}
              >
                <AlertDialogContent>
                  <AlertDialogHeader className="space-y-3">
                    <AlertDialogTitle className="flex flex-col justify-center items-center">
                      <CheckCircle size={60} />
                      Conta Criada com Sucesso!
                    </AlertDialogTitle>
                    <AlertDialogDescription className="flex flex-col items-center">
                      A sua conta foi criada. Você pode agora acessar o sistema.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction
                      onClick={() => {
                        setIsConfirmDialogOpen(false);
                      }}
                      className="w-full"
                    >
                      Ir para o login
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        </form>
      </TabsContent>
    </Tabs>
  );
}