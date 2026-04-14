import { useState } from "react";
import { login } from "../services/api";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Completa todos los campos");
      return;
    }

    try {
      const data = await login(username, password);
      const token = data.token?.result;

      if (!token) {
        alert("Credenciales incorrectas");
        return;
      }

      localStorage.setItem("token", token);
      window.location.href = "/products";

    } catch {
      alert("Error en login");
    }
  };

  return (
  <div className="d-flex justify-content-center align-items-center vh-100">

    <div className="card p-4 shadow" style={{ width: "350px" }}>
      
      <h2 className="text-center mb-4">🔐 Login</h2>

      <input
        className="form-control mb-3"
        placeholder="Usuario"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        className="form-control mb-3"
        type="password"
        placeholder="Contraseña"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="btn btn-primary w-100" onClick={handleLogin}>
        Ingresar
      </button>

    </div>

  </div>
);
}

export default Login;