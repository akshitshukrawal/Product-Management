// src/App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import ProductForm from './components/ProductForm.js';
import ProductList from './components/ProductList.js';
import axios from 'axios';

function App() {
  const [editingProduct, setEditingProduct] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get('http://localhost:5000/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => console.error(error));
  };

  const refreshProducts = (updatedProduct) => {
    if (updatedProduct) {
      setProducts((prevProducts) => {
        // If it's an update, replace the existing product
        const existingIndex = prevProducts.findIndex(product => product.id === updatedProduct.id);
        if (existingIndex > -1) {
          const updatedProducts = [...prevProducts];
          updatedProducts[existingIndex] = updatedProduct;
          return updatedProducts;
        }
        // If it's a new product, add it to the list
        return [...prevProducts, updatedProduct];
      });
    }
    setEditingProduct(null);
  };

  return (
    <div className="App">
      <h1 className="text-3xl font-bold mb-6">Product Management System</h1>
      <ProductForm product={editingProduct} refreshProducts={refreshProducts} />
      <ProductList products={products} onEdit={setEditingProduct} refreshProducts={fetchProducts} />
    </div>
  );
}

export default App;
