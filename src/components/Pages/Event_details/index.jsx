import React, { useState, useEffect } from 'react';
import { Layout, Card, Typography, Button, Row, Col, Divider, Modal, notification, InputNumber, Table } from 'antd';
import { CalendarFilled, EnvironmentFilled, DollarCircleFilled, DeleteOutlined } from '@ant-design/icons';
import integer5 from '../../../assets/geticket_images/event/social_harmony.png';
import './event_details.css';
import { fetchEventById } from '../../../utils/geticket_api_helper/events';  // Import the helper
import { getEventImage } from '../../../utils/geticket_api_helper/static';  // Import the image fetching helper
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams
import { fetchEventPackages } from '../../../utils/geticket_api_helper/packages';
import { buyTicket } from '../../../utils/geticket_api_helper/tickets';

const { Content } = Layout;
const { Title, Text } = Typography;

const EventDetail = () => {
  const { eventId } = useParams();  // Get eventId from URL
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(''); // For selected image in the modal
  const [eventData, setEventData] = useState(null);
  const [eventPackages, setEventPackages] = useState(null);  // Store event data in state
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    getEvent();
    getPackages();
  }, [eventId]);  // Fetch data again if eventId changes

  const handleBuy = async (data) => {
    // if (!window.confirm('Are you sure you want to buy this package?')) return;
    setSelectedPackage(data); // Set the selected package
    showModal(); // Show the confirmation modal
  };
  const getEvent = async () => {
    try {
      setLoading(true);
      const data = await fetchEventById(eventId);  // Fetch event by ID
      setEventData(data);  // Update state with event data

      // Fetch image for the event
      const imageURL = await getEventImage(data.gambar);  // Fetch image
      setSelectedImage(imageURL);  // Update selected image for display

      setLoading(false);
    } catch (error) {
      setLoading(false);
      notification.error({
        message: 'Error',
        description: error.message,
      });
    }
  };

  const getPackages = async () => {
    try {
      setLoading(true);
      const data = await fetchEventPackages(eventId);  // Fetch event by ID
      setEventPackages(data);  // Update state with event data
    } catch (error) {
      notification.error({
        message: 'Error fetching packages',
        description: error.message,
      });
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (!selectedPackage) return; // Ensure there's a selected package

    try {
      const formData = new FormData();
      formData.append('package_id', selectedPackage);
      formData.append('quantity', quantity);
      await buyTicket(formData, eventId);
      notification.success({
        message: 'Purchase Successful',
      });
      navigate('/dashboard');
    } catch (error) {
      notification.error({
        message: 'Failed to purchase package',
        description: error.message || 'An unexpected error occurred.',
      });
    } finally {
      setIsModalOpen(false); // Close the modal
      setQuantity(1); // Reset quantity
      setSelectedPackage(null); // Clear selected package
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleQuantityChange = (value) => {
    setQuantity(value);
  };

  const showImageModal = (image) => {
    setSelectedImage(image);
    setIsImageModalOpen(true);
  };

  if (loading) {
    return <div>Loading...</div>;  // Show loading indicator
  }

  if (!eventData) {
    return <div>Event not found.</div>;  // Show error message if event data is not found
  }

  return (
    <Content className="layout-content">
      <Card className="event-card">
        <Row gutter={[24, 0]}>
          <Col xs={24} md={12}>
            <img
              src={selectedImage}
              alt="Event"
              className="event-image"
              style={{ width: '100%', borderRadius: '7px', objectFit: 'cover', height: '600px' }}
              onClick={() => showImageModal(selectedImage)}
            />
          </Col>

          <Col xs={24} md={12}>
            <Title level={2} className="event-title"
              style={{ fontWeight: "bold", fontSize: "32px", color: "#2c3e50" }}
            > {eventData.nama}</Title>
            <Text type="secondary" style={{ fontWeight: "bold", fontSize: "18px", color: "#7f8c8d", lineHeight: "1.6" }}
            >{eventData.deskripsi}</Text>
            <Divider />

            <Title level={2} className="event-title"
              style={{ fontWeight: "bold", fontSize: "32px", color: "#2c3e50" }}>
              <CalendarFilled style={{ marginRight: 8 }} />
              Date
            </Title>
            <Text style={{ fontWeight: "bold", fontSize: "18px", lineHeight: "1.6" }}>{eventData.tanggal}</Text>
            <Divider />

            <Title level={2} className="event-title"
              style={{ fontWeight: "bold", fontSize: "32px", color: "#2c3e50" }}>
              <EnvironmentFilled style={{ marginRight: 8 }} />
              Location
            </Title>
            <Text style={{ fontWeight: "bold", fontSize: "18px", lineHeight: "1.6" }}>{eventData.lokasi}</Text>
            <Divider />

            <Table
              columns={[
                { title: 'Ticket Type', dataIndex: 'ticketType', key: 'ticketType' },
                { title: 'Price', dataIndex: 'price', key: 'price' },
                { title: 'Qty per User', dataIndex: 'qtyPerUser', key: 'qtyPerUser' },
                {
                  title: 'Qty Sold',
                  dataIndex: 'qtySold',
                  key: 'qtySold',
                  render: (qtySold) =>
                    qtySold > 0 ? qtySold : (
                      <Text type="secondary" style={{ fontWeight: "bold" }}>
                        Sold Out
                      </Text>
                    ),
                },
                {
                  title: 'Actions',
                  key: 'actions',
                  render: (_, record) => (
                    <Button
                      type="primary"
                      onClick={() => handleBuy(record.key)}
                      disabled={record.qtySold === 0}
                    >
                      Buy
                    </Button>
                  ),
                },
              ]}
              dataSource={eventPackages?.data.packages?.map((pkg) => ({
                ticketType: pkg.name,
                price: pkg.price,
                qtyPerUser: pkg.tickets_per_package,
                qtySold: pkg.total_tickets_available,
                key: pkg.id,
              })) || []}
              pagination={false}
              rowKey={(record) => record.key}
              loading={loading}
            />
          </Col>
        </Row>
      </Card>

      <Modal
        title="Confirm Purchase"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className="purchase-modal"
      >
        <p>Are you sure you want to buy {quantity} ticket(s) for this package?</p>
      </Modal>

      <Modal
        visible={isImageModalOpen}
        onCancel={() => setIsImageModalOpen(false)}
        footer={null}
        centered
        className="image-modal"
      >
        <img
          src={selectedImage}
          alt="Event"
          style={{ width: '100%', borderRadius: '8px' }}
        />
      </Modal>
    </Content>
  );
};

export default EventDetail;