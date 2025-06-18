import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavMenu from "./NavMenu";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsLogged(!!token);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setIsLogged(false);
    navigate("/login");
  };

  return (
    <div className="super-header">
      <div className="header-container">
        <Link to="/" className="logo">
          <svg className="header__SVG">
            <use xlinkHref="/icons.svg#apple" />
          </svg>
          NutriFacil
        </Link>

        <div className="menu-links">
          <Link to="/">Home</Link>
          {isLogged && (
            <>
              <Link to="/nutritional-edit">Preferências Nutricionais</Link>
              <Link to="/profile">Editar Perfil</Link>
              <Link to="/plan">Meu plano</Link>
            </>
          )}
          <Link to="/about">Sobre</Link>

          {!isLogged ? (
            <>
              <Link to="/login" className="links-li" id="login-nav">
                Login
              </Link>
            </>
          ) : (
            <>
              <span
                id="button-logout"
                onClick={handleLogout}
                className="sair"
              >
                Sair
              </span>
            </>
          )}
        </div>

        <svg
          id="menu-list"
          className="header__SVG"
          onClick={() => setMenuOpen(true)}
        >
          <use xlinkHref="/icons.svg#menu-white" />
        </svg>
      </div>

      <NavMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
};

export default Header;
