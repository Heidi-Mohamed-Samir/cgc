import axios from 'axios';
import { User } from '../types/User';

const API_URL = 'http://localhost:8080/api/users';

export const getAllUsers = () => axios.get<User[]>(API_URL);
export const getUserById = (id: number) => axios.get<User>(`${API_URL}/${id}`);
export const createUser = (user: User) => axios.post<User>(API_URL, user);
export const updateUser = (id: number, user: User) => axios.put<User>(`${API_URL}/${id}`, user);
export const deleteUser = (id: number) => axios.delete(`${API_URL}/${id}`);
