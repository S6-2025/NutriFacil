import { Link } from 'react-router-dom';

interface NavMenuProps {
  onClose: () => void;
}

const NavMenu = ({ onClose }: NavMenuProps) => {
  return (
    <nav className="nav open">
      <div className="close-header">
        <svg className="header__SVG" onClick={onClose}>
          <use xlinkHref="/icons.svg#close-black" />
        </svg>
      </div>
   
      <ul className="nav-list">
        <li>
          <Link to="#" onClick={onClose} className="links-li">
            Home
          </Link>
        </li>
        <li>
          <Link to="#" onClick={onClose} className="links-li">
            Perfil
          </Link>
        </li>
        <li>
          <Link to="#" onClick={onClose} className="links-li">
            Meu Plano
          </Link>
        </li>
        <li>
          <Link to="/about" onClick={onClose} className="links-li">
            Sobre
          </Link>
        </li>
        <li>
          <Link to="#" onClick={onClose} className="links-li">
            Suporte
          </Link>
        </li>
        <li>
          <Link to="#" onClick={onClose} className="links-li">
            Login
          </Link>
        </li>
      </ul>
      <hr />   
      <div className="footer-header">

        <div className="social-media">
          <a href="" onClick={onClose}>
            <svg className="header__SVG">
              <use xlinkHref="/icons.svg#instagram" />
            </svg>
          </a>
          <a href="" onClick={onClose}>
            <svg className="header__SVG">
              <use xlinkHref="/icons.svg#facebook" />
            </svg>
          </a>
        </div>
  
        <Link to="/" className="logo" onClick={onClose}>
          <svg className="header__SVG">
            <use xlinkHref="/icons.svg#apple" />
          </svg>
          NutriFacil
        </Link>
      </div>
    </nav>
  );
};

export default NavMenu;
