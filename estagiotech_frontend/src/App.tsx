import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
// import Home from './pages/Home'
import Admin from './pages/Admin'
import Page404 from './pages/Page404'
import Login from './pages/Login'

import Dashboard from './pages/Admin/Dashboard'
import TipoEstagio from './pages/Admin/TipoEstagio';
import Documento from './pages/Admin/Documento';
import CoordenadorEstagio from './pages/Admin/CoordenadorEstagio'
import SideBar from "./pages/Admin/Components/SideBar";
import Navbar from "./pages/Admin/Components/NavBar";
import TipoDocumento from './pages/Admin/TipoDocumento';
import DocumentoNecessario from './pages/Admin/DocumentoNecessario';
import ContratoEstagio from './pages/Admin/ContratoEstagio'
import Empresas from './pages/Admin/Concedente/TableConcedente'
import SupervisorEstagio from './pages/Admin/SupervisorEstagio/TableSupervisorEstagio'
import InstituicaoEnsino from './pages/Admin/InstituicaoEnsino/TableInstituicaoEnsino'
import DocumentoVersao from './pages/Admin/DocumentoVersao'

import CadastroTipoDocumento from "./pages/Admin/TipoDocumento/TableTipoDocumento/cadastro";
import CadastroTipoEstagio from "./pages/Admin/TipoEstagio/TableTipoEstagio/cadastro";
import CadastroDocumento from "./pages/Admin/Documento/TableDocumento/cadastro";
import CadastroDocumentoNecessario from './pages/Admin/DocumentoNecessario/TableDocumentoNecessario/cadastro';
import CadastroContratoEstagio from './pages/Admin/ContratoEstagio/TableContratoEstagio/cadastro';
import CadastroEmpresa from './pages/Admin/Concedente/TableConcedente/cadastro'
import CadastroCoordenadorEstagio from './pages/Admin/CoordenadorEstagio/TableCoordenadorEstagio/cadastro'
import CadastroSupervisorEstagio from './pages/Admin/SupervisorEstagio/TableSupervisorEstagio/cadastro'
import CadastroInstituicaoEnsino from './pages/Admin/InstituicaoEnsino/TableInstituicaoEnsino/cadastro'
import CadastroDocumentoVersao from './pages/Admin/DocumentoVersao/TableDocumentoVersao/cadastro'





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

  return (
    <div>
      <BrowserRouter>

        <Routes>


          <Route path='/' element={<Login />} />
          {/* depois deixar apenas a barra e Home, quando eu criar a home */}
          <Route path='/adm/admin' element={<Admin />} />
          <Route path='/pages/Login' element={<Login />} />

          {/* Agrupamento de rotas com o layout */}

          <Route element={<Layout />}>
            {/* Rotas da tela de listagem */}
            <Route path='/adm/dashboard' element={<Dashboard />} />
            <Route path='/adm/tipoestagio' element={<TipoEstagio />} />
            <Route path='/adm/tipodocumento' element={<TipoDocumento />} />
            <Route path='/adm/documento' element={<Documento />} />
            <Route path='/adm/coordenadorestagio' element={<CoordenadorEstagio />} />
            <Route path='/adm/documentonecessario' element={<DocumentoNecessario />} />
            <Route path='/adm/contratoestagio' element={<ContratoEstagio />} />
            <Route path='/adm/supervisorestagio' element={<SupervisorEstagio />} />
            <Route path='/adm/instituicaoensino' element={<InstituicaoEnsino />} />
            <Route path='/adm/empresa' element={<Empresas />} />
            <Route path='/adm/documentoversao' element={<DocumentoVersao />} />


            {/* Rotas de cadastro */}
            <Route path='/adm/tipodocumento/cadastro' element={<CadastroTipoDocumento />} />
            <Route path='/adm/tipoestagio/cadastro' element={<CadastroTipoEstagio />} />
            <Route path='/adm/documento/cadastro' element={<CadastroDocumento />} />
            <Route path='/adm/documentonecessario/cadastro' element={<CadastroDocumentoNecessario />} />
            <Route path='/adm/contratoestagio/cadastro' element={<CadastroContratoEstagio />} />
            <Route path='/adm/empresa/cadastro' element={<CadastroEmpresa />} />
            <Route path='/adm/coordenadorestagio/cadastro' element={<CadastroCoordenadorEstagio />} />
            <Route path='/adm/supervisorestagio/cadastro' element={<CadastroSupervisorEstagio />} />
            <Route path='/adm/instituicaoensino/cadastro' element={<CadastroInstituicaoEnsino />} />
            <Route path='/adm/documentoversao/cadastro' element={<CadastroDocumentoVersao />} />

            {/* Rotas de edição */}
            <Route path="/adm/tipodocumento/cadastro/:id?" element={<CadastroTipoDocumento />} />
            <Route path="/adm/tipoestagio/cadastro/:id?" element={<CadastroTipoEstagio />} />
            <Route path="/adm/documento/cadastro/:id?" element={<CadastroDocumento />} />
            <Route path="/adm/documentonecessario/cadastro/:id?" element={<CadastroDocumentoNecessario />} />
            <Route path="/adm/contratoestagio/cadastro/:id?" element={<CadastroContratoEstagio />} />
            <Route path="/adm/empresa/cadastro/:id?" element={<CadastroEmpresa />} />
            <Route path="/adm/coordenadorestagio/cadastro/:id?" element={<CadastroCoordenadorEstagio />} />
            <Route path="/adm/supervisorestagio/cadastro/:id?" element={<CadastroSupervisorEstagio />} />
            <Route path="/adm/instituicaoensino/cadastro/:id?" element={<CadastroInstituicaoEnsino />} />
            <Route path="/adm/documentoversao/cadastro/:id?" element={<CadastroDocumentoVersao />} />
          </Route>

          {/* Rota para página 404 */}
          <Route path='/*' element={<Page404 />} />

        </Routes>
      </BrowserRouter>
    </div>

  )
}

export default App
