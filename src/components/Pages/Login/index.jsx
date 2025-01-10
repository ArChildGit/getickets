import React, { useState } from 'react';
import { message } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'; // Import ikon dari Ant Design
import { useNavigate } from 'react-router-dom';
import { loginUser, getUserProfile } from '../../../utils/geticket_api_helper/auth'; // Sesuaikan dengan path API login
import bgLogin from '../../../assets/geticket_images/bg-login.png';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false); // State untuk mengatur tipe input password

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev); // Mengubah tipe input password
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = formData;
    if (!username || !password) {
      message.error('Username dan Password wajib diisi');
      return;
    }

    try {
      const response = await loginUser({ username, password });

      if (response?.access_token) {
        sessionStorage.setItem(
          'AccessToken',
          JSON.stringify({
            access_token: response.access_token,
            expires_in: response.expires_in,
            type: response.type,
          })
        );

        message.success('Login berhasil');

        const userProfile = await getUserProfile();

        sessionStorage.setItem('UserProfile', JSON.stringify(userProfile.user));

        navigate('/dashboard');
      } else {
        message.error('Login gagal');
      }
    } catch (error) {
      const errorMessage = error?.msg || error.message || 'Login gagal';
      message.error(errorMessage);
      console.error('Login error:', error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-50"
      style={{
              backgroundImage: `url(${bgLogin})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
    >
      <div className="flex w-full max-w-5xl bg-transparant rounded-xl shadow-lg">
        {/* Left Section */}
        <div className="w-1/2 text-white p-8 flex flex-col justify-center items-center">
          <h2 className="text-7xl font-bold mb-4">Temukan Event Menarik</h2>
          <p className="text-lg mb-8">Pesan tiket sekarang, lebih mudah dan cepat!</p>
        </div>

        {/* Right Section */}
        <div className="w-1/2 m-14 bg-slate-300 p-10 rounded-xl shadow-2xl shadow-indigo-950">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center">Selamat Datang</h2>
          <p className="text-gray-600 mb-8 text-center">Masukkan akun anda untuk melanjutkan.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                required
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Masukkan username"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'} // Mengubah tipe input berdasarkan state
                  id="password"
                  name="password"
                  required
                  className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Masukkan password"
                />
                {formData.password && ( // Kondisi untuk menampilkan ikon hanya jika password terisi
                  <span
                    onClick={toggleShowPassword}
                    className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer text-gray-600"
                  >
                    {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                  </span>
                )}
              </div>
            </div>


            <div>
              <button
                type="submit"
                disabled={!formData.username || !formData.password} 
                className={`w-full py-2 px-4 font-semibold rounded-md transition duration-300 ${!formData.username || !formData.password
                    ? 'bg-slate-100 cursor-not-allowed'
                    : 'bg-blue-950 text-white hover:bg-blue-700'
                  }`}
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
    </div>
  );
};

export default LoginPage;
