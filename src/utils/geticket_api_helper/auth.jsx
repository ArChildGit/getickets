import axios from 'axios';

const REACT_APP_API_URL = import.meta.env.VITE_REACT_APP_API_URL; // Ambil base URL dari environment variable

export const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${REACT_APP_API_URL}/api/v1/auth/register`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const loginUser = async (formData) => {
  try {
    const response = await axios.post(`${REACT_APP_API_URL}/api/v1/auth/login`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data; // Mengembalikan data dari response
  } catch (error) {
    // Menangani error jika terjadi
    throw error.response?.data || error.message;
  }
};

export const getUserProfile = async () => {
  try {
    // Retrieve the AccessToken from sessionStorage
    const tokenData = JSON.parse(sessionStorage.getItem('AccessToken'));

    if (!tokenData || !tokenData.access_token) {
      throw new Error('Access token is missing or expired');
    }

    // Set up the Authorization header with the Bearer token
    const authHeader = {
      Authorization: `Bearer ${tokenData.access_token}`,
    };

    // Send the GET request to fetch the user profile
    const response = await axios.get(`${REACT_APP_API_URL}/api/v1/user/profile`, {
      headers: authHeader,
    });

    // Return the response data
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error.response?.data || error.message;
  }
};

export const updateUserProfile = async (formData) => {
  try {
    const tokenData = JSON.parse(sessionStorage.getItem('AccessToken'));

    if (!tokenData || !tokenData.access_token) {
      throw new Error('Access token is missing or expired');
    }

    const url = `${REACT_APP_API_URL}/api/v1/user/update`;  // Corrected URL structure

    // Send the request with the formData (multipart/form-data)
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,  // Include the Authorization header here
      },
    });

    // Check if the response is successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update user profile.');
    }

    return await response.json();  // Return the JSON response if successful
  } catch (error) {
    throw new Error(error.message || 'An unexpected error occurred.');
  }
};
