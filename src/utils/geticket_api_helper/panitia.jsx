import axios from 'axios';

const REACT_APP_API_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const fetchPanitia = async (eventId) => {
  try {
    const response = await axios.get(`${REACT_APP_API_URL}/api/v1/committee/list/${eventId}`);
    return response;  // Return the event data from the response
  } catch (error) {
    console.error("Error fetching event:", error);
    throw new Error(error.response?.data.message || "An error occurred while fetching event data.");
  }
};

export const addPanitia = async (formData, eventId) => {
    try {
      console.log(formData);
      const tokenData = JSON.parse(sessionStorage.getItem('AccessToken'));
  
      if (!tokenData || !tokenData.access_token) {
        throw new Error('Access token is missing or expired');
      }

      const url = `${REACT_APP_API_URL}/api/v1/committee/add/${eventId}`;

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,  // Include the Authorization header here
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add panitia.');
      }
      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'An unexpected error occurred.');
    }
};

export const deletePanitia = async (formData, eventId) => {
  try {
    console.log(formData);
    const tokenData = JSON.parse(sessionStorage.getItem('AccessToken'));

    if (!tokenData || !tokenData.access_token) {
      throw new Error('Access token is missing or expired');
    }

    const url = `${REACT_APP_API_URL}/api/v1/committee/delete/${eventId}`;

    const response = await fetch(url, {
      method: 'DELETE',
      body: formData,
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,  // Include the Authorization header here
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete panitia.');
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'An unexpected error occurred.');
  }
};

export const quitPanitia = async (eventId) => {
  try {
    const tokenData = JSON.parse(sessionStorage.getItem('AccessToken'));

    if (!tokenData || !tokenData.access_token) {
      throw new Error('Access token is missing or expired');
    }

    const url = `${REACT_APP_API_URL}/api/v1/committee/quit/${eventId}`;

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,  // Include the Authorization header here
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete panitia.');
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'An unexpected error occurred.');
  }
};
