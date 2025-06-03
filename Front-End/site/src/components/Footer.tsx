interface FooterProps {
  specialColor?: boolean;
}


const Footer: React.FC<FooterProps> = ({ specialColor }) => {
  return (
    <footer className={`super-footer ${specialColor ? "special" : ""}`}>
        <p>©NutriFacil 2025 - Todos os direitos reservados.</p>
        <p><a href="">Politicas de privacidade</a> | <a href="">Termos de uso</a></p>
        <div className="social-media">
          <a href="">
            <svg><use xlinkHref="/icons.svg#instagram" /></svg>
          </a>
          <a href="">
            <svg><use xlinkHref="/icons.svg#facebook" /></svg>
          </a>
        </div>
    </footer>
  )
}

export default Footer
