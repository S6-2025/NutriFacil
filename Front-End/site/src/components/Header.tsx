import { useState } from 'react';
import { Link } from 'react-router-dom';
import NavMenu from './NavMenu';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="super-header">
      <div className="header-container">
        <Link to="/" className="logo">
          <svg className="header__SVG"><use xlinkHref="/icons.svg#apple-white" /></svg>
          NutriFacil
        </Link>

        <svg id="menu-list" className="header__SVG" onClick={() => setMenuOpen(true)}>
          <use xlinkHref="/icons.svg#menu-white" />
        </svg>
      </div>

      {/* NavMenu SEM condicional, apenas controle pela prop isOpen */}
      <NavMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
};

export default Header;
