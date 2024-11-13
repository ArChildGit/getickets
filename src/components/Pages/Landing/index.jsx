import React from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Row, Col, Card, Button, Typography } from 'antd';
import mascotImage from '../../../assets/geticket_images/gavent.png';
import backgroundImage from '../../../assets/geticket_images/konser.png';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const LandingPage = () => {
  return (
    <Layout className="font-sans min-h-screen bg-gray-50">
      <Content>

        {/* Hero Section */}
        <section
          style={{
            color: 'white',
            padding: '90px 0',
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh', // Ensures the section takes at least the full height of the screen
            position: 'relative', // Necessary for absolute positioning of the overlay
          }}
        >
          {/* Overlay Rectangle */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.6)', // Black overlay with 40% opacity
              zIndex: 1, // Ensures it's above the background image but below the text
            }}
          />

          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center text-center md:text-left space-y-6 md:space-y-0 md:space-x-10" style={{ position: 'relative', zIndex: 2 }}>
            {/* Text Content */}
            <div>
              <Title level={1} style={{ color: 'white' }}>Welcome to Your Event Platform</Title>
              <Paragraph style={{ fontSize: '26px', color: 'white' }}>
                Discover amazing events, get your tickets instantly, and stay updated with real-time QR code access.
              </Paragraph>
              <NavLink to="/login">
                <Button
                  size='large'
                  type="primary"
                  style={{
                    backgroundColor: '#ffffff',
                    color: '#3f51b5',
                    borderRadius: '999px',
                    fontWeight: 'bold',
                    marginTop: '20px',
                  }}
                >
                  Get Started
                </Button>
              </NavLink>
            </div>

            {/* Mascot Image */}
            <img
              src={mascotImage}
              alt="Mascot"
              style={{
                width: '600px',
                height: '500px',
                objectFit: 'contain', // Ensures the image fits well in the space
              }}
            />
          </div>
        </section>

        {/* Features Section */}
        <section id="features" style={{ backgroundColor: '#f5f5f5', padding: '60px 0' }}>
          <div className="max-w-5xl mx-auto text-center">
            <Title level={3} style={{ color: '#3f51b5' }}>Features</Title>
            <Row gutter={16} justify="center" style={{ marginTop: '40px' }}>
              <Col xs={24} sm={12} md={8}>
                <Card
                  title={event.name}
                  cover={<img alt={event.name} src={event.image} style={{ height: '500px', objectFit: 'cover' }} />}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-evenly', height: '100%' }}>
                    <div style={{ textAlign: 'center', fontWeight: 'bold', height: '100%' }}>
                    </div>
                    <p style={{ flex: 1, marginLeft: '10px' }}>{event.description}</p>
                  </div>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Card
                  title={event.name}
                  cover={<img alt={event.name} src={event.image} style={{ height: '500px', objectFit: 'cover' }} />}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-evenly', height: '100%' }}>
                    <div style={{ textAlign: 'center', fontWeight: 'bold', height: '100%' }}>
                    </div>
                    <p style={{ flex: 1, marginLeft: '10px' }}>{event.description}</p>
                  </div>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Card
                  title={event.name}
                  cover={<img alt={event.name} src={event.image} style={{ height: '500px', objectFit: 'cover' }} />}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-evenly', height: '100%' }}>
                    <div style={{ textAlign: 'center', fontWeight: 'bold', height: '100%' }}>
                    </div>
                    <p style={{ flex: 1, marginLeft: '10px' }}>{event.description}</p>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" style={{ backgroundColor: '#3f51b5', color: 'white', padding: '60px 0' }}>
          <div className="max-w-5xl mx-auto text-center">
            <Title level={3}>Contact Us</Title>
            <Paragraph>For more information, reach out to our team.</Paragraph>
            <Button
              size="large"
              type="primary"
              style={{
                backgroundColor: '#ffc107',
                color: '#3f51b5',
                borderRadius: '999px',
                fontWeight: 'bold',
                marginTop: '20px',
              }}
            >
              Contact Support
            </Button>
          </div>
        </section>

      </Content>
    </Layout>
  );
};

export default LandingPage;
