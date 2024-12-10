import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './global.css'
import { AuthProvider } from './context/AuthContext.tsx'
// import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      {/* <BrowserRouter> */}
        <App />
        <Toaster />
      {/* </BrowserRouter> */}
    </AuthProvider>
  </React.StrictMode>,
)
