import './Footer.css'  // ajuste conforme o caminho do seu CSS
import { Link } from 'react-router-dom'  
const Footer = () => {
  return (
    <footer className="super-footer">
      <div className="footer-container">
        <p>© 2025 MeuSite. Todos os direitos reservados.</p>
        
        <nav className="footer-nav">
          <Link to="/">Home</Link>
          <Link to="/about">Sobre</Link>  {/* Navega para /about */}
          <Link to="/contact">Contato</Link>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
