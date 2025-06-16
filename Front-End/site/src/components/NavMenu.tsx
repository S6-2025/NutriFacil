import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

interface NavMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavMenu = ({ isOpen, onClose }: NavMenuProps) => {
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

  // Atualiza o estado verificando token a cada 1 segundo
  useEffect(() => {
    const checkToken = () => {
      const token = sessionStorage.getItem("token");
      setIsLogged(!!token);
    };

    checkToken(); // roda logo no mount

    const interval = setInterval(checkToken, 1000); // verifica a cada 1s

    return () => clearInterval(interval); // limpa ao desmontar
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setIsLogged(false);
    onClose();
    navigate("/login");
  };

  return (
    <nav className={`nav ${isOpen ? "open" : ""}`}>
      <div className="close-header">
        <svg className="header__SVG" onClick={onClose}>
          <use xlinkHref="/icons.svg#close-black" />
        </svg>
      </div>

      <ul className="nav-list">
        <li>
          <Link
            to={isLogged ? "/result" : "/"}
            onClick={onClose}
            className="links-li"
          >
            Home
          </Link>
        </li>

        {isLogged && (
          <li>
            <Link to="/nutritional-edit" onClick={onClose} className="links-li">
              Preferências Nutricionais
            </Link>
          </li>
        )}

        {isLogged && (
          <li>
            <Link to="/profile" onClick={onClose} className="links-li">
              Editar Perfil
            </Link>
          </li>
        )}

        {isLogged && (
          <li>
            <Link to="/subscription" onClick={onClose} className="links-li">
              Meu plano
            </Link>
          </li>
        )}

        <li>
          <Link to="/about" onClick={onClose} className="links-li">
            Sobre
          </Link>
        </li>

        {!isLogged ? (
          <li>
            <Link to="/login" onClick={onClose} className="links-li">
              Login
            </Link>
          </li>
        ) : (
          <li>
            <button
              onClick={handleLogout}
              className="links-li"
              style={{
                background: "none",
                border: "none",
                padding: 0,
                margin: 0,
                cursor: "pointer",
                font: "inherit",
                color: "inherit",
                textAlign: "left",
                width: "100%",
              }}
            >
              Logout
            </button>
          </li>
        )}
      </ul>

      <hr />

      <div className="footer-header">
        <div className="social-media">
          <a href="https://www.instagram.com/nutrifacil25/" onClick={onClose}>
            <svg className="header__SVG">
              <use xlinkHref="/icons.svg#instagram" />
            </svg>
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61576713281077"
            onClick={onClose}
          >
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
