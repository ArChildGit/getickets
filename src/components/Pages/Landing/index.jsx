import React from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Row, Col, Card, Button, Typography } from 'antd';
import mascotImage from '../../../assets/geticket_images/gavent.png';
import backgroundImage from '../../../assets/geticket_images/bg-login.png';
import secondaryBackgroundImage from '../../../assets/geticket_images/secondaryBG.png';
import { motion } from 'framer-motion';
import qrCode from '../../../assets/geticket_images/qrCode.png';
import jabaTangan from '../../../assets/geticket_images/jabaTangan.png';
import greenIT from '../../../assets/geticket_images/greenIT.png';

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
            minHeight: '100vh',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              zIndex: 1,
            }}
          />

          <div
            className="max-w-5xl mx-auto flex flex-col md:flex-row items-center text-center md:text-left space-y-6 md:space-y-0 md:space-x-10"
            style={{ position: 'relative', zIndex: 2 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <Title level={1} style={{ color: 'white' }}>Welcome to Ganesha E-Ticket</Title>
              <Paragraph style={{ fontSize: '26px', color: 'white' }}>
                Discover amazing events, get your tickets instantly, and stay updated with real-time QR code access.
              </Paragraph>

              <NavLink to="/login">
                <Button
                  size="large"
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
            </motion.div>

            <motion.img
              src={mascotImage}
              alt="Mascot"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{
                width: '600px',
                height: '500px',
                objectFit: 'contain',
              }}
            />
          </div>
        </section>

        {/* Features Section */}
        <section id="features" style={{
          color: 'white',
          padding: '90px 0',
          backgroundImage: `url(${secondaryBackgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '50vh',
          position: 'relative',
        }}>
          <div className="max-w-5xl mx-auto text-center">
            <Title level={1} style={{ color: '#3f51b5' }}>Features</Title>
            <Row gutter={16} justify="center" style={{ marginTop: '40px' }}>
              <Col xs={24} sm={12} md={8}>
                <Card
                  title={'Scan Cepat Lewat QR!'}
                  cover={<img alt={'Foto QR'} src={qrCode} style={{ height: '400px', objectFit: 'cover' }} />}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-evenly', height: '100%' }}>
                    <div style={{ textAlign: 'center', fontWeight: 'bold', height: '100%' }}>
                      <p style={{ flex: 1, marginLeft: '10px' }}>{'Scan cepat lewat QR! Tak perlu khswatirkan antrian yang panjang'}</p>
                    </div>
                  </div>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Card
                  title={'Keamanan Data'}
                  cover={<img alt={'Foto Keamanan Data'} src={jabaTangan} style={{ height: '400px', objectFit: 'cover' }} />}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-evenly', height: '100%' }}>
                    <div style={{ textAlign: 'center', fontWeight: 'bold', height: '100%' }}>
                      <p style={{ flex: 1, marginLeft: '10px' }}>{'Data aman bersama kami dengan proteksi yang ketat dan operator yang terpercaya'}</p>
                    </div>
                  </div>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Card
                  title={'Ramah Lingkungan'}
                  cover={<img alt={'Green IT'} src={greenIT} style={{ height: '400px', objectFit: 'cover' }} />}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-evenly', height: '100%' }}>
                    <div style={{ textAlign: 'center', fontWeight: 'bold', height: '100%' }}>
                      <p style={{ flex: 1, marginLeft: '10px' }}>{'Digitalisasi tiket. Ramah lingkungan. Perangi Plastik!'}</p>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        </section>

        {/* Contact Section */}
        <section
          style={{
            color: 'white',
            padding: '20px 0',
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '10vh',
            position: 'relative',
          }}
        >
          {/* Overlay dipindahkan ke div background */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.6)', // Overlay hitam semi-transparan
              zIndex: 0, // Pastikan overlay berada di bawah teks
            }}
          />

          <div
            className="max-w-5xl mx-auto text-center"
            style={{
              position: 'relative', // Pastikan teks berada di atas overlay
              zIndex: 2, // Teks di atas overlay
            }}
          >
            <Title level={3} style={{ color: 'white' }}>Contact Us</Title>
            <Paragraph style={{ color: 'white' }}>
              Our Call Center : 081239747166
            </Paragraph>
          </div>
        </section>

      </Content>
    </Layout>
  );
};

export default LandingPage;