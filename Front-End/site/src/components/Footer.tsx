
import { Link } from 'react-router-dom'  
const Footer = () => {
  return (
    <footer className="super-footer">
      <div className="footer-container">
       
        
        <nav className="footer-nav">
          <Link to="/">Home</Link>
          <Link to="/about">Sobre</Link>  {/* Navega para /about */}
          <Link to="/contact">Contato</Link>
        </nav>
         <p>© 2025 MeuSite. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer
