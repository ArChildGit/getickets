import React, { useState } from 'react';
import { registerUser } from '../../../utils/geticket_api_helper/auth'; // Sesuaikan path import
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import bgLogin from '../../../assets/geticket_images/bg-login.png';
import iconGETicket from '../../../assets/geticket_images/gavent.png';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [errors, setErrors] = useState({
    nama: false,
    username: false,
    email: false,
    phone: false,
    password: false,
    confirmPassword: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: false,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png'];
      const maxSize = 2 * 1024 * 1024;

      if (!allowedTypes.includes(file.type)) {
        message.error('Hanya file JPG dan PNG yang diperbolehkan');
        return;
      }

      if (file.size > maxSize) {
        message.error('Ukuran file maksimal 2MB');
        return;
      }

      setProfilePicture(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nama, username, email, phone, password, confirmPassword } = formData;
    const newErrors = {
      nama: !nama,
      username: !username,
      email: !email,
      phone: !phone,
      password: !password,
      confirmPassword: !confirmPassword || confirmPassword !== password,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).includes(true)) {
      message.error('Semua field wajib diisi dengan benar');
      return;
    }

    const submitData = new FormData();
    submitData.append('nama', nama);
    submitData.append('username', username);
    submitData.append('email', email);
    submitData.append('nomor_telepon', phone);
    submitData.append('password', password);

    if (profilePicture) {
      submitData.append('foto_user', profilePicture, profilePicture.name);
    }

    try {
      const response = await registerUser(submitData);
      message.success(response.message || 'Registrasi berhasil');
      navigate('/login');
    } catch (error) {
      const errorMessage = error.msg || error.message || 'Registrasi gagal';
      message.error(errorMessage);
      console.error('Registration error:', error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-50 py-8"
      style={{
        backgroundImage: `url(${bgLogin})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="flex max-w-6xl bg-transparant rounded-xl shadow-lg shadow-blue-900 ">
        {/* Left Section */}
        <div
          className="w-1/2 text-white p-10  rounded-l-xl flex flex-col justify-end items-center bg-gradient-to-b from-black to-blue-500"
        >
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="flex items-center space-x-1">
              <img
                src={iconGETicket} 
                alt="Logo GETicket"
                className="w-6 h-6"
              />
              <h1 className="text-sm font-bold">GETicket</h1>
            </div>
            <h2 className="text-lg font-black">Mulai Bergabung Bersama Kami</h2>
            <p className="text-xs font-normal text-slate-300">Ikuti langkah mudah ini untuk menggunakan GETicket!</p>
            <br></br>

            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-4 bg-blue-100 p-3 rounded-lg shadow-lg shadow-blue-900 text-blue-950">
                <span className="px-3 py-1 font-normal text-sm">
                  1.
                </span>
                <span className="text-sm">Registrasi dan Login ke akun Anda</span>
              </div>

              <div className="flex items-center space-x-4 bg-indigo-950 p-2 rounded-lg">
                <span className="px-3 py-1 font-normal text-sm">
                  2.
                </span>
                <span className="text-sm">Cari dan pilih acara</span>
              </div>

              <div className="flex items-center space-x-4 bg-indigo-950 p-2 rounded-lg">
                <span className="px-3 py-1 font-normal text-sm">
                  3.
                </span>
                <span className="text-sm">Pesan dan bayar tiket Anda</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-1/2 bg-slate-300 p-6 rounded-r-xl shadow-2xl shadow-indigo-950">
          <h2 className="text-3xl font-black text-gray-800 mb-2 text-center">Registrasi</h2>
          <p className="text-gray-600 mb-5 text-sm text-center">Buat akun baru untuk mengakses GETicket!</p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Left side inputs */}
              <div className="col-span-1">
                <label htmlFor="nama" className="block text-sm font-medium text-gray-700">
                  <span className="text-red-500">*</span>Nama Lengkap
                </label>
                <input
                  type="text"
                  id="nama"
                  name="nama"
                  required
                  className={`mt-1 text-xs block w-full px-3 py-2 border rounded-md shadow-sm ${errors.nama ? 'border-red-500' : 'border-gray-300'}`}
                  value={formData.nama}
                  onChange={handleInputChange}
                  placeholder="Masukkan nama lengkap"
                />
              </div>

              <div className="col-span-1">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  <span className="text-red-500">*</span>Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  className={`mt-1 text-xs block w-full px-3 py-2 border rounded-md shadow-sm ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Pilih username"
                />
              </div>

              <div className="col-span-1">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  <span className="text-red-500">*</span>Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className={`mt-1 text-xs block w-full px-3 py-2 border rounded-md shadow-sm ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Masukkan email"
                />
              </div>

              <div className="col-span-1">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  <span className="text-red-500">*</span>Nomor Telepon
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  pattern="[0-9]+"
                  className={`mt-1 text-xs block w-full px-3 py-2 border rounded-md shadow-sm ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Masukkan no. telepon"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Right side inputs */}
              <div className="col-span-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  <span className="text-red-500">*</span>Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  className={`mt-1 text-xs block w-full px-3 py-2 border rounded-md shadow-sm ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Buat password"
                />
              </div>

              <div className="col-span-1">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  <span className="text-red-500">*</span>Konfirmasi Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  className={`mt-1 text-xs block w-full px-3 py-2 border rounded-md shadow-sm ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Konfirmasi password"
                />
              </div>
            </div>
            <div className="col-span-1">
              <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">
                Foto Profil (Opsional)
              </label>
              <input
                type="file"
                id="profilePicture"
                name="profilePicture"
                accept=".jpg,.jpeg,.png"
                className="mt-1 block w-full text-xs text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-xs file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
                onChange={handleFileChange}
                style={{ width: '100%' }}
              />
              {profilePicture && (
                <p className="mt-2 text-xs text-gray-500">
                  File terpilih: {profilePicture.name}
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="w-full text-sm py-2 px-4 bg-blue-950 text-white font-semibold rounded-md hover:bg-blue-500 transition duration-300"
              >
                DAFTAR
              </button>
            </div>
          </form>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Sudah punya akun?{' '}
              <a href="/login" className="text-blue-600 hover:underline">
                Masuk
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
