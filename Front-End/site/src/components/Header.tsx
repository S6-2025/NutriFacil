
import { Link } from 'react-router-dom'


const Header = () => {
  return (
    <div className="super-header">
      <div className="header-container">
        <Link to="/" className="logo">
          <svg className="header__SVG">
            <use xlinkHref="/icons.svg#apple-white"></use>
          </svg>
          NutriFacil
        </Link>

        <svg id="menu-list" className="header__SVG">
          <use xlinkHref="/icons.svg#menu-white"></use>
        </svg>
        <nav className="nav">
          <ul className="nav-list">
            <li>
              <Link to="/about">Sobre</Link>
            </li>
            <li>
              <Link to="/about">Sobre</Link>
            </li>
            <li>
              <Link to="/about">Sobre</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Header
