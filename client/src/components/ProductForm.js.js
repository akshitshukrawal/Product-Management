// src/components/ProductForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductForm = ({ product, refreshProducts }) => {
  const [form, setForm] = useState(product || { name: '', description: '', price: '', quantity: '' });

  useEffect(() => {
    setForm(product || { name: '', description: '', price: '', quantity: '' });
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = form.id ? axios.put : axios.post;
    const url = form.id
      ? `http://localhost:5000/api/products/${form.id}`
      : 'http://localhost:5000/api/products';

    request(url, form)
      .then(response => {
        refreshProducts(response.data); // Pass the new/updated product back to App
      })
      .catch(error => console.error(error));
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">{form?.id ? 'Edit Product' : 'Add Product'}</h2>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
        <input
          name="name"
          value={form?.name || ''}
          onChange={handleChange}
          placeholder="Name"
          required
          className="w-full px-3 py-2 border rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description</label>
        <input
          name="description"
          value={form?.description || ''}
          onChange={handleChange}
          placeholder="Description"
          className="w-full px-3 py-2 border rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">Price</label>
        <input
          name="price"
          type="number"
          value={form?.price || ''}
          onChange={handleChange}
          placeholder="Price"
          required
          className="w-full px-3 py-2 border rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">Quantity</label>
        <input
          name="quantity"
          type="number"
          value={form?.quantity || ''}
          onChange={handleChange}
          placeholder="Quantity"
          required
          className="w-full px-3 py-2 border rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
      >
        {form?.id ? 'Update' : 'Add'} Product
      </button>
    </form>
  );
};

export default ProductForm;
