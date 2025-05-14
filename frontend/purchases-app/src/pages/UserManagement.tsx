import React, { useEffect, useState } from 'react';
import { User } from '../types/User';
import * as userApi from '../api/userApi';

const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [newUser, setNewUser] = useState<User>({ address: '', email: '', username: '', password: '' });

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = () => {
        userApi.getAllUsers().then((res) => setUsers(res.data));
    };

    const handleCreate = () => {
        userApi.createUser(newUser).then(() => {
            setNewUser({ address: '', email: '', username: '', password: '' });
            loadUsers();
        });
    };

    const handleDelete = (id?: number) => {
        if (id) {
            userApi.deleteUser(id).then(loadUsers);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>User Management</h2>

            <div>
                <input placeholder="Username" value={newUser.username} onChange={e => setNewUser({ ...newUser, username: e.target.value })} />
                <input placeholder="Email" value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} />
                <input placeholder="Address" value={newUser.address} onChange={e => setNewUser({ ...newUser, address: e.target.value })} />
                <input placeholder="Password" type="password" value={newUser.password} onChange={e => setNewUser({ ...newUser, password: e.target.value })} />
                <button onClick={handleCreate}>Create</button>
            </div>

            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.username} - {user.email}
                        <button onClick={() => handleDelete(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserManagement;
