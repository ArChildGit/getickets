import React, { useState } from 'react';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { loginUser, getUserProfile } from '../../../utils/geticket_api_helper/auth'; // Sesuaikan dengan path API login

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi form
    const { username, password } = formData;
    if (!username || !password) {
      message.error('Username dan Password wajib diisi');
      return;
    }

    try {
      // Kirim data login ke API
      const response = await loginUser({ username, password });

      if (response?.access_token) {
        // Simpan JWT token di sessionStorage
        sessionStorage.setItem('AccessToken', JSON.stringify({
          access_token: response.access_token,
          expires_in: response.expires_in,
          type: response.type,
        }));

        message.success('Login berhasil');

        // Ambil data profil pengguna setelah login berhasil
        const userProfile = await getUserProfile();

        // Simpan profil pengguna di sessionStorage
        sessionStorage.setItem('UserProfile', JSON.stringify(userProfile.user)); // Assuming 'user' is the key in the response

        console.log('User Profile:', userProfile); // Menampilkan data profil pengguna

        // Redirect ke halaman setelah login berhasil
        navigate('/dashboard'); // Ubah ini sesuai dengan route tujuan setelah login
      } else {
        message.error('Login gagal');
      }
    } catch (error) {
      // Tangani error
      const errorMessage = error?.msg || error.message || 'Login gagal';
      message.error(errorMessage);
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <p className="text-center text-gray-600 mb-6">Masuk ke akun Anda</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Masukkan username"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Masukkan password"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
            >
              MASUK
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Belum punya akun?{' '}
            <a href="/register" className="text-blue-600 hover:underline">
              Daftar
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
