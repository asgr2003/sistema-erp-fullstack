import { useEffect, useState } from "react";
import { getProducts, createSale } from "../services/api";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";

function Sales() {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const addProduct = (product) => {
    const exists = selected.find(s => s.productId === product.id);

    if (exists) {
      alert("Producto ya agregado");
      return;
    }

    setSelected([...selected, { productId: product.id, quantity: 1 }]);
  };

  const updateQuantity = (index, value) => {
    const updated = [...selected];
    updated[index].quantity = parseInt(value);
    setSelected(updated);
  };

  const removeProduct = (index) => {
    setSelected(selected.filter((_, i) => i !== index));
  };

  const total = selected.reduce((sum, item) => {
    const product = products.find(p => p.id === item.productId);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  const handleCreateSale = async () => {
    if (selected.length === 0) {
      alert("Agrega productos");
      return;
    }

    try {
      const sale = {
        customerId: 1,
        items: selected
      };

      await createSale(sale);

      alert("Venta creada correctamente");

      setSelected([]);
      loadProducts();

    } catch (error) {
      alert(error.message);
    }
  };

 return (
  <div className="d-flex">

    <Sidebar />

    <div style={{ marginLeft: "220px", width: "100%" }}>
      <div className="container mt-4">

        <h2 className="mb-4 text-center">🧾 Crear Venta</h2>

        <div className="row">

          <div className="col-md-6">
            <h4>📦 Productos</h4>

            <div className="row">
              {products.map(p => (
                <div className="col-md-6" key={p.id}>
                  <div className="card p-3 mb-3 shadow-sm text-center">
                    <h5>{p.name}</h5>
                    <p className="text-success">${p.price}</p>
                    <p className="text-muted">Stock: {p.stock}</p>

                    <button
                      className="btn btn-primary w-100"
                      onClick={() => addProduct(p)}
                    >
                      ➕ Agregar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-6">
            <h4>🛒 Seleccionados</h4>

            {selected.length === 0 && (
              <div className="alert alert-info">
                🛒 Agrega productos para comenzar
              </div>
            )}

            {selected.map((item, index) => {
              const product = products.find(p => p.id === item.productId);

              return (
                <div key={index} className="card p-3 mb-2 shadow-sm">
                  <div className="d-flex justify-content-between align-items-center">

                    <div>
                      <strong>{product?.name}</strong>
                      <br />
                      <small>${product?.price}</small>
                    </div>

                    <input
                      type="number"
                      min="1"
                      className="form-control"
                      style={{ width: "80px" }}
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(index, e.target.value)
                      }
                    />

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeProduct(index)}
                    >
                      ❌
                    </button>
                  </div>
                </div>
              );
            })}

            <div className="card p-4 mt-3 text-center shadow">
              <h4>Total</h4>
              <h2 className="text-success">${total}</h2>

              <button
                className="btn btn-success w-100"
                onClick={handleCreateSale}
              >
                💾 Guardar Venta
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>

  </div>
);
}

export default Sales;