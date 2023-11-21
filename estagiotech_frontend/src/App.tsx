import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Admin from './pages/Admin'
import Page404 from './pages/Page404'
import Dashboard from './pages/Admin/Dashboard'
import TipoEstagio from './pages/Admin/TipoEstagio';
import Documento from './pages/Admin/Documento'
import Coordenador from './pages/Admin/Coordenador'
import SideBar from "./pages/Admin/Components/SideBar";
import Navbar from "./pages/Admin/Components/NavBar";


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
          <Route path='/adm/documento' element={<Documento/>}/>
          <Route path='/adm/coordenador' element={<Coordenador/>}/>
          </Route>
          <Route path='/*' element={<Page404/>}/>
          
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
