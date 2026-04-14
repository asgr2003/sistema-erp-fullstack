const API_URL = "https://localhost:7168/api";

export const login = async (username, password) => {
  const response = await fetch(`${API_URL}/Auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  });

  return response.json();
};

export const getProducts = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/Product`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.json();
};

export const createProduct = async (product) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/Product`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(product)
  });

  return response.json();
};

export const createSale = async (saleData) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/Sale`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(saleData)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};
export const deleteProduct = async (id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/Product/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.json();
};
export const getSales = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/Sale`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.json();
};