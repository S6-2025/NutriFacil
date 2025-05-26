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
        <hr />
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
            Sair
          </Link>
        </li>
      </ul>
      
      <div className="footer-header">
 
        <div className="social-media">
          <a href="">
            <svg className="header__SVG">
              <use xlinkHref="/icons.svg#instagram-black" />
            </svg>
          </a>
          <a href="">
            <svg className="header__SVG">
              <use xlinkHref="/icons.svg#facebook-black" />
            </svg>
          </a>
        </div>
    <hr />
        <Link to="/" className="logo">
          <svg className="header__SVG">
            <use xlinkHref="/icons.svg#apple-black" />
          </svg>
          NutriFacil
        </Link>
      </div>
    </nav>
  );
};

export default NavMenu;
