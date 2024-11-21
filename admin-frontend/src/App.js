import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SuperAdminRegister from "./components/Pages/SuperAdminRegister";
import SuperAdminLogin from "./components/Pages/SuperAdminLogin";
import Dasboard from "./components/Pages/Dasboard";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SuperAdminRegister />} />
          <Route path="/superadminlogin" element={<SuperAdminLogin />} />
          <Route path="/dashboard" element={<Dasboard />} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
