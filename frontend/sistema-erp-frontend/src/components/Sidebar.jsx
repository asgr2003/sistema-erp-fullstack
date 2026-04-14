import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">

      <h4 className="text-white text-center mb-4">📊 ERP</h4>

      <Link to="/products" className="sidebar-link">📦 Productos</Link>
      <Link to="/sales" className="sidebar-link">🧾 Ventas</Link>
      <Link to="/dashboard" className="sidebar-link">📊 Dashboard</Link>

      {/* 🌙 DARK MODE */}
      <button
        className="btn btn-secondary w-100 mb-2"
        onClick={() => document.body.classList.toggle("dark")}
      >
        🌙 Modo oscuro
      </button>

      <button
        className="btn btn-danger w-100"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
      >
        Logout
      </button>

    </div>
  );
}

export default Sidebar;