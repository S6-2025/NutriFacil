import React from 'react'
import { Routes, Route } from 'react-router-dom'

import LandingPage from '../pages/LandingPage'
import LoginRegister from '../pages/LoginRegister'
import About from '../pages/About'

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<LoginRegister />} />
    </Routes>
  )
}

export default AppRoutes
