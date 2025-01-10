import axios from 'axios';

const REACT_APP_API_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const fetchEventPackages = async (eventId) => {
  try {
    const response = await axios.get(`${REACT_APP_API_URL}/api/v1/packages/get/${eventId}`);
    return response;  // Return the event data from the response
  } catch (error) {
    console.error("Error fetching event:", error);
    throw new Error(error.response?.data.message || "An error occurred while fetching event data.");
  }
};

export const addPackage = async (formData, eventId) => {
    try {
      const tokenData = JSON.parse(sessionStorage.getItem('AccessToken'));
  
      if (!tokenData || !tokenData.access_token) {
        throw new Error('Access token is missing or expired');
      }

      const url = `${REACT_APP_API_URL}/api/v1/packages/add/${eventId}`;

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,  // Include the Authorization header here
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add packages.');
      }
      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'An unexpected error occurred.');
    }
};

export const deleteEventPackage = async (eventId, packageId) => {
  try {
    const tokenData = JSON.parse(sessionStorage.getItem('AccessToken'));

    if (!tokenData || !tokenData.access_token) {
      throw new Error('Access token is missing or expired');
    }

    const url = `${REACT_APP_API_URL}/api/v1/packages/delete/${eventId}/${packageId}`;

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`, // Sertakan Authorization header
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete packages.');
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting packages:", error);
    throw new Error(error.message || "An error occurred while deleting the packages.");
  }
};


