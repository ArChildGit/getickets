import axios from 'axios';

const REACT_APP_API_URL = import.meta.env.VITE_REACT_APP_API_URL; // Ambil base URL dari environment variable

export const fetchTicketOwner = async (ticketId) => {
  try {
  
    const url = `${REACT_APP_API_URL}/api/v1/user/ticket-owner/${ticketId}`;

    const response = await fetch(url, {
      method: 'GET',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to buy Tickets.');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching tickets owner", error);
    throw new Error(error.response?.data.message || "An error occurred while fetching event data.");
  }
};