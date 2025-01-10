import axios from 'axios';

const REACT_APP_API_URL = import.meta.env.VITE_REACT_APP_API_URL;

// Helper untuk mengambil URL gambar berdasarkan nama file gambar
export const getEventImage = async (imageName) => {
  try {
    const response = await axios.get(`${REACT_APP_API_URL}/static/events/${imageName}`, {
      responseType: 'blob', // Agar gambar dikembalikan dalam bentuk file
    });

    // Mengonversi Blob menjadi URL yang dapat digunakan di <img src="">
    const imageURL = URL.createObjectURL(response.data);
    return imageURL;
  } catch (error) {
    console.error('Error fetching event image:', error);
    return null; // Kembalikan null jika terjadi kesalahan
  }
};

export const getUserImage = async (imageName) => {
  try {
    const response = await axios.get(`${REACT_APP_API_URL}/static/profile/${imageName}`, {
      responseType: 'blob', // Agar gambar dikembalikan dalam bentuk file
    });

    // Mengonversi Blob menjadi URL yang dapat digunakan di <img src="">
    const imageURL = URL.createObjectURL(response.data);
    return imageURL;
  } catch (error) {
    console.error('Error fetching event image:', error);
    return null; // Kembalikan null jika terjadi kesalahan
  }
};
