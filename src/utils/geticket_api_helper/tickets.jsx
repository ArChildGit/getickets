import axios from 'axios';

const REACT_APP_API_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const fetchCustomer = async (page = 1, perPage = 10, search = '', status = '', eventId) => {
  try {
    const response = await axios.get(`${REACT_APP_API_URL}/api/v1/tickets/tickets/${eventId}?page=${page}&per_page=${perPage}&search=${search}&status=${status}`);
    return response;  // Return the event data from the response
  } catch (error) {
    console.error("Error fetching event:", error);
    throw new Error(error.response?.data.message || "An error occurred while fetching event data.");
  }
};

export const fetchMyTicket = async (page = 1, perPage = 10, search = '', status = '') => {
  try {
    const tokenData = JSON.parse(sessionStorage.getItem('AccessToken'));

    if (!tokenData || !tokenData.access_token) {
      throw new Error('Access token is missing or expired');
    }

    const url = `${REACT_APP_API_URL}/api/v1/tickets/user_tickets?page=${page}&per_page=${perPage}&search=${search}&status=${status}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,  // Include the Authorization header here
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to buy Tickets.');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching event:", error);
    throw new Error(error.response?.data.message || "An error occurred while fetching event data.");
  }
};

export const buyTicket = async (formData, eventId) => {
  try {
    const tokenData = JSON.parse(sessionStorage.getItem('AccessToken'));

    if (!tokenData || !tokenData.access_token) {
      throw new Error('Access token is missing or expired');
    }

    const url = `${REACT_APP_API_URL}/api/v1/tickets/buy-ticket/${eventId}`;

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,  // Include the Authorization header here
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to buy Tickets.');
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'An unexpected error occurred.');
  }
};

export const sendTicket = async (ticket_id, new_user_id) => {
  try {
    const tokenData = JSON.parse(sessionStorage.getItem('AccessToken'));

    if (!tokenData || !tokenData.access_token) {
      throw new Error('Access token is missing or expired');
    }

    const url = `${REACT_APP_API_URL}/api/v1/tickets/transfer_ticket`;

    const formData = new FormData();
    formData.append("ticket_id", ticket_id);
    formData.append("new_user_id", new_user_id);

    const response = await fetch(url, {
      method: 'POST',
      body: formData,  // Kirim dalam bentuk FormData
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`, // Header Authorization tetap ada
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to transfer ticket.');
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'An unexpected error occurred.');
  }
};

export const validateTicket = async (ticket_id) => {
  try {
    const tokenData = JSON.parse(sessionStorage.getItem('AccessToken'));

    if (!tokenData || !tokenData.access_token) {
      throw new Error('Access token is missing or expired');
    }

    const url = `${REACT_APP_API_URL}/api/v1/tickets/validate-ticket`;

    const formData = new FormData();
    formData.append("ticket_id", ticket_id);

    const response = await fetch(url, {
      method: 'POST',
      body: formData,  // Kirim dalam bentuk FormData
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`, // Header Authorization tetap ada
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to validate ticket.');
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'An unexpected error occurred.');
  }
};

export const deleteTicket = async (ticket_id) => {
  try {
    const tokenData = JSON.parse(sessionStorage.getItem('AccessToken'));

    if (!tokenData || !tokenData.access_token) {
      throw new Error('Access token is missing or expired');
    }

    const url = `${REACT_APP_API_URL}/api/v1/tickets/delete_ticket`;

    const formData = new FormData();
    formData.append("ticket_id", ticket_id);

    const response = await fetch(url, {
      method: 'DELETE',
      body: formData,  // Kirim dalam bentuk FormData
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`, // Header Authorization tetap ada
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to transfer ticket.');
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'An unexpected error occurred.');
  }
};