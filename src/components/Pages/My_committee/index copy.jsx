import React, { useState, useEffect } from "react";
import {
  Layout,
  List,
  Button,
  Modal,
  notification,
  Input,
  Form,
  Avatar,
  Typography,
  Spin,
  Row,
  Col,
  Card,
  Space,
} from "antd";
import "./my_committee.css"
import { SearchOutlined, SendOutlined, QrcodeOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { fetchMyCommittee } from "../../../utils/geticket_api_helper/committee";
import { quitPanitia } from "../../../utils/geticket_api_helper/panitia";
import { fetchTicketOwner } from "../../../utils/geticket_api_helper/user";
import { getEventImage, getUserImage } from "../../../utils/geticket_api_helper/static";
import { validateTicket } from "../../../utils/geticket_api_helper/tickets";
import QrScanner from "react-qr-scanner";

const { Text, Title } = Typography;

const MyCommittee = () => {
  const [loading, setLoading] = useState(true);
  const [committee, setCommmittee] = useState(null);
  const [visible, setVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [validationModal, setValidationModal] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [ticketOwner, setTicketOwner] = useState(null);
  const [loadingOwner, setLoadingOwner] = useState(false);
  const [errorOwner, setErrorOwner] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [images, setImages] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getMyCommittee();
  }, []);

  useEffect(() => {
    fetchImage();
  }, [ticketOwner]);

  const fetchImage = async () => {
    if (ticketOwner?.photo) {
      const imageUrl = await getUserImage(ticketOwner.photo);
      setUserImage(imageUrl);
    }
  };


  const getMyCommittee = async () => {
    try {
      setLoading(true);
      const data = await fetchMyCommittee();
      setCommmittee(data);

      const imagePromises = data.map(async (events) => {
        const imageURL = await getEventImage(events.image);
        return { id: events.id, imageURL };
      });

      const resolvedImages = await Promise.all(imagePromises);
      const imageMap = resolvedImages.reduce((acc, { id, imageURL }) => {
        acc[id] = imageURL;
        return acc;
      }, {});

      setImages(imageMap);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      notification.error({
        message: "Error",
        description: "Unable to fetch committee data.",
      });
    }
  };

  const handleQuitEvent = async (eventId) => {
    try {
      const response = await quitPanitia(eventId);
      if (response) {
        notification.success({
          message: "Success",
          description: "Successfully quit the event.",
        });
        await getMyCommittee();
      } else {
        throw new Error(response?.message || "Failed to quit event.");
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: error.message || "An error occurred.",
      });
    }
  };

  const handleValidate = async () => {
    try {
      const response = await validateTicket(ticketId);
      if (response?.success) {
        notification.success({
          message: "Validation Successful",
          description: `Ticket ID ${ticketId} validated successfully.`,
        });
      } else {
        throw new Error(response?.message || "Validation failed.");
      }
    } catch (error) {
      notification.error({
        message: "Validation Failed",
        description: error.message || "An error occurred.",
      });
    } finally {
      setTicketOwner(null);
      setValidationModal(false);
      setTicketId("");
    }
  };

  const handleFetchTicketOwner = async () => {
    if (!ticketId) return;
    setLoadingOwner(true);
    setErrorOwner(false);
    try {
      const response = await fetchTicketOwner(ticketId);
      if (response?.success) {
        setTicketOwner(response.data);
      } else {
        setTicketOwner(null);
        setErrorOwner(true);
      }
    } catch (error) {
      setErrorOwner(true);
      setTicketOwner(null);
    } finally {
      setLoadingOwner(false);
    }
  };

  const handleScan = (data) => {
    if (data) {
      setTicketId(data.text);
      setScanning(false);
      handleFetchTicketOwner();
    }
  };

  const handleError = (err) => {
    console.error(err);
    notification.error({
      message: "QR Scan Error",
      description: "Error scanning the QR code.",
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={[16, 16]} justify="space-between" align="middle" style={{ marginBottom: 20 }}>
        <Col span={12}>
          <Input
            placeholder="Search Ticket"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            prefix={<SearchOutlined />}
          />
        </Col>
        <Col>
          <Space>
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={() => setValidationModal(true)}
            >
              Validate Ticket
            </Button>
            <Button
              type="primary"
              icon={<QrcodeOutlined />}
              onClick={() => setScanning(true)}
            >
              Scan QR
            </Button>
          </Space>
        </Col>
      </Row>

      <Title level={4} style={{ marginBottom: 20 }}>
        My Committees
      </Title>

      {loading ? (
        <Spin size="large" style={{ display: "block", margin: "0 auto" }} />
      ) : (
        <List
          grid={{ gutter: 16, column: 3 }}
          dataSource={committee?.events || []}
          renderItem={(events) => {
            return <List.Item>
              <div className="event-grid">
                {committee.map((events) => (
                  <Card
                    key={events.id}
                    hoverable
                    className="event-card"
                    cover={
                      <div className="event-card-image-container">
                        <img
                          alt={events.nama}
                          src={images[events.id] || "default-placeholder.jpg"}
                          className="event-card-image"
                        />
                        <div className="event-card-date">{formatTanggal(events.tanggal)}</div>
                      </div>
                    }
                    actions={[
                      <Button
                        type="primary"
                        onClick={() => handleQuitEvent(events.id)}
                      >
                        Quit
                      </Button>,
                    ]}
                  >
                    <Card.Meta
                      title={<h2 className="event-card-title">{events.name}</h2>}
                      description={
                        <div className="event-card-details">
                          <p><strong>Location:</strong> {events.location}</p>
                          <p><strong>Date:</strong> {events.date}</p>
                          <p><strong>Manager:</strong> {events.event_manager}</p>
                        </div>
                      }
                    />
                  </Card>
                ))}
              </div>
            </List.Item>
          }}
        />
      )}


      <Modal
        title="Validate Ticket"
        visible={validationModal}
        onCancel={() => {
          setValidationModal(false);
          setTicketId("");
          setTicketOwner(null);
          setErrorOwner(false);
        }}
        footer={null}
      >
        <Form layout="vertical">
          <Form.Item label="Ticket ID" required>
            <Input
              value={ticketId}
              onChange={(e) => setTicketId(e.target.value)}
              placeholder="Enter ticket ID"
            />
            <Button
              type="primary"
              onClick={handleFetchTicketOwner}
              disabled={!ticketId}
              style={{ marginTop: 10 }}
            >
              Check Ticket
            </Button>
          </Form.Item>
        </Form>

        {loadingOwner && <Spin style={{ display: "block", marginTop: 20 }} />}
        {errorOwner && <Text type="danger">Ticket not found.</Text>}
        {ticketOwner && (
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <Avatar
              size={64}
              src={userImage || undefined}
              icon={!ticketOwner.photo && <UserOutlined />}
            />
            <div style={{ marginTop: 10 }}>
              <Text strong>{ticketOwner.username}</Text>
              <p>{ticketOwner.name}</p>
              <p>{ticketOwner.phone}</p>
            </div>
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={handleValidate}
              style={{ marginTop: 10 }}
            >
              Validate Ticket
            </Button>
          </div>
        )}
      </Modal>

      <Modal
        title="Scan QR Ticket"
        visible={scanning}
        onCancel={() => setScanning(false)}
        footer={null}
      >
        <QrScanner
          delay={300}
          style={{ width: "100%" }}
          onError={handleError}
          onScan={handleScan}
        />
      </Modal>
    </div>
  );
};

export default MyCommittee;