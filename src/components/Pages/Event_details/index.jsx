import React, { useState } from 'react';
import { Layout, Card, Typography, Button, Row, Col, Divider, Modal, notification, InputNumber } from 'antd';
import { CalendarFilled, EnvironmentFilled, DollarCircleFilled } from '@ant-design/icons';
import integer5 from '../../../assets/geticket_images/event/social_harmony.png';

const { Content } = Layout;
const { Title, Text } = Typography;

const EventDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const eventData = {
    title: "INTEGER#5: Music Festival",
    description: "Tiket Puncak INTEGER#5 Music Festival telah dibuka yaitu presale 1! Don't miss it! Save the date and sing together with us!",
    price: 40000, 
    date: "Sabtu, 4 November 2023",
    location: "Lapangan Sepak Bola Kampus Tengah, Undiksha, Singaraja-Bali",
    imageUrl: integer5,
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    notification.success({
      message: 'Purchase Successful',
    });
    setIsModalOpen(false);
    setQuantity(1); 
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleQuantityChange = (value) => {
    setQuantity(value);
  };

  return (
    <Content className="layout-content">
      <Row gutter={[24, 0]}>
        <Col xs={22} className="mb-24">
          <Card bordered={false} className="criclebox h-full w-full">
            <Row gutter={[24, 0]}>
              <Col xs={24} md={12}>
                <img
                  src={eventData.imageUrl}
                  alt="Event"
                  style={{ width: '100%', borderRadius: '8px' }}
                />
              </Col>

              <Col xs={24} md={12}>
                <Title level={2}>{eventData.title}</Title>
                <Text type="secondary" style={{ fontSize: '16px' }}>
                  {eventData.description}
                </Text>

                <Divider style={{ margin: '15px 0' }} />

                <Title level={4}>
                  <DollarCircleFilled style={{ marginRight: 8 }} />
                  Price/pcs
                </Title>
                <Text>Rp. {eventData.price.toLocaleString()}</Text> <br />

                <Divider style={{ margin: '15px 0' }} />

                <Title level={4}>
                  <CalendarFilled style={{ marginRight: 8 }} />
                  Date
                </Title>
                <Text>{eventData.date}</Text> <br />

                <Divider style={{ margin: '15px 0' }} />

                <Title level={4}>
                  <EnvironmentFilled style={{ marginRight: 8 }} />
                  Location
                </Title>
                <Text>{eventData.location}</Text>

                <div style={{ marginTop: '30px' }}>
                  <Button type="primary" size="large" block onClick={showModal}>
                    Buy Now
                  </Button>
                </div>
              </Col>
            </Row>
          </Card>

          {/* Confirmation Modal */}
          <Modal
            title="Confirm Purchase"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>Are you sure you want to purchase tickets for {eventData.title}?</p>
            <p>Price per ticket: Rp. {eventData.price.toLocaleString()}</p>
            <p>Date: {eventData.date}</p>
            <Divider />
            <Text strong>Quantity:</Text>
            <InputNumber
              min={1}
              defaultValue={1}
              value={quantity}
              onChange={handleQuantityChange}
              style={{ marginLeft: 10 }}
            />
            <p>Total Price: Rp. {(eventData.price * quantity).toLocaleString()}</p>
          </Modal>
        </Col>
      </Row>
    </Content>
  );
};

export default EventDetail;