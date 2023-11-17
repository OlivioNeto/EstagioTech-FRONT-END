import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Admin from './pages/Admin'
import Page404 from './pages/Page404'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/adm' element={<Login/>}/>
          <Route path='/adm/admin' element={<Admin/>}/>
          <Route path='/*' element={<Page404/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
