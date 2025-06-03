import Header from "./components/Header";
import Footer from "./components/Footer";
import "./index.css";
import "./css/Login.css"
import "./css/Register.css"
import "./css/Pages.css"
import "./css/Footer.css"
import "./css/Header.css"
import "./css/ProgressBar.css"
import "./css/NavMenu.css"
import "./css/Profile.css"
import "./css/Result.css"
import "./css/About.css"

import { BrowserRouter as Router, useLocation } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import useIsLargeScreen from "./hooks/useIsLargeScreen";

const AppContent: React.FC = ()=> {
  const location = useLocation();
  const isLargeScreen = useIsLargeScreen();
  const loginRegisterRoutes = ["/register","/login"];
  const isSpecialRoute = loginRegisterRoutes.includes(location.pathname);
  const isHidenRoute = loginRegisterRoutes.includes(location.pathname);

  const sholdShowHeader = !(isLargeScreen && isHidenRoute);

  return(
    <div className="app-container">
      {sholdShowHeader && <Header />}
      <AppRoutes />
      <Footer specialColor={isSpecialRoute} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
        <AppContent />
    </Router>
  );
};

export default App;
