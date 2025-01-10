import React, { useState, useEffect } from 'react';
import { Layout, Card, Avatar, Typography, Divider, Button, Input, notification } from 'antd';
import { getUserProfile, updateUserProfile } from '../../../utils/geticket_api_helper/auth';
import { getUserImage } from '../../../utils/geticket_api_helper/static';
import integer5 from '../../../assets/geticket_images/konser.png';
import './Profile.css';

const { Content } = Layout;
const { Title, Text } = Typography;

const UserProfile = () => {
  const [userData, setUserData] = useState();
  const [selectedImage, setSelectedImage] = useState('');
  const [imageChanged, setImageChanged] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      setLoading(true);
      const response = await getUserProfile();
      const user = response.user;
      setUserData(user);

      const imageURL = user.foto_user ? await getUserImage(user.foto_user) : integer5;
      setSelectedImage(imageURL);
      
      setLoading(false);
    } catch (error) {
      setLoading(false);
      notification.error({
        message: 'Error',
        description: error.message || 'Failed to load user profile.',
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setSelectedImage(reader.result);
      reader.readAsDataURL(file);
      setImageChanged(file);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const formData = new FormData();
      formData.append('nama', userData?.nama);
      formData.append('nomor_telepon', userData?.nomor_telepon);
      if (imageChanged) formData.append('foto_user', imageChanged);

      const response = await updateUserProfile(formData);
      if (response) {
        notification.success({
          message: 'Data Updated Successfully',
          description: 'Profil pengguna berhasil diperbaharui.',
        });
        setImageChanged(null);
      }
    } catch (error) {
      notification.error({
        message: 'Update Failed',
        description: error.message || 'An unexpected error occurred.',
      });
    }
  };

  return (
    <Content className="profile-layout">
      <div className="content-wrapper">
        {/* Profile Card */}
        <Card className="profile-card">
          <Avatar size={120} src={selectedImage} className="profile-avatar" />
          <div className="image-upload-container">
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
          <Divider />
          <div className="profile-input-group">
            <InputField 
              label="Nama" 
              value={userData?.nama} 
              onChange={(e) => setUserData({ ...userData, nama: e.target.value })} 
            />
            <InputField 
              label="Nomor Telepon" 
              value={userData?.nomor_telepon} 
              onChange={(e) => setUserData({ ...userData, nomor_telepon: e.target.value })} 
            />
          </div>
          <Button type="primary" onClick={handleSaveChanges} className="save-button">
            Save Changes
          </Button>
        </Card>

        {/* Personal Information Card */}
        <Card className="info-card">
          <Title level={4}>Informasi Pribadi</Title>
          <Divider />
          <div className="info-input-group">
            <InfoRow label="Email" value={userData?.email} />
            <InfoRow label="ID Pengguna" value={userData?.id} />
            <InfoRow label="Username" value={userData?.username} />
          </div>
        </Card>
      </div>
    </Content>
  );
};

// Input Field component
const InputField = ({ label, value, onChange }) => (
  <div className="input-row">
    <Title level={5}>{label}</Title>
    <Input value={value} onChange={onChange} />
  </div>
);

// Info Row component
const InfoRow = ({ label, value }) => (
  <div className="info-row">
    <Text strong>{label}:</Text>
    <Input value={value} disabled />
  </div>
);

export default UserProfile;
