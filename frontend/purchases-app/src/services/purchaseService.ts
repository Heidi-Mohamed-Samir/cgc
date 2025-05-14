import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/purchases';

export const buyProducts = async (userId: number) => {
  const response = await axios.post(`${BASE_URL}/buy`, null, {
    params: { userId },
  });
  return response.data;
};

export const getUserPurchases = async (userId: number) => {
  const response = await axios.get(`${BASE_URL}/user/${userId}`);
  return response.data;
};