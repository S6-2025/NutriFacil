import { Link } from 'react-router-dom';

interface NavMenuProps {
  isOpen: boolean;
  onClose: () => void;
}
const NavMenu = ({ isOpen, onClose }: NavMenuProps) => {
  return (
    <nav  className={`nav ${isOpen ? 'open' : ''}`}>
      <div className="close-header">
        <svg className="header__SVG" onClick={onClose}>
          <use xlinkHref="/icons.svg#close-black" />
        </svg>
      </div>
   
      <ul className="nav-list">
        <li>
          <Link to="/" onClick={onClose} className="links-li">
            Home
          </Link>
        </li>
        <li>
          <Link to="/profile" onClick={onClose} className="links-li">
           Editar Perfil
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
          <Link to="/login" onClick={onClose} className="links-li">
            Login
          </Link>
        </li>
      </ul>
      <hr />   
      <div className="footer-header">

        <div className="social-media">
          <a href="https://www.instagram.com/nutrifacil25/" onClick={onClose}>
            <svg className="header__SVG">
              <use xlinkHref="/icons.svg#instagram" />
            </svg>
          </a>
          <a href="https://www.facebook.com/profile.php?id=61576713281077" onClick={onClose}>
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
