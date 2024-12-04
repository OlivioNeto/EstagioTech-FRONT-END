import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { useEffect, useState, ReactNode } from 'react';


import api from './service/api';

//  ROTAS DOS USUÁRIOS
import Admin from './pages/Admin';
import Aluno from './pages/Aluno';
import CoordenadorEstagio from './pages/CoordenadorEstagio';
import InstituicaoEnsino from './pages/InstituicaoEnsino';
import SupervisorEstagio from './pages/SupervisorEstagio';

import Page404 from './pages/Page404';
import Login from './pages/Login';

// ROTAS DE ADMINISTRADOR
import SideBar from './pages/Admin/Components/SideBar';
import Navbar from './pages/Admin/Components/NavBar';

import Dashboard from './pages/Admin/Dashboard';
import TipoEstagio from './pages/Admin/TipoEstagio';
import Documento from './pages/Admin/Documento';
import CoordenadorEstagioADM from './pages/Admin/CoordenadorEstagio';
import TipoDocumento from './pages/Admin/TipoDocumento';
import DocumentoNecessario from './pages/Admin/DocumentoNecessario';
import ContratoEstagio from './pages/Admin/ContratoEstagio';
import Empresas from './pages/Admin/Concedente/TableConcedente';
import SupervisorEstagioADM from './pages/Admin/SupervisorEstagio/TableSupervisorEstagio';
import InstituicaoEnsinoADM from './pages/Admin/InstituicaoEnsino/TableInstituicaoEnsino';
import DocumentoVersao from './pages/Admin/DocumentoVersao';

import CadastroTipoDocumento from './pages/Admin/TipoDocumento/TableTipoDocumento/cadastro';
import CadastroTipoEstagio from './pages/Admin/TipoEstagio/TableTipoEstagio/cadastro';
import CadastroDocumento from './pages/Admin/Documento/TableDocumento/cadastro';
import CadastroDocumentoNecessario from './pages/Admin/DocumentoNecessario/TableDocumentoNecessario/cadastro';
import CadastroContratoEstagioADM from './pages/Admin/ContratoEstagio/TableContratoEstagio/cadastro';
import CadastroEmpresa from './pages/Admin/Concedente/TableConcedente/cadastro';
import CadastroCoordenadorEstagio from './pages/Admin/CoordenadorEstagio/TableCoordenadorEstagio/cadastro';
import CadastroSupervisorEstagioADM from './pages/Admin/SupervisorEstagio/TableSupervisorEstagio/cadastro';
import CadastroInstituicaoEnsinoADM from './pages/Admin/InstituicaoEnsino/TableInstituicaoEnsino/cadastro';
import CadastroDocumentoVersao from './pages/Admin/DocumentoVersao/TableDocumentoVersao/cadastro';


// ROTAS DE ALUNO
import SideBarA from './pages/Aluno/Components/SideBar';
import NavbarA from './pages/Aluno/Components/NavBar';

import DashboardA from './pages/Aluno/Dashboard';
import CoordenadorEstagioA from './pages/Aluno/CoordenadorEstagio';
import DocumentoA from './pages/Aluno/Documento';
import DocumentoNecessarioA from './pages/Aluno/DocumentoNecessario';
import TipoDocumentoA from './pages/Aluno/TipoDocumento';
import TipoEstagioA from './pages/Admin/TipoEstagio';

import CadastroCoordenadorEstagioA from './pages/Aluno/CoordenadorEstagio/TableCoordenadorEstagio/cadastro';
import CadastroDocumentoA from './pages/Aluno/Documento/TableDocumento/cadastro';
import CadastroDocumentoNecessarioA from './pages/Aluno/DocumentoNecessario/TableDocumentoNecessario/cadastro';
import CadastroTipoDocumentoA from './pages/Aluno/TipoDocumento/TableTipoDocumento/cadastro';
import CadastroTipoEstagioA from './pages/Aluno/TipoEstagio/TableTipoEstagio/cadastro';

// ROTAS DE COORDENADOR DE ESTÁGIO
import SideBarCE from './pages/CoordenadorEstagio/Components/SideBar';
import NavbarCE from './pages/CoordenadorEstagio/Components/NavBar';

import DashboardCE from './pages/CoordenadorEstagio/Dashboard';
import ContratoEstagioCE from './pages/CoordenadorEstagio/ContratoEstagio';
import CoordenadorEstagioCE from './pages/CoordenadorEstagio/CoordenadorEstagio';
import DocumentoCE from './pages/CoordenadorEstagio/Documento'
import DocumentoNecessarioCE from './pages/CoordenadorEstagio/DocumentoNecessario'
import DocumentoVersaoCE from './pages/CoordenadorEstagio/DocumentoVersao';
import TipoDocumentoCE from './pages/CoordenadorEstagio/TipoDocumento';
import TipoEstagioCE from './pages/CoordenadorEstagio/TipoEstagio';

import CadastroContratoEstagioCE from './pages/CoordenadorEstagio/ContratoEstagio/TableContratoEstagio/cadastro';
import CadastroCoordenadorEstagioCE from './pages/Aluno/CoordenadorEstagio/TableCoordenadorEstagio/cadastro';
import CadastroDocumentoCE from './pages/CoordenadorEstagio/Documento/TableDocumento/cadastro';
import CadastroDocumentoNecessarioCE from './pages/CoordenadorEstagio/DocumentoNecessario/TableDocumentoNecessario/cadastro';
import CadastroDocumentoVersaoCE from './pages/CoordenadorEstagio/DocumentoVersao/TableDocumentoVersao/cadastro';
import CadastroTipoDocumentoCE from './pages/CoordenadorEstagio/TipoDocumento/TableTipoDocumento/cadastro';
import CadastroTipoEstagioCE from './pages/CoordenadorEstagio/TipoEstagio/TableTipoEstagio/cadastro';

// ROTAS DE INSTITUIÇÃO DE ENSINO
import SideBarIE from './pages/InstituicaoEnsino/Components/SideBar';
import NavbarIE from './pages/InstituicaoEnsino/Components/NavBar';

import DashboardIE from './pages/InstituicaoEnsino/Dashboard';
import EmpresaIE from './pages/InstituicaoEnsino/Concedente/TableConcedente';
import ContratoEstagioIE from './pages/InstituicaoEnsino/ContratoEstagio';
import CoordenadorEstagioIE from './pages/InstituicaoEnsino/CoordenadorEstagio';
import DocumentoIE from './pages/InstituicaoEnsino/Documento';
import DocumentoNecessarioIE from './pages/InstituicaoEnsino/DocumentoNecessario';
import DocumentoVersaoIE from './pages/InstituicaoEnsino/DocumentoVersao';
import TipoDocumentoIE from './pages/InstituicaoEnsino/TipoDocumento';
import TipoEstagioIE from './pages/InstituicaoEnsino/TipoEstagio';

import CadastroEmpresaIE from './pages/InstituicaoEnsino/Concedente/TableConcedente/cadastro';
import CadastroContratoEstagioIE from './pages/InstituicaoEnsino/ContratoEstagio/TableContratoEstagio/cadastro';
import CadastroCoordenadorEstagioIE from './pages/InstituicaoEnsino/CoordenadorEstagio/TableCoordenadorEstagio/cadastro';
import CadastroDocumentoIE from './pages/InstituicaoEnsino/Documento/TableDocumento/cadastro';
import CadastroDocumentoNecessarioIE from './pages/InstituicaoEnsino/DocumentoNecessario/TableDocumentoNecessario/cadastro';
import CadastroDocumemtoVersaoIE from './pages/InstituicaoEnsino/DocumentoVersao/TableDocumentoVersao/cadastro'
import CadastroTipoDocumentoIE from './pages/InstituicaoEnsino/TipoDocumento/TableTipoDocumento/cadastro';
import CadastroTipoEstagioIE from './pages/InstituicaoEnsino/TipoEstagio/TableTipoEstagio/cadastro';


// ROTAS DE SUPERVISOR DE ENSINO
import SideBarSE from './pages/SupervisorEstagio/Components/SideBar';
import NavbarSE from './pages/SupervisorEstagio/Components/NavBar';

import DashboardSE from './pages/SupervisorEstagio/Dashboard';
import EmpresaSE from './pages/SupervisorEstagio/Concedente/TableConcedente';
import ContratoEstagioSE from './pages//SupervisorEstagio/ContratoEstagio';
import DocumentoSE from './pages/SupervisorEstagio/Documento';
import DocumentoNecessarioSE from './pages//SupervisorEstagio/DocumentoNecessario';
import DocumentoVersaoSE from './pages/SupervisorEstagio/DocumentoVersao';
import SupervisorEstagioSE from './pages/SupervisorEstagio/SupervisorEstagio/TableSupervisorEstagio';
import TipoDocumentoSE from './pages/SupervisorEstagio/TipoDocumento';
import TipoEstagioSE from './pages/SupervisorEstagio/TipoEstagio';

import CadastroEmpresaSE from './pages/SupervisorEstagio/Concedente/TableConcedente/cadastro';
import CadastroContratoEstagioSE from './pages/SupervisorEstagio/ContratoEstagio/TableContratoEstagio/cadastro';

import CadastroDocumentoSE from './pages/SupervisorEstagio/Documento/TableDocumento/cadastro';
import CadastroDocumentoNecessarioSE from './pages/SupervisorEstagio/DocumentoNecessario/TableDocumentoNecessario/cadastro';
import CadastroDocumentoVersaoSE from './pages/SupervisorEstagio/DocumentoVersao/TableDocumentoVersao/cadastro';
import CadastroSupervisorEstagioSE from './pages/SupervisorEstagio/SupervisorEstagio/TableSupervisorEstagio/cadastro';
import CadastroTipoDocumentoSE from './pages/SupervisorEstagio/TipoDocumento/TableTipoDocumento/cadastro';
import CadastroTipoEstagioSE from './pages/SupervisorEstagio/TipoEstagio/TableTipoEstagio/cadastro';
import { Layout } from 'lucide-react';

// FUNÇÃO PARA IMPLEMENTAR A LÓGICA DE ACESSO AOS USUÁRIOS DO SISTEMA

// Tipagem para as propriedades do ProtectedRoute
interface ProtectedRouteProps {
  children: ReactNode; // ReactNode aceita qualquer elemento renderizável
  requiredAccess: number[]; // Uma lista de strings
}

interface AuthProps {
  children: ReactNode; // ReactNode aceita qualquer elemento renderizável
}

// Supondo que o usuário tenha as propriedades abaixo
interface User {
  userType: number; // Propriedade do tipo de usuário
}

// Definir o tipo para os itens do dicionário
type RouteType = {
  code: number;
  type: string;
};

function App() {
  function Layout() {
    return (
      <div className="flex min-h-screen">
        <SideBar />
        <div className="flex flex-col w-full">
          <Navbar />
          <Outlet />
        </div>
      </div>
    );
  }

  // Definir o tipo do estado como um array de RouteType
  const [routesType,] = useState<RouteType[]>([
    { code: 1, type: "adm" }, 
    { code: 2, type: "aluno" }, 
    { code: 3, type: "coordenador"}, 
    { code: 5, type: "supervisor" },
    { code: 6, type: "instituicao"}
  ]);

  // Função para obter o usuário pelo token
  async function authenticateUser() {
    const token = localStorage.getItem('authToken');

    if (token) {
      try {
        const response = await api.put('/Sessao/Validation', { token: token }, {
          headers: { 'Content-Type': 'application/json' },
        });

        return response.data.status; // Retorna o objeto do usuário
      } catch (error) {
        console.error('Erro ao autenticar usuário:', error);
        return false;
      }
    } return false;
  }

  const Auth: React.FC<AuthProps> = ({ children }) => {
    const [status, setStatus] = useState<boolean | null>(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const authifier = async () => {
        const response = await authenticateUser();
        setStatus(response);
        setLoading(false);
      };

      authifier();
    }, []);

    if (loading) {
      return <div>Carregando...</div>;
    }

    if (!status) {
      return <Navigate to="/" replace />;
    }

    return <>{children}</>;
  };

  // Função para obter o usuário pelo token
  async function getUserByToken(token: string): Promise<User | null> {
    try {
      const response = await api.get(`/Sessao/GetUser/${token}`, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data.response; // Retorna o objeto do usuário
    } catch (error) {
      console.error('Erro ao buscar o tipo de usuário:', error);
      return null;
    }
  }

  // Componente para proteger rotas
  const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredAccess }) => {
    const [userType, setUserType] = useState<number | 0>(0); // O estado aceita `string` ou `null`
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchUserType = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
          setUserType(0);
          setLoading(false);
          return;
        }
        const user = await getUserByToken(token);

        setUserType(user?.userType || 0); // Define o tipo de usuário ou `null` se não existir
        setLoading(false);
      };

      fetchUserType();
    }, []);

    if (loading) {
      return <div>Carregando...</div>;
    }

    console.log("User Type:", userType);
    console.log("Required Access:", requiredAccess);
    console.log("Routes Type:", routesType);
    
    if (!userType) {
      return <Navigate to={`/`} replace />;
    }
    
    if (!requiredAccess.includes(userType)) {
      const userRoute = routesType.find(r => r.code === userType);
      console.log("User Route:", userRoute);
      return <Navigate to={`/${userRoute?.type}/dashboard`} replace />;
    }
    
    return <Routes>{children}</Routes>
  };



    // DEFINIÇÃO DAS ROTAS
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            {/* depois deixar apenas a barra e Home, quando eu criar a home */}
            <Route path='/adm/admin' element={<Admin />} />
            <Route path='/aluno/aluno' element={<Aluno />} />
            <Route path='/coordenador/coordenador' element={<CoordenadorEstagio />} />
            <Route path='/instituicao/instituicao' element={<InstituicaoEnsino />} />
            <Route path='/supervisor/supervisor' element={<SupervisorEstagio />} />
            <Route path='/pages/Login' element={<Login />} />

            {/* Agrupamento de rotas com o layout */}

            <Route path="/adm/*" element={<Auth><Layout /></Auth>}>
              <Route path="*" element={
                <ProtectedRoute requiredAccess={[1]}>
                  {/* Rotas da tela de listagem */}
                  <Route path='/dashboard' element={<Dashboard />} />
                  <Route path='/tipoestagio' element={<TipoEstagio />} />
                  <Route path='/tipodocumento' element={<TipoDocumento />} />
                  <Route path='/documento' element={<Documento />} />
                  <Route path='/coordenadorestagio' element={<CoordenadorEstagioADM />} />
                  <Route path='/documentonecessario' element={<DocumentoNecessario />} />
                  <Route path='/contratoestagio' element={<ContratoEstagio />} />
                  <Route path='/supervisorestagio' element={<SupervisorEstagioADM />} />
                  <Route path='/instituicaoensino' element={<InstituicaoEnsinoADM />} />
                  <Route path='/empresa' element={<Empresas />} />
                  <Route path='/documentoversao' element={<DocumentoVersao />} />


                  {/* Rotas de cadastro */}
                  <Route path='/tipodocumento/cadastro' element={<CadastroTipoDocumento />} />
                  <Route path='/tipoestagio/cadastro' element={<CadastroTipoEstagio />} />
                  <Route path='/documento/cadastro' element={<CadastroDocumento />} />
                  <Route path='/documentonecessario/cadastro' element={<CadastroDocumentoNecessario />} />
                  <Route path='/contratoestagio/cadastro' element={<CadastroContratoEstagioADM />} />
                  <Route path='/empresa/cadastro' element={<CadastroEmpresa />} />
                  <Route path='/coordenadorestagio/cadastro' element={<CadastroCoordenadorEstagio />} />
                  <Route path='/supervisorestagio/cadastro' element={<CadastroSupervisorEstagioADM />} />
                  <Route path='/instituicaoensino/cadastro' element={<CadastroInstituicaoEnsinoADM />} />
                  <Route path='/documentoversao/cadastro' element={<CadastroDocumentoVersao />} />

                  {/* Rotas de edição */}
                  <Route path="/tipodocumento/cadastro/:id?" element={<CadastroTipoDocumento />} />
                  <Route path="/tipoestagio/cadastro/:id?" element={<CadastroTipoEstagio />} />
                  <Route path="/documento/cadastro/:id?" element={<CadastroDocumento />} />
                  <Route path="/documentonecessario/cadastro/:id?" element={<CadastroDocumentoNecessario />} />
                  <Route path="/contratoestagio/cadastro/:id?" element={<CadastroContratoEstagioADM />} />
                  <Route path="/empresa/cadastro/:id?" element={<CadastroEmpresa />} />
                  <Route path="/coordenadorestagio/cadastro/:id?" element={<CadastroCoordenadorEstagio />} />
                  <Route path="/supervisorestagio/cadastro/:id?" element={<CadastroSupervisorEstagioADM />} />
                  <Route path="/instituicaoensino/cadastro/:id?" element={<CadastroInstituicaoEnsinoADM />} />
                  <Route path="/documentoversao/cadastro/:id?" element={<CadastroDocumentoVersao />} />
                </ProtectedRoute>
              } />
            </Route>

            <Route path="/aluno/*" element={<Auth><Layout /></Auth>}>
              <Route path="*" element={
                <ProtectedRoute requiredAccess={[2]}>
                  {/* Rotas da tela de listagem */}
                  <Route path='/dashboard' element={<DashboardA />} />
                  <Route path='/tipoestagio' element={<TipoEstagioA />} />
                  <Route path='/tipodocumento' element={<TipoDocumentoA />} />
                  <Route path='/documento' element={<DocumentoA />} />
                  <Route path='/coordenadorestagio' element={<CoordenadorEstagioA />} />
                  <Route path='/documentonecessario' element={<DocumentoNecessarioA />} />

                  {/* Rotas de cadastro */}
                  <Route path='/tipodocumento/cadastro' element={<CadastroTipoDocumentoA />} />
                  <Route path='/documento/cadastro' element={<CadastroDocumentoA />} />
                  <Route path='/documentonecessario/cadastro' element={<CadastroDocumentoNecessarioA />} />
                  <Route path="/coordenadorestagio/cadastro" element={<CadastroCoordenadorEstagioA />} />
                  <Route path='/tipoestagio' element={<TipoEstagioA />} />

                  {/* Rotas de edição */}
                  <Route path="/tipodocumento/cadastro/:id?" element={<CadastroTipoDocumentoA />} />
                  <Route path="/documento/cadastro/:id?" element={<CadastroDocumentoA />} />
                  <Route path="/documentonecessario/cadastro/:id?" element={<CadastroDocumentoNecessarioA />} />
                  <Route path="/coordenadorestagio/cadastro/:id?" element={<CadastroCoordenadorEstagioA />} />
                  <Route path="/tipoestagio/cadastro/:id?" element={<CadastroTipoEstagioA />} />
                </ProtectedRoute>
              } />
            </Route>

            <Route path="/coordenador/*" element={<Auth><Layout /></Auth>}>
              <Route path="*" element={
                <ProtectedRoute requiredAccess={[3]}>
                  {/* Rotas da tela de listagem */}
                  <Route path='/dashboard' element={<DashboardCE />} />
                  <Route path='/contratoestagio' element={<ContratoEstagioCE />} />
                  <Route path='/coordenadorestagio' element={<CoordenadorEstagioCE />} />
                  <Route path='/documento' element={<DocumentoCE />} />
                  <Route path='/documentonecessario' element={<DocumentoNecessarioCE />} />
                  <Route path='/documentoversao' element={<DocumentoVersaoCE />} />
                  <Route path='/tipodocumento' element={<TipoDocumentoCE />} />
                  <Route path='/tipoestagio' element={<TipoEstagioCE />} />

                  {/* Rotas de cadastro */}
                  <Route path='/contratoestagio/cadastro' element={<CadastroContratoEstagioCE />} />
                  <Route path="/coordenadorestagio/cadastro" element={<CadastroCoordenadorEstagioCE />} />
                  <Route path='/documento/cadastro' element={<CadastroDocumentoCE />} />
                  <Route path='/documentonecessario/cadastro' element={<CadastroDocumentoNecessarioCE />} />
                  <Route path='/documentoversao/cadastro' element={<CadastroDocumentoVersaoCE />} />
                  <Route path='/tipodocumento/cadastro' element={<CadastroTipoDocumentoCE />} />
                  <Route path='/tipoestagio/cadastro' element={<CadastroTipoEstagioCE />} />

                  {/* Rotas de edição */}
                  <Route path='/contratoestagio/cadastro/:id?' element={<CadastroContratoEstagioCE />} />
                  <Route path="/coordenadorestagio/cadastro/:id?" element={<CadastroCoordenadorEstagioCE />} />
                  <Route path='/documento/cadastro/:id?' element={<CadastroDocumentoCE />} />
                  <Route path='/documentonecessario/cadastro/:id?' element={<CadastroDocumentoNecessarioCE />} />
                  <Route path='/documentoversao/cadastro/:id?' element={<CadastroDocumentoVersaoCE />} />
                  <Route path='/tipodocumento/cadastro/:id?' element={<CadastroTipoDocumentoCE />} />
                  <Route path='/tipoestagio/cadastro/:id?' element={<CadastroTipoEstagioCE />} />
                </ProtectedRoute>
              } />
            </Route>

            <Route path="/supervisor/*" element={<Auth><Layout /></Auth>}>
              <Route path="*" element={
                <ProtectedRoute requiredAccess={[5]}>
                  {/* Rotas da tela de listagem */}
                  <Route path='/dashboard' element={<DashboardSE />} />
                  <Route path='/concedente' element={<EmpresaSE />} />
                  <Route path='/contratoestagio' element={<ContratoEstagioSE />} />
                  <Route path='/documento' element={<DocumentoSE />} />
                  <Route path='/documentonecessario' element={<DocumentoNecessarioSE />} />
                  <Route path='/documentoversao' element={<DocumentoVersaoSE />} />
                  <Route path='/supervisorestagio' element={<SupervisorEstagioSE />} />
                  <Route path='/tipodocumento' element={<TipoDocumentoSE />} />
                  <Route path='/tipoestagio' element={<TipoEstagioSE />} />

                  {/* Rotas de cadastro */}
                  <Route path='/concedente/cadastro' element={<CadastroEmpresaSE />} />
                  <Route path='/contratoestagio/cadastro' element={<CadastroContratoEstagioSE />} />
                  <Route path='/documento/cadastro' element={<CadastroDocumentoSE />} />
                  <Route path='/documentonecessario/cadastro' element={<CadastroDocumentoNecessarioSE />} />
                  <Route path='/documentoversao/cadastro' element={<CadastroDocumentoVersaoSE />} />
                  <Route path='/supervisorestagio/cadastro' element={<CadastroSupervisorEstagioSE />} />
                  <Route path='/tipodocumento/cadastro' element={<CadastroTipoDocumentoSE />} />
                  <Route path='/tipoestagio/cadastro' element={<CadastroTipoEstagioSE />} />

                  {/* Rotas de edição */}
                  <Route path='/concedente/cadastro/:id?' element={<CadastroEmpresaSE />} />
                  <Route path='/contratoestagio/cadastro/:id?' element={<CadastroContratoEstagioSE />} />
                  <Route path='/documento/cadastro/:id?' element={<CadastroDocumentoSE />} />
                  <Route path='/documentonecessario/cadastro/:id?' element={<CadastroDocumentoNecessarioSE />} />
                  <Route path='/documentoversao/cadastro/:id?' element={<CadastroDocumentoVersaoSE />} />
                  <Route path='/supervisorestagio/cadastro/:id?' element={<CadastroSupervisorEstagioSE />} />
                  <Route path='/tipodocumento/cadastro/:id?' element={<CadastroTipoDocumentoSE />} />
                  <Route path='/tipoestagio/cadastro/:id?' element={<CadastroTipoEstagioSE />} />
                </ProtectedRoute>
              } />
            </Route>

            <Route path="/instituicao/*" element={<Auth><Layout /></Auth>}>
              <Route path="*" element={
                <ProtectedRoute requiredAccess={[6]}>
                  {/* Rotas da tela de listagem */}
                  <Route path='/dashboard' element={<DashboardIE />} />
                  <Route path='/empresa' element={<EmpresaIE />} />
                  <Route path='/contratoestagio' element={<ContratoEstagioIE />} />
                  <Route path='/coordenadorestagio' element={<CoordenadorEstagioIE />} />
                  <Route path='/documento' element={<DocumentoIE />} />
                  <Route path='/documentonecessario' element={<DocumentoNecessarioIE />} />
                  <Route path='/documentoversao' element={<DocumentoVersaoIE />} />
                  <Route path='/tipodocumento' element={<TipoDocumentoIE />} />
                  <Route path='/tipoestagio' element={<TipoEstagioIE />} />

                  {/* Rotas de cadastro */}
                  <Route path='/empresa/cadastro' element={<CadastroEmpresaIE />} />
                  <Route path='/contratoestagio/cadastro' element={<CadastroContratoEstagioIE />} />
                  <Route path='/coordenadorestagio/cadastro' element={<CadastroCoordenadorEstagioIE />} />
                  <Route path='/documento/cadastro' element={<CadastroDocumentoIE />} />
                  <Route path='/documentonecessario/cadastro' element={<CadastroDocumentoNecessarioIE />} />
                  <Route path='/documentoversao/cadastro' element={<CadastroDocumemtoVersaoIE />} />
                  <Route path='/tipodocumento/cadastro' element={<CadastroTipoDocumentoIE />} />
                  <Route path='/tipoestagio/cadastro' element={<CadastroTipoEstagioIE />} />

                  {/* Rotas de edição */}
                  <Route path='/empresa/cadastro/:id?' element={<CadastroEmpresaIE />} />
                  <Route path='/contratoestagio/cadastro/:id?' element={<CadastroContratoEstagioIE />} />
                  <Route path='/coordenadorestagio/cadastro/:id?' element={<CadastroCoordenadorEstagioIE />} />
                  <Route path='/documento/cadastro/:id?' element={<CadastroDocumentoIE />} />
                  <Route path='/documentonecessario/cadastro/:id?' element={<CadastroDocumentoNecessarioIE />} />
                  <Route path='/documentoversao/cadastro/:id?' element={<CadastroDocumemtoVersaoIE />} />
                  <Route path='/tipodocumento/cadastro/:id?' element={<CadastroTipoDocumentoIE />} />
                  <Route path='/tipoestagio/cadastro/:id?' element={<CadastroTipoEstagioIE />} />
                </ProtectedRoute>
              } />
            </Route>


            <Route path='/*' element={<Page404 />} />
          </Routes>
        </BrowserRouter>
      </div >

    )
  }

  export default App
