function Navbar() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <span className="navbar-brand">Sistema ERP</span>

      <div>
        <button 
          className="btn btn-outline-light me-2"
          onClick={() => window.location.href = "/products"}
        >
          Productos
        </button>

        <button 
          className="btn btn-outline-light me-2"
          onClick={() => window.location.href = "/sales"}
        >
          Ventas
        </button>

                <button 
            className="btn btn-outline-light me-2"
            onClick={() => window.location.href = "/dashboard"}
            >
            Dashboard
            </button>
      </div>

        <button className="btn btn-danger" onClick={logout}>
          Logout
        </button>


    </nav>
  );
}

export default Navbar;