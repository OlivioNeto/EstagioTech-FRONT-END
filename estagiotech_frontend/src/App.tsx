import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Admin from './pages/Admin'
import Page404 from './pages/Page404'
import Dashboard from './pages/Admin/Dashboard'
import TipoEstagio from './pages/Admin/TipoEstagio';
import Documento from './pages/Admin/Documento';
import Coordenador from './pages/Admin/Coordenador'
import SideBar from "./pages/Admin/Components/SideBar";
import Navbar from "./pages/Admin/Components/NavBar";
import TipoDocumento from './pages/Admin/TipoDocumento';
import CadastroTipoDocumento from "./pages/Admin/TipoDocumento/TableTipoDocumento/cadastro";
import CadastroTipoEstagio from "./pages/Admin/TipoEstagio/TableTipoEstagio/cadastro";
import CadastroDocumento from "./pages/Admin/Documento/TableDocumento/cadastro";

function App() {
  function Layout() {
    return (
      <div className="flex overflow-hidden">
        <SideBar />
        <div className="flex flex-col w-full h-screen">
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
          <Route path='/' element={<Home/>}/>
          <Route path='/adm' element={<Login/>}/>
          <Route path='/adm/admin' element={<Admin/>}/>
          <Route element={<Layout/>}>
          <Route path='/adm/dashboard' element={<Dashboard/>}/>
          <Route path='/adm/tipoestagio' element={<TipoEstagio/>}/>  
          <Route path='/adm/tipodocumento' element={<TipoDocumento/>}/>       
          <Route path='/adm/documento' element={<Documento/>}/>       
          <Route path='/adm/coordenador' element={<Coordenador/>}/>
          <Route path='/adm/tipodocumento/cadastro' element={<CadastroTipoDocumento/>}/>
          <Route path='/adm/tipoestagio/cadastro' element={<CadastroTipoEstagio/>}/>
          <Route path='/adm/documento/cadastro' element={<CadastroDocumento/>}/>
          <Route
          path="/adm/tipodocumento/cadastro/:id?"
          element={<CadastroTipoDocumento/>}
        />
          <Route
          path="/adm/tipoestagio/cadastro/:id?"
          element={<CadastroTipoEstagio/>}
        />
          <Route
          path="/adm/documento/cadastro/:id?"
          element={<CadastroDocumento/>}
        />
          </Route>
          <Route path='/*' element={<Page404/>}/>
          
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
