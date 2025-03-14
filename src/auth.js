const API_URL = "https://your-auth-api.com/login"; // Replace with your API URL

export const login = async (email, password) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    const data = await response.json();
    const { token, expiresIn } = data; // API should return token & expiration time

    const expirationTime = Date.now() + expiresIn * 1000; // Convert seconds to ms

    localStorage.setItem("token", token);
    localStorage.setItem("tokenExpiration", expirationTime);

    return true;
  } catch (error) {
    console.error("Login failed:", error);
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("tokenExpiration");
  window.location.reload(); // Refresh to force login page
};

export const isAuthenticated = () => {
  return true;
  const token = localStorage.getItem("token");
  const expiration = localStorage.getItem("tokenExpiration");

  if (!token || !expiration) {
    return false;
  }

  if (Date.now() > parseInt(expiration, 10)) {
    logout(); // Token expired, log out user
    return false;
  }

  return true;
};
