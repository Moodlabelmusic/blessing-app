import { isJwtExpired } from 'jwt-check-expiration';

const API_URL = "http://localhost:3001/api/login"; // Replace with your API URL

export const login = async (password1, password2) => {
  try {
    const response = await fetch(API_URL, {
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
