import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Admin from './pages/Admin'
import Page404 from './pages/Page404'

import Dashboard from './pages/Admin/Dashboard'
import CoordenadorEstagio from './pages/Admin/CoordenadorEstagio'
import SideBar from "./pages/Admin/Components/SideBar";
import Navbar from "./pages/Admin/Components/NavBar";
import InstituicaoEnsino from './pages/Admin/InstituicaoEnsino/TableInstituicaoEnsino'

import CadastroCoordenadorEstagio from './pages/Admin/CoordenadorEstagio/TableCoordenadorEstagio/cadastro'
import CadastroInstituicaoEnsino from './pages/Admin/InstituicaoEnsino/TableInstituicaoEnsino/cadastro'



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
          <Route path='/' element={<Home />} />
          <Route path='/adm' element={<Login />} />
          <Route path='/adm/admin' element={<Admin />} />
          <Route element={<Layout />}>

            {/* rotas da tela de listagem */}
            <Route path='/adm/dashboard' element={<Dashboard />} />
            <Route path='/adm/coordenadorestagio' element={<CoordenadorEstagio />} />
            <Route path='/adm/instituicaoensino' element={<InstituicaoEnsino />}></Route>


            {/* rotas de cadastro */}
            <Route path='/adm/coordenadorestagio/cadastro' element={<CadastroCoordenadorEstagio />} />
            <Route path='/adm/instituicaoensino/cadastro' element={<CadastroInstituicaoEnsino/>}/>
            


            {/* rotas de edição */}
            <Route
              path="/adm/coordenadorestagio/cadastro/:id?"
              element={<CadastroCoordenadorEstagio />}
            />
            <Route
              path="/adm/instituicaoensino/cadastro/:id?"
              element={<CadastroInstituicaoEnsino />}
            />
          </Route>
          <Route path='/*' element={<Page404 />} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
