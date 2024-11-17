import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const CategoryList = () => {
  const { supplierId } = useParams();
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3004/category/bysupplier/${supplierId}`)
      .then(res => setCategories(res.data))
      .catch(err => console.error('Error fetching categories:', err));
  }, [supplierId]);

  const handleDeleteCategory = (categoryId) => {
    axios.delete(`http://localhost:3004/category/delete/${categoryId}`)
      .then(() => {
        setCategories(categories.filter(category => category._id !== categoryId));
      })
      .catch(err => console.error('Error deleting category:', err));
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
  };

  const handleUpdateCategory = () => {
    axios.put(`http://localhost:3004/category/update/${editingCategory._id}`, editingCategory)
      .then(res => {
        setCategories(categories.map(category => category._id === res.data._id ? res.data : category));
        setEditingCategory(null);
      })
      .catch(err => console.error('Error updating category:', err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingCategory(prevState => ({ ...prevState, [name]: value }));
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}/products`);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="container flex flex-col mx-auto max-w-4xl bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Categories for Supplier</h1>
        <ul className="space-y-4">
          {categories.map(category => (
            <li
              key={category._id}
              className="flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              <span className="text-xl font-semibold">{category.name}</span>
              <div className="space-x-2">
                <button
                  onClick={() => handleEditCategory(category)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCategory(category._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleCategoryClick(category._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                  View Products
                </button>
              </div>
            </li>
          ))}
        </ul>

        {editingCategory && (
          <div className="mt-8 bg-white p-6 border border-gray-300 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Edit Category</h2>
            <input
              type="text"
              name="name"
              value={editingCategory.name}
              onChange={handleChange}
              placeholder="Category Name"
              className="block w-full p-3 mb-4 border border-gray-300 rounded-md"
            />
            <select
              name="supplierId"
              value={editingCategory.supplierId}
              onChange={handleChange}
              className="block w-full p-3 mb-4 border border-gray-300 rounded-md"
            >
              <option value="">Select Supplier</option>
              {categories.map(supplier => (
                <option key={supplier._id} value={supplier._id}>{supplier.name}</option>
              ))}
            </select>
            <button
              onClick={handleUpdateCategory}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
            >
              Update Category
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


export default CategoryList;
