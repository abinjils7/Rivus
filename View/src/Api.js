const BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? "/api" : "http://localhost:5000");

export const carApi = `${BASE_URL}/cars`;

export const UserAPI = `${BASE_URL}/users`;

export const orderApi = `${BASE_URL}/orders`;

export const cartApi = `${BASE_URL}/cart`;

export const wishlistApi = `${BASE_URL}/wishlist`;

export const loginAPI = `${BASE_URL}/login`;

export const registerAPI = `${BASE_URL}/Register`;
