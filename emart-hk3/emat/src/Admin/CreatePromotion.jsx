import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreatePromotion = () => {
  const [categories, setCategories] = useState([]);
  const [promotion, setPromotion] = useState({
    code: '',
    discount: 0,
    categoryId: '',
    startDate: '',
    endDate: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get('http://localhost:3004/category/xem')
      .then(res => setCategories(res.data))
      .catch(err => console.error('Error fetching categories:', err));
  }, []);

  const validateForm = () => {
    const errors = {};
    const today = new Date().toISOString().split('T')[0]; // format as YYYY-MM-DD

    if (promotion.discount <= 0) {
      errors.discount = 'Discount must be a positive number greater than 0.';
    }
    if (promotion.startDate <= today) {
      errors.startDate = 'Start date must be a future date.';
    }
    if (promotion.endDate <= promotion.startDate) {
      errors.endDate = 'End date must be after the start date.';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPromotion(prevState => ({ ...prevState, [name]: value }));
  };

  const createPromotion = () => {
    if (validateForm()) {
      axios.post('http://localhost:3004/promotion/add', promotion)
        .then(res => {
          console.log('Promotion created:', res.data);
          setPromotion({
            code: '',
            discount: 0,
            categoryId: '',
            startDate: '',
            endDate: ''
          });
          setErrors({});
        })
        .catch(err => console.error('Error creating promotion:', err));
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="container flex flex-col mx-auto max-w-4xl bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Create Promotion</h1>
        <div className="space-y-4">
          <input
            type="text"
            name="code"
            value={promotion.code}
            onChange={handleChange}
            placeholder="Promotion Code"
            className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="discount"
            value={promotion.discount}
            onChange={handleChange}
            placeholder="Discount (%)"
            className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.discount && <p className="text-red-500 text-sm">{errors.discount}</p>}
          <input
            type="date"
            name="startDate"
            value={promotion.startDate}
            onChange={handleChange}
            placeholder="Start Date"
            className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate}</p>}
          <input
            type="date"
            name="endDate"
            value={promotion.endDate}
            onChange={handleChange}
            placeholder="End Date"
            className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate}</p>}
          <select
            name="categoryId"
            value={promotion.categoryId}
            onChange={handleChange}
            className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category._id} value={category._id}>{category.name}</option>
            ))}
          </select>
          <button
            onClick={createPromotion}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Create Promotion
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePromotion;
