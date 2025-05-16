import Header from "./components/Header";
import Footer from "./components/Footer";
import "./index.css";

import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <AppRoutes />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
