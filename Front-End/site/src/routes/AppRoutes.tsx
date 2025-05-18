import React from 'react'
import { Routes, Route } from 'react-router-dom'

import LandingPage from '../pages/LandingPage'
import LoginRegister from '../pages/LoginRegister'
import About from '../pages/About'
import Questionary from '../components/Questionary'

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<LoginRegister />} />
      <Route path="/questionary" element={<Questionary />} />
    </Routes>
  )
}

export default AppRoutes
