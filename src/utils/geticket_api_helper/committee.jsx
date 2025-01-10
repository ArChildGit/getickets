import axios from 'axios';

const REACT_APP_API_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const fetchMyCommittee = async () => {
  try {
    const tokenData = JSON.parse(sessionStorage.getItem('AccessToken'));

    if (!tokenData || !tokenData.access_token) {
      throw new Error('Access token is missing or expired');
    }

    const url = `${REACT_APP_API_URL}/api/v1/committee/my-committee`;

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
