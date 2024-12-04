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

import Dashboard from './pages/Admin/Dashboard';
import TipoEstagio from './pages/Admin/TipoEstagio';
import Documento from './pages/Admin/Documento';
import CoordenadorEstagioADM from './pages/Admin/CoordenadorEstagio';
import SideBar from './pages/Admin/Components/SideBar';
import Navbar from './pages/Admin/Components/NavBar';
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
  const [routesType,] = useState<RouteType[]>([{ code: 1, type: "adm" }, { code: 2, type: "aluno" },]);

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

    if (!userType) {
      return <Navigate to={`/`} replace />;
    }

    if (!requiredAccess.includes(userType)) {
      return <Navigate to={`/${routesType.find(r => r.code === userType)?.type}/dashboard`} replace />;
    }

    return <Routes>{children}</Routes>;
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
          <Route path='/aluno/aluno' element={<Aluno />} />
          <Route path='/aluno/aluno' element={<Aluno />} />

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


          <Route path='/*' element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </div >

  )
}

export default App
