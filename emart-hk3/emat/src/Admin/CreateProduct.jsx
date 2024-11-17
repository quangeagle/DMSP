import React, { useState } from 'react';
import axios from 'axios';

const CreateProduct = ({ categoryId }) => {
    const [product, setProduct] = useState({ name: '', description: '', price: 0, imageUrl: '', categoryId });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Allow only positive values greater than 0 for price
        if (name === 'price') {
            const priceValue = Math.max(0, Number(value));
            setProduct(prevState => ({ ...prevState, price: priceValue }));
            setError(priceValue <= 0 ? 'Price must be greater than 0' : '');
        } else {
            setProduct(prevState => ({ ...prevState, [name]: value }));
        }
    };

    const createProduct = () => {
        if (product.price <= 0) {
            setError('Price must be greater than 0');
            return;
        }

        axios.post('http://localhost:3004/product/add', product)
            .then(res => {
                console.log('Product created:', res.data);
                setError('');
            })
            .catch(err => {
                console.error('Error creating product:', err);
                setError('Error creating product');
            });
    };

    return (
        <div>
            <h1>Create Product</h1>
            <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Product Name" />
            <input type="text" name="description" value={product.description} onChange={handleChange} placeholder="Description" />
            <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="Price" min="1" />
            <input type="text" name="imageUrl" value={product.imageUrl} onChange={handleChange} placeholder="Image URL" />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={createProduct} disabled={product.price <= 0}>Create Product</button>
        </div>
    );
};

export default CreateProduct;
