import axios from 'axios';

const REACT_APP_API_URL = import.meta.env.VITE_REACT_APP_API_URL; // Ambil base URL dari environment variable

export const fetchEvents = async (page = 1, perPage = 10, search = '') => {
  const apiUrl = `${REACT_APP_API_URL}/api/v1/events/events?page=${page}&per_page=${perPage}&search=${search}`;

  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    return { events: [], total_events: 0, total_pages: 0 };
  }
};

export const fetchManagedEvents = async (page = 1, perPage = 10, search = '') => {
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
    const response = await axios.get(`${REACT_APP_API_URL}/api/v1/events/manage?page=${page}&per_page=${perPage}&search=${search}`, {
      headers: authHeader,
    });

    // Return the response data
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error.response?.data || error.message;
  }
};

export const fetchEventById = async (eventId) => {
  try {
    const response = await axios.get(`${REACT_APP_API_URL}/api/v1/events/events/${eventId}`);
    return response.data.event;  // Return the event data from the response
  } catch (error) {
    console.error("Error fetching event:", error);
    throw new Error(error.response?.data.message || "An error occurred while fetching event data.");
  }
};

export const deleteEvent = async (eventId) => {
  try {
    const tokenData = JSON.parse(sessionStorage.getItem('AccessToken'));

    if (!tokenData || !tokenData.access_token) {
      throw new Error('Access token is missing or expired');
    }

    const url = `${REACT_APP_API_URL}/api/v1/events/delete/${eventId}`;

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`, // Sertakan Authorization header
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete event.');
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting event:", error);
    throw new Error(error.message || "An error occurred while deleting the event.");
  }
};

export const postEvent = async (formData) => {
    try {
      const tokenData = JSON.parse(sessionStorage.getItem('AccessToken'));
  
      if (!tokenData || !tokenData.access_token) {
        throw new Error('Access token is missing or expired');
      }

      const url = `${REACT_APP_API_URL}/api/v1/events/add`;

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,  // Include the Authorization header here
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add event.');
      }
      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'An unexpected add occurred.');
    }
};

export const updateEvent = async (formData) => {
  try {
    const tokenData = JSON.parse(sessionStorage.getItem('AccessToken'));

    if (!tokenData || !tokenData.access_token) {
      throw new Error('Access token is missing or expired');
    }

    // Set up the Authorization header with the Bearer token
    const eventId = formData.get('id');  // Get eventId from the formData
    const url = `${REACT_APP_API_URL}/api/v1/events/update/${eventId}`;  // Corrected URL structure

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
      throw new Error(errorData.message || 'Failed to update event.');
    }

    return await response.json();  // Return the JSON response if successful
  } catch (error) {
    throw new Error(error.message || 'An unexpected error occurred.');
  }
};
