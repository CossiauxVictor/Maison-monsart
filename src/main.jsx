import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Partenaires from './pages/Partenaires.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/partenaires" element={<Partenaires />} />
        <Route path="/b2b" element={<Navigate to="/partenaires" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
