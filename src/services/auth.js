import { isJwtExpired } from 'jwt-check-expiration';
import { API_URL } from './data';

export const login = async (password1, password2) => {
  try {
    const url = `${API_URL}/login`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password1, password2 }),
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    const token = await response.text()
    localStorage.setItem("token", token);

    return true;
  } catch (error) {
    console.error("Login failed:", error);
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  window.location.reload(); // Refresh to force login page
};

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return false;
  }

  if (isJwtExpired(token)) {
    logout(); // Token expired, log out user
    return false;
  }

  return true;
};
