import React, { useState, useEffect } from "react";
import { Layout, List, Button, Modal, notification, Input, Form, Select, Pagination, Row, Spin, Avatar, Typography } from 'antd';
import { SearchOutlined, SendOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { fetchMyCommittee } from "../../../utils/geticket_api_helper/committee";
import { quitPanitia } from "../../../utils/geticket_api_helper/panitia";
import { fetchTicketOwner } from "../../../utils/geticket_api_helper/user";
import { getUserImage } from "../../../utils/geticket_api_helper/static";
import { validateTicket } from "../../../utils/geticket_api_helper/tickets";
const { Text } = Typography;

// import { validateTicket } from "../../../utils/geticket_api_helper/tickets"; // Tambahkan endpoint untuk validasi tiket

const MyCommittee = () => {
  const [loading, setLoading] = useState(true);
  const [committee, setCommmittee] = useState(null);
  const [visible, setVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [validationModal, setValidationModal] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [ticketOwner, setTicketOwner] = useState(null); // Data pemilik tiket
  const [loadingOwner, setLoadingOwner] = useState(false);
  const [errorOwner, setErrorOwner] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getMyCommittee();
  }, []);

  useEffect(() => {
    fetchImage();
  }, [ticketOwner]); // Akan dipanggil setiap kali ticketOwner berubah

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
      setLoading(false);
    } catch (error) {
      setLoading(false);
      notification.error({
        message: 'Error fetching an event you are a part of',
        description: error.message,
      });
    }
  };

  const handleQuitEvent = async (values) => {
    try {
      const response = await quitPanitia(values);
      if (response) {
        notification.success({
          message: "Berhasil keluar dari acara",
          description: "Berhasil keluar dari acara.",
        });
        await getMyCommittee();
      } else {
        throw new Error(response?.message || "Gagal menambahkan panitia.");
      }
    } catch (error) {
      notification.error({
        message: "Gagal Menghapus Panitia",
        description: error.message || "Terjadi kesalahan.",
      });
    }
  };

  const handleValidate = async () => {
    try {
      const response = await validateTicket(ticketId); // Kirim ID tiket ke endpoint
      if (response?.success) {
        notification.success({
          message: "Validasi Berhasil",
          description: `Tiket dengan ID ${ticketId} berhasil divalidasi.`,
        });
      } else {
        throw new Error(response?.message || "Validasi gagal.");
      }
    } catch (error) {
      notification.error({
        message: "Validasi Gagal",
        description: error.message || "Terjadi kesalahan.",
      });
    } finally {
      setTicketOwner(null);
      setValidationModal(false); // Tutup modal setelah validasi
      setTicketId(''); // Reset ID tiket
    }
  };

  // Fungsi untuk menarik data pemilik tiket berdasarkan ticketId
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

  return (
    <div style={{ padding: "20px" }}>
      <Row>
        <Input
          placeholder="Search Ticket"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
          prefix={<SearchOutlined />}
        />
        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={() => setValidationModal(true)} // Buka modal validasi
        >
          Validate
        </Button>
        <Button
          type="primary"
          // onClick={() => setValidationModal(true)
        >
          QR Validation
        </Button>
      </Row>

      {/* Modal Validasi */}
      <Modal
        title="Validasi Tiket"
        visible={validationModal}
        onCancel={() => {
          setValidationModal(false);
          setTicketId('');
          setTicketOwner(null);
          setErrorOwner(false);
        }}
        footer={null}
      >
        <Form layout="vertical">
          <Form.Item label="ID Tiket" required>
            <Input
              value={ticketId}
              onChange={(e) => setTicketId(e.target.value)}
              placeholder="Masukkan ID tiket"
            // onPressEnter={handleFetchTicketOwner}
            />
            <Button
              type="primary"
              onClick={handleFetchTicketOwner}
              style={{ marginTop: 10 }}
              disabled={!ticketId}
            >
              Cek Tiket
            </Button>
          </Form.Item>
        </Form>

        {/* Menampilkan Data Pemilik Tiket */}
        {loadingOwner && <Spin />}
        {errorOwner && <Text type="danger">Tiket tidak ditemukan.</Text>}
        {ticketOwner && (
          <div style={{ marginTop: 20, textAlign: "center" }}>
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
              disabled={!ticketOwner}
              style={{ marginTop: 10 }}
            >
              Kirim Validasi
            </Button>
          </div>
        )}
      </Modal>

      {/* Tabel Data Pelanggan */}
      <List
        dataSource={committee?.events?.map(event => ({
          id: event.id,
          name: event.name,
          date: event.date,
          event_description: event.description,
          event_manager: event.event_manager,
          manager_id: event.user_id,
          image: event.image,
          location: event.location
        })) || []}
        renderItem={event => (
          <List.Item
            key={event.id}
            actions={[
              <Button
                type="primary"
                icon={<SendOutlined />}
                onClick={() => handleQuitEvent(event.id)}
              >
                Quit Event
              </Button>
            ]}
          >
            <List.Item.Meta
              title={event.name}
              description={
                <>
                  <p>Waktu: {event.date}</p>
                  <p>Lokasi: {event.location}</p>
                  <p>Manajer Acara: {event.event_manager}</p>
                </>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default MyCommittee;