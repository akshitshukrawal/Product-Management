// src/components/ProductList.js
import React from 'react';
import axios from 'axios';

const ProductList = ({ products, onEdit, refreshProducts }) => {
  
  const deleteProduct = (id) => {
    axios.delete(`http://localhost:5000/api/products/${id}`)
      .then(() => refreshProducts())
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Description</th>
            <th className="border border-gray-300 p-2">Price</th>
            <th className="border border-gray-300 p-2">Quantity</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td className="border border-gray-300 p-2">{product.id}</td>
              <td className="border border-gray-300 p-2">{product.name}</td>
              <td className="border border-gray-300 p-2">{product.description}</td>
              <td className="border border-gray-300 p-2">${product.price}</td>
              <td className="border border-gray-300 p-2">{product.quantity}</td>
              <td className="border border-gray-300 p-2">
                <button onClick={() => onEdit(product)} className="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600">Edit</button>
                <button onClick={() => deleteProduct(product.id)} className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 ml-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
