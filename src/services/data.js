const API_URL = "http://localhost:3001/api"; // Replace with your API URL

export const getState = async () => {
  try {
    const response = await fetch(`${API_URL}/state`, {
      headers: {
        authorization: localStorage.getItem('token'),
      }
    });
  
    if (!response.ok) {
      throw new Error("error has ocurred", {
        cause: response.status,
      });
    }
  
    return await response.json();
  } catch(error) {
    console.error("Getting state: ", error, error.cause);
  }
}

export const updateState = async (question) => {
  try {
    const response = await fetch(`${API_URL}/state`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify(question),
    });
  
    if (!response.ok) {
      throw new Error("error has ocurred", {
        cause: response.status,
      });
    }
  
    return true
  } catch (error)  {
    console.error("Updating state: ", error, error.cause);
    if(error.cause === 401) {
      window.location.reload();
    }
    return false;
  }
}