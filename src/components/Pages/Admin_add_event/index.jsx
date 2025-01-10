import React, { useState } from 'react';
import { Layout, Typography, Button, Row, Col, Divider, Modal, notification, Input, Card, DatePicker } from 'antd';
import moment from 'moment';
import { postEvent } from '../../../utils/geticket_api_helper/events';
import { useNavigate } from 'react-router-dom';
import './admin_add_event.css';

const { Title } = Typography;

const AddEventForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageChanged, setImageChanged] = useState(null);
  const [eventData, setEventData] = useState({
    nama: '',
    deskripsi: '',
    tanggal: '',
    lokasi: '',
    imageUrl: '',
  });
  const [dateError, setDateError] = useState(false);
  const navigate = useNavigate();

  const showModal = () => setIsModalOpen(true);

  const handleAddEvent = async () => {
    if (!eventData.tanggal) {
      notification.error({
        message: 'Invalid date',
        description: 'Please select a valid date.',
      });
      setDateError(true);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('nama', eventData.nama);
      formData.append('deskripsi', eventData.deskripsi);
      formData.append('tanggal', eventData.tanggal);
      formData.append('lokasi', eventData.lokasi);

      if (imageChanged) {
        formData.append('gambar', imageChanged);
      }

      const response = await postEvent(formData);

      if (response) {
        notification.success({
          message: 'Event added successfully.',
          description: `Event "${eventData.nama}" has been added.`,
        });
        resetForm();
        navigate('/admin-event-list', { replace: true });
      } else {
        throw new Error(response?.message || 'Failed to add event.');
      }
    } catch (error) {
      notification.error({
        message: 'Failed to add event.',
        description: error.message || 'Error occurred',
      });
    } finally {
      setIsModalOpen(false);
    }
  };

  const resetForm = () => {
    setEventData({ nama: '', deskripsi: '', tanggal: '', lokasi: '', imageUrl: '' });
    setImageChanged(null);
    setDateError(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setEventData((prevData) => ({ ...prevData, imageUrl: event.target.result }));
      };
      reader.readAsDataURL(file);
      setImageChanged(file);
    }
  };

  return (
    <div className="layout-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card style={{marginTop : '60px', marginBottom : '50px', width: '80%', maxWidth: '1000px' }} >
        <Row gutter={[24, 0]} justify="center">
          {/* Left - Image Section */}
          <Col xs={24} md={12} className="image-container">
            <img
              src={eventData.imageUrl || 'https://via.placeholder.com/300'}
              alt="Event"
              className="event-image"
              style={{ width: '100%', borderRadius: '15px', objectFit: 'cover', height: '480px' }}
            />
            <div className="image-upload">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="image-input"
              />
            </div>
          </Col>

          {/* Right - Form Section */}
          <Col xs={24} md={12}>
            <Title level={4}>Event Name</Title>
            <Input
              placeholder="Enter name"
              value={eventData.nama}
              onChange={(e) => setEventData({ ...eventData, nama: e.target.value })}
            />
            <Divider />
            <Title level={4}>Description</Title>
            <Input.TextArea
              placeholder="Enter description"
              value={eventData.deskripsi}
              onChange={(e) => setEventData({ ...eventData, deskripsi: e.target.value })}
            />
            <Divider />
            <Title level={4}>Date</Title>
            <DatePicker
              value={eventData.tanggal ? moment(eventData.tanggal) : null}
              onChange={(date, dateString) => {
                setEventData({ ...eventData, tanggal: dateString });
                setDateError(false);
              }}
              style={{ marginBottom: '16px', width: '100%', borderColor: dateError ? 'red' : undefined }}
              format="YYYY-MM-DD"
            />
            <Divider />
            <Title level={4}>Location</Title>
            <Input
              placeholder="Enter location"
              value={eventData.lokasi}
              onChange={(e) => setEventData({ ...eventData, lokasi: e.target.value })}
            />
            <Divider />
            <Button
              type="primary"
              block
              size="large"
              onClick={showModal}
              className="add-button"
            >
              Add Event
            </Button>
          </Col>
        </Row>

        {/* Confirmation Modal */}
        <Modal
          title="Confirmation"
          visible={isModalOpen}
          onOk={handleAddEvent}
          onCancel={() => setIsModalOpen(false)}
        >
          <p>Are you sure you want to add this event?</p>
        </Modal>
      </Card>
    </div>
  );
};

export default AddEventForm;
