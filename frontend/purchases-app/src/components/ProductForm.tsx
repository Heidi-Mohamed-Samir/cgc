// src/components/ProductForm.tsx
import React, { useState, useEffect } from 'react';

interface Product {
    id?: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    quantity: number;
}

interface Props {
    onSave: (product: Product) => void;
    initialProduct?: Product;
}

const ProductForm: React.FC<Props> = ({ onSave, initialProduct }) => {
    const [product, setProduct] = useState<Product>(
        initialProduct || {
            name: '',
            description: '',
            price: 0,
            stock: 0,
            quantity: 0,
        }
    );

    useEffect(() => {
        if (initialProduct) setProduct(initialProduct);
    }, [initialProduct]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: name === 'price' || name === 'stock' || name === 'quantity' ? +value : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(product);
        setProduct({ name: '', description: '', price: 0, stock: 0, quantity: 0 });
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
            <input name="name" value={product.name} onChange={handleChange} placeholder="Name" required />
            <input name="description" value={product.description} onChange={handleChange} placeholder="Description" required />
            <input name="price" type="number" value={product.price} onChange={handleChange} placeholder="Price" required />
            <input name="stock" type="number" value={product.stock} onChange={handleChange} placeholder="Stock" required />
            <input name="quantity" type="number" value={product.quantity} onChange={handleChange} placeholder="Quantity" required />
            <button type="submit">{initialProduct ? "Update" : "Add"} Product</button>
        </form>
    );
};

export default ProductForm;
