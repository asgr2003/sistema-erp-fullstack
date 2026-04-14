import { useEffect, useState } from "react";
import { getProducts, createProduct, deleteProduct } from "../services/api";
import Sidebar from "../components/Sidebar";
import { motion } from "framer-motion";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: ""
  });

  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  // 🔍 FILTRO
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // ➕ CREAR PRODUCTO
  const handleCreateProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
      alert("Completa todos los campos");
      return;
    }

    await createProduct(newProduct);
    alert("Producto creado");

    setNewProduct({ name: "", price: "", stock: "" });
    loadProducts();
  };

  // ✏️ ACTUALIZAR PRODUCTO
  const handleUpdateProduct = async () => {
    if (!editingProduct.name || !editingProduct.price || !editingProduct.stock) {
      alert("Completa todos los campos");
      return;
    }

    const token = localStorage.getItem("token");

    await fetch(`https://localhost:7168/api/Product/${editingProduct.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(editingProduct)
    });

    alert("Producto actualizado");
    setEditingProduct(null);
    loadProducts();
  };

  // 🗑️ ELIMINAR PRODUCTO
  const handleDeleteProduct = async (id) => {
    const confirmDelete = window.confirm("¿Eliminar este producto?");
    if (!confirmDelete) return;

    await deleteProduct(id);
    alert("Producto eliminado");
    loadProducts();
  };

 return (
  <div className="d-flex">

    <Sidebar />

    <div style={{ marginLeft: "220px", width: "100%" }}>
      <div className="container mt-4">

        <h2 className="mb-3">📦 Productos</h2>

        <input
          className="form-control mb-4"
          placeholder="🔍 Buscar producto..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="card p-3 mb-4 shadow-sm">
          <h5>➕ Nuevo Producto</h5>

          <input
            className="form-control mb-2"
            placeholder="Nombre"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />

          <input
            type="number"
            className="form-control mb-2"
            placeholder="Precio"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />

          <input
            type="number"
            className="form-control mb-2"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={(e) =>
              setNewProduct({ ...newProduct, stock: e.target.value })
            }
          />

          <button className="btn btn-success" onClick={handleCreateProduct}>
            Crear Producto
          </button>
        </div>

        {editingProduct && (
          <div className="card p-3 mb-4 shadow border-warning">
            <h5>✏️ Editar Producto</h5>

            <input
              className="form-control mb-2"
              value={editingProduct.name}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, name: e.target.value })
              }
            />

            <input
              type="number"
              className="form-control mb-2"
              value={editingProduct.price}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, price: e.target.value })
              }
            />

            <input
              type="number"
              className="form-control mb-2"
              value={editingProduct.stock}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, stock: e.target.value })
              }
            />

            <div className="d-flex gap-2">
              <button className="btn btn-primary" onClick={handleUpdateProduct}>
                Guardar cambios
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setEditingProduct(null)}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        <div className="row">
          {filteredProducts.map(p => (
            <div className="col-md-4" key={p.id}>
              <div className="card p-3 mb-3 shadow-sm h-100">
                <h5>{p.name}</h5>

                <p>💰 ${p.price}</p>
                <p className="text-secondary fw-semibold">
  📦 Stock: {p.stock}
</p>
                <div className="d-flex gap-2 mt-3">
                  <button
                    className="btn btn-warning btn-sm w-50"
                    onClick={() => setEditingProduct(p)}
                  >
                    ✏️ Editar
                  </button>

                  <button
                    className="btn btn-danger btn-sm w-50"
                    onClick={() => handleDeleteProduct(p.id)}
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>

  </div>
);
}

export default Products;