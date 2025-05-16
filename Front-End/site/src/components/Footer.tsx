import './Footer.css'  // ajuste conforme o caminho do seu CSS

const Footer = () => {
  return (
    <footer className="super-footer">
      <div className="footer-container">
        <p>© 2025 MeuSite. Todos os direitos reservados.</p>
        
        <nav className="footer-nav">
          <a href="#">Home</a>
          <a href="#">Sobre</a>
          <a href="#">Contato</a>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
