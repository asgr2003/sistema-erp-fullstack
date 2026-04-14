import { useEffect, useState } from "react";
import { getProducts, getSales } from "../services/api";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const productsData = await getProducts();
      const salesData = await getSales();

      setProducts(productsData);
      setSales(salesData);

    } catch (error) {
      console.error("Error cargando dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  // 📦 Total productos
  const totalProducts = products.length;

  // 💰 Total ventas
  const totalSales = sales.length;

  // 💵 Ingresos reales
  const totalRevenue = sales.reduce((sum, s) => sum + (s.total || 0), 0);

 if (loading) {
  return (
    <div className="d-flex">

      <Sidebar />

      <div style={{ marginLeft: "220px", width: "100%" }}>
        <div className="container mt-4 text-center">
          <h4 className="text-muted">⏳ Cargando datos...</h4>
        </div>
      </div>

    </div>
  );
}

  return (
  <div className="d-flex">

    <Sidebar />

    <div style={{ marginLeft: "220px", width: "100%" }}>
      <div className="container mt-4">

        <h2 className="mb-4 text-center">📊 Dashboard</h2>

        <div className="row text-center">

          <div className="col-md-4">
            <div className="dashboard-card">
              <h5>📦 Productos</h5>
              <h2>{totalProducts}</h2>
            </div>
          </div>

          <div className="col-md-4">
            <div className="dashboard-card">
              <h5>🧾 Ventas</h5>
              <h2>{totalSales}</h2>
            </div>
          </div>

          <div className="col-md-4">
            <div className="dashboard-card">
              <h5>💰 Ingresos</h5>
              <h2 className="text-success">
                ${totalRevenue.toLocaleString()}
              </h2>
            </div>
          </div>

        </div>

      </div>
    </div>

  </div>
);
}

export default Dashboard;