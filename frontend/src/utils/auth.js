// utils/auth.js
import { jwtDecode } from 'jwt-decode';

export const getUserRole = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    return decoded.role; // assuming role is in token payload
  } catch (err) {
    console.error("Invalid token");
    return null;
  }
};
