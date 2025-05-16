import './Header.css' // ou ajuste conforme onde estiver seu CSS

const Header = () => {
  return (
    <div className="super-header">
      <div className="header-container">
        <a href="/" className="logo">
          <svg className="header__SVG">
            <use xlinkHref="/icons.svg#apple-white"></use>
          </svg>
          NutriFacil
        </a>
        <svg id="menu-list" className="header__SVG">
          <use xlinkHref="/icons.svg#menu-white"></use>
        </svg>
        <nav className="nav">
          <ul className="nav-list">
            <li><a href="#">Início</a></li>
            <li><a href="#">Contato</a></li>
            <li><a href="#">Profile</a></li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Header
