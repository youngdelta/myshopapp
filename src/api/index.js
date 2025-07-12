import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // 자격 증명(쿠키 등)을 함께 보내도록 설정
});

export const fetchMembers = async () => {
  const response = await api.get('/members');
  return response.data;
};

export const createMember = async (member) => {
  const response = await api.post('/members', member);
  return response.data;
};

export const fetchProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

export const createProduct = async (product) => {
  const response = await api.post('/products', product);
  return response.data;
};

export const addToCart = async (cartItem) => {
  const response = await api.post('/cart', cartItem);
  return response.data;
};

export const fetchCart = async (memberId) => {
  const response = await api.get(`/cart/${memberId}`);
  return response.data;
};

export const removeCartItem = async (cartItemId) => {
  const response = await api.delete(`/cart/item/${cartItemId}`);
  return response.data;
};

export const clearCart = async (memberId) => {
  const response = await api.delete(`/cart/${memberId}`);
  return response.data;
};

export const createOrder = async (order) => {
  const response = await api.post('/orders', order);
  return response.data;
};

export const fetchOrders = async () => {
  const response = await api.get('/orders');
  return response.data;
};

export const cancelOrder = async (orderId) => {
  const response = await api.post(`/orders/${orderId}/cancel`);
  return response.data;
};

export const login = async (credentials) => {
  const response = await api.post('/login', credentials);
  return response.data;
};

export const logout = async () => {
  const response = await api.get('/logout');
  return response.data;
};

export const fetchOrderStatistics = async (startDate, endDate) => {
  const response = await api.get('/orders/statistics', {
    params: { startDate, endDate },
  });
  return response.data;
};

export const runBatchJob = async (jobName) => {
  const response = await api.post(`/batch/run`, { jobName });
  return response.data;
};

export const fetchBatchExecutions = async () => {
  const response = await api.get('/batch/executions');
  return response.data;
};