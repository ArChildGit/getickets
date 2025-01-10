import React, { useState } from 'react';
import { Layout, Card, Row, Col, Avatar, Typography, Divider, Button, Input, notification, Upload } from 'antd';
import { EditOutlined, CheckOutlined, UploadOutlined } from '@ant-design/icons';
import './profile.css';
import febeAva from '../../../assets/geticket_images/profile/avatarFebe.jpeg';

const { Title, Text } = Typography;

const UserProfile = () => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);

  const [profileData, setProfileData] = useState({
    name: 'Febe Amalindah',
    userId: '12345',
    avatar: febeAva,
  });

  const [personalInfoData, setPersonalInfoData] = useState({
    NamaLengkap: 'Febe Amalindah Grace Padadi',
    Alamat: 'Jl.Sudirman',
    Email: 'febe@studentundiksha.ac.id',
    Nomortelepon: '085346808204',
    Status: 'Mahasiswa',
    Prodi: 'Sistem Informasi',
  });

  // Handlers for Profile Section
  const handleProfileEdit = () => setIsEditingProfile(true);

  const handleProfileSave = () => {
    setIsEditingProfile(false);
    notification.success({
      message: 'Update Profil',
      description: 'Profil Anda BERHASIL di update.',
    });
  };

  const handleProfileChange = (field, value) => {
    setProfileData({ ...profileData, [field]: value });
  };

  const handleAvatarChange = ({ file }) => {
    if (file.status !== 'uploading' && file.originFileObj) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData((prevData) => ({
          ...prevData,
          avatar: e.target.result,
        }));
      };
      reader.readAsDataURL(file.originFileObj);
    }
  };

  // Handlers for Personal Information Section
  const handlePersonalInfoEdit = () => setIsEditingPersonalInfo(true);

  const handlePersonalInfoSave = () => {
    setIsEditingPersonalInfo(false);
    notification.success({
      message: 'Update Informasi Pribadi',
      description: 'Informasi Pribadi Anda BERHASIL di update.',
    });
  };

  const handlePersonalInfoChange = (field, value) => {
    setPersonalInfoData({ ...personalInfoData, [field]: value });
  };

  return (
    <Layout className="user-profile-layout">
      {/* Header Cover */}
      <div className="header-cover">
        <div className="cover-overlay" />
      </div>

      <div className="content-wrapper">
        <Row gutter={16}>
          {/* Profile Section */}
          <Col span={8}>
            <Card
              title={<Title level={4}>Profil Saya</Title>}
              className="user-profile-card profile-section"
            >
              <Col>
                <Row style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>  <Avatar size={120} src={profileData.avatar} /></Row>
                <Row style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}> {isEditingProfile && (
                  <Upload
                    showUploadList={false}
                    beforeUpload={() => false}
                    onChange={handleAvatarChange}
                  >
                    <Button icon={<UploadOutlined />} style={{ marginTop: '10px' }}>
                      Pilih Gambar
                    </Button>
                  </Upload>
                )}</Row>
              </Col>
              <Divider />
              {isEditingProfile ? (
                <Input
                  value={profileData.name}
                  onChange={(e) => handleProfileChange('name', e.target.value)}
                  style={{ marginBottom: '8px' }}
                />
              ) : (
                <>
                  <Title level={4}>{profileData.name}</Title>
                  <Text type="secondary">User ID: {profileData.userId}</Text>
                </>
              )}
              <Divider />
              {isEditingProfile ? (
                <Button type="text" icon={<CheckOutlined />} onClick={handleProfileSave}>
                  Save
                </Button>
              ) : (
                <Button
                  type="text"
                  icon={<EditOutlined />}
                  onClick={handleProfileEdit}
                  className="custom-edit-btn"
                >
                  Edit
                </Button>
              )}
            </Card>
          </Col>

          {/* Personal Information Section */}
          <Col span={16}>
            <Card className="user-profile-card">
              <Row gutter={16} align="middle">
                <Col span={4}>
                  <Title level={4}>Informasi Pribadi</Title>
                </Col>
                <Col span={16} />
                <Col span={4} style={{ textAlign: 'right' }}>
                  {isEditingPersonalInfo ? (
                    <Button type="text" icon={<CheckOutlined />} onClick={handlePersonalInfoSave}>
                      Save
                    </Button>
                  ) : (
                    <Button
                      className="custom-edit-btn"
                      type="text"
                      icon={<EditOutlined />}
                      onClick={handlePersonalInfoEdit}
                      style={{
                        color: '#1890ff',
                        fontWeight: 'bold',
                      }}
                    >
                      Edit
                    </Button>
                  )}
                </Col>
              </Row>
              <Divider />
              <Row gutter={[16, 32]} style={{ padding: '20px' }}>
                {Object.entries(personalInfoData).map(([key, value]) => (
                  <Col span={12} key={key} style={{ marginTop: '20px' }}>
                    <Text strong>{key.replace(/([A-Z])/g, ' $1')}:</Text>
                    <br />
                    {isEditingPersonalInfo ? (
                      <Input
                        value={value}
                        onChange={(e) => handlePersonalInfoChange(key, e.target.value)}
                        style={{ marginTop: '8px' }}
                      />
                    ) : (
                      <Text>{value}</Text>
                    )}
                  </Col>
                ))}
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default UserProfile;