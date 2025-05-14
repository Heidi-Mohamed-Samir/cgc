import React, { useEffect, useState } from "react";
import axios from "axios";

// Interfaces
interface User {
    id?: number;
    username: string;
    email: string;
    address: string;
    password: string;
}

interface Product {
    id?: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    quantity: number;
}

interface CartItem {
    id: number;
    product: Product;
    quantity: number;
}

interface Purchase {
    id: number;
    purchaseDate: string;
    totalAmount: number;
}

// Main Component
function App() {
    const [userId, setUserId] = useState("");
    const [users, setUsers] = useState<User[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [purchases, setPurchases] = useState<Purchase[]>([]);

    const [newUser, setNewUser] = useState<User>({
        username: "",
        email: "",
        address: "",
        password: "",
    });
    const [editUserId, setEditUserId] = useState<number | null>(null);

    const [newProduct, setNewProduct] = useState<Product>({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        quantity: 0,
    });
    const [editProductId, setEditProductId] = useState<number | null>(null);

    // Load Data
    const loadUsers = async () => {
        const res = await axios.get("http://localhost:8080/api/users");
        setUsers(res.data);
    };

    const loadProducts = async () => {
        const res = await axios.get("http://localhost:8080/products");
        setProducts(res.data);
    };

    const loadCart = async () => {
        if (!userId) return;
        try {
            const res = await axios.get(`http://localhost:8080/api/cart/user/${userId}`);
            setCartItems(res.data);
        } catch {
            alert("Error loading cart");
        }
    };

    const loadPurchases = async () => {
        if (!userId) return;
        try {
            const res = await axios.get(`http://localhost:8080/api/purchases/user/${userId}`);
            setPurchases(res.data);
        } catch {
            alert("Error fetching purchases");
        }
    };

    useEffect(() => {
        loadUsers();
        loadProducts();
    }, []);

    // User Handlers
    const handleCreateUser = async () => {
        try {
            await axios.post("http://localhost:8080/api/users", newUser);
            setNewUser({ username: "", email: "", address: "", password: "" });
            loadUsers();
        } catch {
            alert("Error creating user");
        }
    };

    const handleUpdateUser = async () => {
        if (editUserId === null) return;
        try {
            await axios.put(`http://localhost:8080/api/users/${editUserId}`, newUser);
            setEditUserId(null);
            setNewUser({ username: "", email: "", address: "", password: "" });
            loadUsers();
        } catch {
            alert("Error updating user");
        }
    };

    const handleEditUser = (user: User) => {
        setEditUserId(user.id!);
        setNewUser(user);
    };

    const handleDeleteUser = async (id?: number) => {
        try {
            await axios.delete(`http://localhost:8080/api/users/${id}`);
            loadUsers();
        } catch {
            alert("Error deleting user");
        }
    };

    // Product Handlers
    const handleCreateProduct = async () => {
        try {
            await axios.post("http://localhost:8080/products", newProduct);
            setNewProduct({ name: "", description: "", price: 0, stock: 0, quantity: 0 });
            loadProducts();
        } catch {
            alert("Error creating product");
        }
    };

    const handleUpdateProduct = async () => {
        if (editProductId === null) return;
        try {
            await axios.put(`http://localhost:8080/products/${editProductId}`, newProduct);
            setEditProductId(null);
            setNewProduct({ name: "", description: "", price: 0, stock: 0, quantity: 0 });
            loadProducts();
        } catch {
            alert("Error updating product");
        }
    };

    const handleEditProduct = (product: Product) => {
        setEditProductId(product.id!);
        setNewProduct(product);
    };

    const handleDeleteProduct = async (id?: number) => {
        try {
            await axios.delete(`http://localhost:8080/products/${id}`);
            loadProducts();
        } catch {
            alert("Error deleting product");
        }
    };

    // Cart Handlers
    const handleAddToCart = async (productId: number, quantity: number) => {
        if (!userId) {
            alert("Please select a user first");
            return;
        }
        try {
            await axios.post(`http://localhost:8080/api/cart/add`, null, {
                params: { userId, productId, quantity },
            });
            loadCart();
        } catch {
            alert("Error adding product to cart");
        }
    };

    const handleRemoveFromCart = async (cartItemId: number) => {
        try {
            await axios.delete(`http://localhost:8080/api/cart/${cartItemId}`);
            loadCart();
        } catch {
            alert("Error removing product from cart");
        }
    };

    const handleUpdateCartItem = async (cartItemId: number, newQuantity: number) => {
        try {
            await axios.put(`http://localhost:8080/api/cart/update/${cartItemId}`, null, {
                params: { newQuantity },
            });
            loadCart();
        } catch {
            alert("Error updating cart item");
        }
    };

    const handleBuy = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/api/purchases/buy?userId=${userId}`);
            alert("Purchase created with ID: " + response.data.id);
            loadCart();
            loadPurchases();
        } catch {
            alert("Error creating purchase");
        }
    };

    // Styles
    const container = { padding: "20px", fontFamily: "Arial, sans-serif" };
    const section = { backgroundColor: "#fff", padding: "20px", marginBottom: "20px", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" };
    const input = { padding: "8px", margin: "5px", width: "100%", borderRadius: "5px", border: "1px solid #ccc" };
    const btn = { padding: "8px 12px", margin: "5px", borderRadius: "5px", border: "none", cursor: "pointer" };
    const btnPrimary = { ...btn, backgroundColor: "#007bff", color: "#fff" };
    const btnEdit = { ...btn, backgroundColor: "#ffc107", color: "#000" };
    const btnDanger = { ...btn, backgroundColor: "#dc3545", color: "#fff" };

    return (
        <div style={container}>
            <h1>Shopping App</h1>

            {/* User Section */}
            <div style={section}>
                <h2>{editUserId ? "Edit User" : "Create User"}</h2>
                <input style={input} placeholder="Username" value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} />
                <input style={input} placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
                <input style={input} placeholder="Address" value={newUser.address} onChange={(e) => setNewUser({ ...newUser, address: e.target.value })} />
                <input style={input} type="password" placeholder="Password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
                {editUserId ? (
                    <button style={btnEdit} onClick={handleUpdateUser}>Update User</button>
                ) : (
                    <button style={btnPrimary} onClick={handleCreateUser}>Create User</button>
                )}
            </div>

            <div style={section}>
                <h2>All Users</h2>
                {users.map(u => (
                    <div key={u.id}>
                        <strong>{u.username}</strong> ({u.email})
                        <br />
                        <button style={btnPrimary} onClick={() => setUserId(u.id?.toString() || "")}>Use</button>
                        <button style={btnEdit} onClick={() => handleEditUser(u)}>Edit</button>
                        <button style={btnDanger} onClick={() => handleDeleteUser(u.id)}>Delete</button>
                    </div>
                ))}
            </div>

            {/* Product Section */}
            <div style={section}>
                <h2>{editProductId ? "Edit Product" : "Create Product"}</h2>
                <input style={input} placeholder="Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
                <input style={input} placeholder="Description" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
                <input style={input} type="number" placeholder="Price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: +e.target.value })} />
                <input style={input} type="number" placeholder="Stock" value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: +e.target.value })} />
                <input style={input} type="number" placeholder="Quantity" value={newProduct.quantity} onChange={(e) => setNewProduct({ ...newProduct, quantity: +e.target.value })} />
                {editProductId ? (
                    <button style={btnEdit} onClick={handleUpdateProduct}>Update Product</button>
                ) : (
                    <button style={btnPrimary} onClick={handleCreateProduct}>Create Product</button>
                )}
            </div>

            <div style={section}>
                <h2>All Products</h2>
                {products.map(p => (
                    <div key={p.id}>
                        <strong>{p.name}</strong> - {p.description} | Price: {p.price} | Stock: {p.stock}
                        <br />
                        <button style={btnPrimary} onClick={() => handleAddToCart(p.id!, p.quantity)}>Add to Cart</button>
                        <button style={btnEdit} onClick={() => handleEditProduct(p)}>Edit</button>
                        <button style={btnDanger} onClick={() => handleDeleteProduct(p.id)}>Delete</button>
                    </div>
                ))}
            </div>

            {/* Cart Section */}
            <div style={section}>
                <h2>User Cart</h2>
                <button style={btnPrimary} onClick={loadCart}>Refresh Cart</button>
                {cartItems.length === 0 ? (
                    <p>No items in cart.</p>
                ) : (
                    cartItems.map(item => (
                        <div key={item.id}>
                            <strong>{item.product.name}</strong> - Quantity: {item.quantity}
                            <br />
                            <input type="number" style={input} value={item.quantity} onChange={(e) => handleUpdateCartItem(item.id, +e.target.value)} />
                            <button style={btnDanger} onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                        </div>
                    ))
                )}
                <button style={btnPrimary} onClick={handleBuy}>Buy Now</button>
            </div>

            {/* Purchases Section */}
            <div style={section}>
                <h2>User Purchases</h2>
                <button style={btnPrimary} onClick={loadPurchases}>Get Purchases</button>
                {purchases.map(p => (
                    <div key={p.id}>
                        Purchase ID: {p.id} | Date: {p.purchaseDate} | Total: ${p.totalAmount}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
