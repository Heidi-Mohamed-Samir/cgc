// src/components/ProductList.tsx
import React from 'react';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    quantity: number;
}

interface Props {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete: (id: number) => void;
}

const ProductList: React.FC<Props> = ({ products, onEdit, onDelete }) => {
    return (
        <div>
            <h2>Products</h2>
            {products.map(p => (
                <div key={p.id} style={{ border: '1px solid gray', margin: '10px', padding: '10px' }}>
                    <p><strong>{p.name}</strong></p>
                    <p>{p.description}</p>
                    <p>Price: {p.price} | Stock: {p.stock} | Quantity: {p.quantity}</p>
                    <button onClick={() => onEdit(p)}>Edit</button>
                    <button onClick={() => onDelete(p.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
