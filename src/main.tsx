import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import './index.css'

import { HomeRoute } from './routes/home'
import { NotFoundRoute } from './routes/not-found'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="*" element={<NotFoundRoute />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
