import React, { useState, useEffect } from 'react';
import { Layout, Table, Card, Typography, Button, Row, Col, Divider, Modal, notification, InputNumber, Input, Form, Popconfirm, Select, Pagination, List, DatePicker } from 'antd';
import { CalendarFilled, EnvironmentFilled, DollarCircleFilled, DeleteOutlined, UserAddOutlined, SearchOutlined } from '@ant-design/icons';
import integer5 from '../../../assets/geticket_images/event/social_harmony.png';
import './admin_details.css';
import { deleteEvent, fetchEventById, updateEvent } from '../../../utils/geticket_api_helper/events';  // Import the helper
import { getEventImage } from '../../../utils/geticket_api_helper/static';  // Import the image fetching helper
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams
import { addPackage, deleteEventPackage, fetchEventPackages } from '../../../utils/geticket_api_helper/packages';
import { addPanitia, deletePanitia, fetchPanitia } from '../../../utils/geticket_api_helper/panitia';
import { fetchCustomer } from '../../../utils/geticket_api_helper/tickets';
import moment from 'moment'; // Import moment for date formatting

const { Content } = Layout;
const { Title, Text } = Typography;

const AdminDetail = () => {
  const { eventId } = useParams();  // Get eventId from URL
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(''); // For selected image in the modal
  const [eventData, setEventData] = useState(null);
  const [eventPackages, setEventPackages] = useState(null);
  const [panitia, setPanitia] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [filteredCustomer, setFilteredCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageChanged, setImageChanged] = useState(null);  // To track if image has been changed
  const [dateError, setDateError] = useState(false);
  const [form] = Form.useForm();
  const [panitiaForm] = Form.useForm();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCustomer, setTotalCustomer] = useState(0);
  const filteredData = customer?.data.tickets?.filter(ticket =>
    (statusFilter ? (ticket.deleted_at ? "Terpakai" : "Belum terpakai") === statusFilter : true) &&
    (searchQuery ? ticket.ticket_owner_username.toLowerCase().includes(searchQuery.toLowerCase()) : true)
  ) || [];
  const navigate = useNavigate();

  useEffect(() => {
    getEvent();
    getPackages();
    getPanitia();
    getCustomer();
  }, [currentPage, searchQuery, statusFilter])

  const getEvent = async () => {
    try {
      setLoading(true);
      const data = await fetchEventById(eventId);
      setEventData(data);

      const imageURL = await getEventImage(data.gambar);
      setSelectedImage(imageURL);

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
      const data = await fetchEventPackages(eventId);  // Fetch event packages by ID
      setEventPackages(data);
      setLoading(false);  // Update state with event packages data
    } catch (error) {
      setLoading(false);
      notification.error({
        message: 'Error fetching packages',
        description: error.message,
      });
    }
  };

  const getPanitia = async () => {
    try {
      setLoading(true);
      const data = await fetchPanitia(eventId);  // Fetch event packages by ID
      setPanitia(data);
      setLoading(false);  // Update state with event packages data
    } catch (error) {
      setLoading(false);
      notification.error({
        message: 'Error fetching panitia',
        description: error.message,
      });
    }
  };

  const getCustomer = async () => {
    try {
      setLoading(true);
      const data = await fetchCustomer(currentPage, 9, searchQuery, statusFilter, eventId);  // Fetch event packages by ID
      setCustomer(data);
      setTotalCustomer(data.total_count);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      notification.error({
        message: 'Error fetching customer',
        description: error.message,
      });
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleSaveChanges = async () => {
    // Validate date format
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(eventData.tanggal)) {
      setDateError(true);
      notification.error({
        message: 'Invalid Date Format',
        description: 'Please enter the date in the format YYYY-MM-DD.',
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append('id', eventId);
      formData.append('nama', eventData.nama);
      formData.append('deskripsi', eventData.deskripsi);
      formData.append('tanggal', eventData.tanggal);
      formData.append('lokasi', eventData.lokasi);

      if (imageChanged) {
        formData.append('gambar', imageChanged); // Add new image if changed
      }

      const response = await updateEvent(formData);

      if (response) {
        // Successful update
        notification.success({
          message: 'Data Updated Successfully',
          description: `Event ${eventData.nama} has been updated.`,
        });
        setImageChanged(false); // Reset state after successful update
      } else {
        // In case the response doesn't indicate success
        throw new Error(response?.message || 'Failed to update event.');
      }
    } catch (error) {
      // If there's an error, show an error notification
      notification.error({
        message: 'Update Failed',
        description: error.message || 'An unexpected error occurred.',
      });
    }
  };

  const handleDelete = async () => {
    Modal.confirm({
      title: 'Are you sure?',
      content: `Do you really want to delete the event "${eventData.nama}"? This action cannot be undone.`,
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          const response = await deleteEvent(eventId);
          if (response) {
            notification.success({
              message: 'Event Deleted Successfully',
              description: `Event "${eventData.nama}" has been deleted.`,
            });
            // Redirect to the event list after delete
            navigate('/admin-event-list');
          } else {
            throw new Error(response?.message || 'Failed to delete event.');
          }
        } catch (error) {
          notification.error({
            message: 'Delete Failed',
            description: error.message || 'An unexpected error occurred.',
          });
        }
      },
    });
  };

  const handleAddPackage = async (values) => {
    Modal.confirm({
      title: 'Add Ticket Type Confirmation',
      content: `Are you sure you want to add a ticket type with the following details?\n
        Name: ${values.name}\n
        Price: ${values.price}\n
        Tickets per Package: ${values.tickets_per_package}\n
        Total Tickets Available: ${values.total_tickets_available}`,
      okText: 'Yes, Add',
      cancelText: 'Cancel',
      onOk: async () => {
      try {
          console.log("Form Values Before Sending:", values); // Debugging
    
          const formData = new FormData();
          formData.append("name", values.name);
          formData.append("price", values.price);
          formData.append("tickets_per_package", values.tickets_per_package);
          formData.append("total_tickets_available", values.total_tickets_available);
    
          const response = await addPackage(formData, eventId);
    
          if (response) {
            notification.success({
              message: "Paket Berhasil Ditambahkan",
              description: "Paket baru telah ditambahkan.",
            });
            await getPackages();
            form.resetFields();
          } else {
            throw new Error(response?.message || "Gagal menambahkan paket.");
          }
        } catch (error) {
          notification.error({
            message: "Gagal Menambahkan Paket",
            description: error.message || "Terjadi kesalahan.",
          });
        }
      }
    });
  };


  const handleAddPanitia = async (values) => {
    try {
      console.log("Form Values Before Sending:", values); // Debugging

      const formData = new FormData();
      formData.append("id_user", values.id_user);

      const response = await addPanitia(formData, eventId);

      if (response) {
        notification.success({
          message: "Panitia Berhasil Ditambahkan",
          description: "Panitia baru telah ditambahkan.",
        });
        await getPanitia();
        panitiaForm.resetFields();
      } else {
        throw new Error(response?.message || "Gagal menambahkan panitia.");
      }
    } catch (error) {
      notification.error({
        message: "Gagal Menambahkan Panitia",
        description: error.message || "Terjadi kesalahan.",
      });
    }
  }

  const handleDeletePanitia = async (values) => {
    try {
      console.log("Form Values Before Sending:", values); // Debugging

      const formData = new FormData();
      formData.append("id_user", values.id_user);

      const response = await deletePanitia(formData, eventId);

      if (response) {
        notification.success({
          message: "Panitia Berhasil Dihapus",
          description: "Panitia berhasil dihapus.",
        });
        await getPanitia();
      } else {
        throw new Error(response?.message || "Gagal menambahkan panitia.");
      }
    } catch (error) {
      notification.error({
        message: "Gagal Menghapus Panitia",
        description: error.message || "Terjadi kesalahan.",
      });
    }
  }

  const handlePackageDelete = async (eventId, packageId) => {
    try {
      await deleteEventPackage(eventId, packageId);  // Delete the package

      // Fetch updated event packages after deletion
      await getPackages();  // Refetch packages to update the state
      notification.success({
        message: 'Package deleted successfully',
      });
    } catch (error) {
      notification.error({
        message: 'Failed to delete package',
        description: error.message || 'An unexpected error occurred.',
      });
    }
  };

  const handleStatusFilterChange = (value) => {
    setStatusFilter(value);
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

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setEventData((prevData) => ({ ...prevData, imageUrl: event.target.result }));
      };
      reader.readAsDataURL(file);
      setImageChanged(file); // Save new file to be uploaded
    }
  };

  return (
    <Content className="layout-content">
      <Col xs={22} className="mb-24 pt-8">
        <Row gutter={[24, 0]}>
          {/* Image Section */}
          <Col xs={24} md={12}>
            <img
              src={eventData.imageUrl || selectedImage}
              alt="Event"
              style={{ width: '100%', borderRadius: '8px', objectFit: 'fill', height: '517px' }}
              onClick={() => showImageModal(selectedImage)}
            />
            <div className="image-upload-container">
              <input type="file" accept="image/*" onChange={handleImageChange} className="image-upload-input" />
            </div>
          </Col>

          {/* Details Section */}
          <Col xs={24} md={12}>
          <div className="event-card edit-event-card">
            
              {/* Event Name */}
              <label style={{ fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>Event Name</label>
              <Input
                value={eventData.nama}
                onChange={(e) => setEventData({ ...eventData, nama: e.target.value })}
                placeholder="Enter event name"
                style={{ marginBottom: '16px' }}
              />

              {/* Description */}
              <label style={{ fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>Description</label>
              <Input.TextArea
                value={eventData.deskripsi}
                onChange={(e) => setEventData({ ...eventData, deskripsi: e.target.value })}
                rows={4}
                placeholder="Enter event description"
                style={{ marginBottom: '16px' }}
              />

              {/* Date */}
              <label style={{ fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>Date</label>
              <DatePicker
                value={eventData.tanggal ? moment(eventData.tanggal) : null}
                onChange={(date, dateString) => setEventData({ ...eventData, tanggal: dateString })}
                style={{ marginBottom: '16px', width: '100%', borderColor: dateError ? 'red' : undefined }}
                format="YYYY-MM-DD"
              />

              {/* Location */}
              <label style={{ fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>Location</label>
              <Input
                value={eventData.lokasi}
                onChange={(e) => setEventData({ ...eventData, lokasi: e.target.value })}
                placeholder="Enter event location"
                style={{ marginBottom: '20px' }}
              />

              {/* Action Buttons */}
              <Button
                type="primary"
                block
                onClick={handleSaveChanges}
                style={{ marginBottom: '12px', backgroundColor: '#1d72b8', borderColor: '#1d72b8', height: '48px', fontSize: '16px' }}
              >
                Save Changes
              </Button>
              <Button
                type="default"
                block
                onClick={handleDelete}
                style={{ borderColor: '#ff4d4f', color: '#ff4d4f', height: '48px', fontSize: '16px' }}
              >
                Delete Event
              </Button>
            </div>
          </Col>
        </Row>

        {/* Modal Konfirmasi Pembelian */}
        <Modal
          title="Confirm Purchase"
          open={isModalOpen}
          onOk={handleSaveChanges}
          onCancel={handleCancel}
          className="purchase-modal"
          okButtonProps={{ className: 'confirm-ok-button' }}
          cancelButtonProps={{ className: 'confirm-cancel-button' }}
        >
          <p className="confirm-message">
            Are you sure you want to save changes for {eventData.nama}?</p>
          <p className="confirm-price">
            Price per ticket: Rp. 10000</p>
          <InputNumber value={quantity} min={1} max={10} onChange={handleQuantityChange} />
        </Modal>

        {/* Modal Image Preview */}
        <Modal
          open={isImageModalOpen}
          onCancel={() => setIsImageModalOpen(false)}
          footer={null}
          width={700}
          className="image-modal"
        >
          <img src={selectedImage || integer5} alt="Event" style={{ width: '100%' }} />
        </Modal>

        <Divider />

        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {
            console.log("Form Values:", values); // Debugging
            handleAddPackage(values);
          }}
          className="event-card ticket-package-card"
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} md={6}>
              <Form.Item
                name="name"
                label={<span style={{ fontWeight: "bold" }}>Name<span style={{ color: "red" }}> *</span></span>}
                rules={[{ required: true, message: "Please enter package name" }]}
              >
                <Input placeholder="Enter ticket type" />
              </Form.Item>
            </Col>

            <Col xs={24} md={6}>
              <Form.Item
                name="price"
                label={<span style={{ fontWeight: "bold" }}>Price<span style={{ color: "red" }}> *</span></span>}
                rules={[{ required: true, message: "Please enter the price!" }]}
              >
                <Input placeholder="Enter price" />
              </Form.Item>
            </Col>

            <Col xs={24} md={6}>
              <Form.Item
                name="tickets_per_package"
                label={<span style={{ fontWeight: "bold" }}>Tickets per package bought<span style={{ color: "red" }}> *</span></span>}
                rules={[{ required: true, message: "Please enter the amount of ticket the user will get" }]}
              >
                <Input placeholder="Max qty per user" />
              </Form.Item>
            </Col>

            <Col xs={24} md={6}>
              <Form.Item
                name="total_tickets_available"
                label={<span style={{ fontWeight: "bold" }}>Qty Sold<span style={{ color: "red" }}> *</span></span>}
                rules={[{ required: true, message: "Please enter the quantity you want to sold" }]}
              >
                <Input placeholder="Quantity Sold" />
              </Form.Item>
            </Col>

            <Col span={24}>
            <Button
                type="primary"
                block
                htmlType="submit"
                style={{ marginBottom: '12px', backgroundColor: '#1d72b8', borderColor: '#1d72b8', height: '48px', fontSize: '16px' }}
              >
                Add Ticket Type
              </Button>
            </Col>
          </Row>
        </Form>

        <Table
          columns={[
            { title: "Ticket Type", dataIndex: "ticketType", key: "ticketType", align: "center" },
            { title: "Price", dataIndex: "price", key: "price", align: "center" },
            { title: "Qty per User", dataIndex: "qtyPerUser", key: "qtyPerUser", align: "center" },
            { title: "Qty Sold", dataIndex: "qtySold", key: "qtySold", align: "center" },
            {
              title: "Actions",
              key: "actions",
              align: "center",
              render: (_, record) => (
                <Popconfirm
                  title="Are you sure you want to delete this package?"
                  onConfirm={() => handlePackageDelete(eventId, record.key)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                  />
                </Popconfirm>
              ),
            },
          ]}
          dataSource={
            eventPackages.data.packages?.map((pkg) => ({
              ticketType: pkg.name,
              price: pkg.price,
              qtyPerUser: pkg.tickets_per_package,
              qtySold: pkg.total_tickets_available,
              key: pkg.id,
            })) || []
          }
          pagination={false}
          rowKey={(record) => record.key}
          loading={loading}
          style={{
            marginTop: "24px",
            background: "#fff",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
          }}
          bordered
        />


        <Divider />

        <Col xs={24} className="mb-24">
          <Row gutter={[24, 0]}>
            <Col xs={24} md={12}>
              <Card bordered={false} className="criclebox h-full w-full card">
                <Title level={3}>Add Panitia Event</Title>
                <Form form={panitiaForm} layout="inline" onFinish={(values) => handleAddPanitia(values)}>
                  <Form.Item name="id_user" rules={[{ required: true, message: 'Please input Panitia ID!' }]}>
                    <Input placeholder="Add Panitia ID" className="panitia-input" />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" className="add-panitia-button">
                      <UserAddOutlined /> Add Panitia
                    </Button>
                  </Form.Item>
                </Form>

                <Divider />

                <Title level={4}>List Panitia</Title>
                <List
                  dataSource={panitia?.data.committees}
                  renderItem={(p) => (
                    <List.Item
                      key={p.id_user}
                      actions={[
                        <Popconfirm
                          title="Are you sure to delete this panitia?"
                          onConfirm={() => handleDeletePanitia(p)}
                        >
                          <Button type="link" danger>
                            <DeleteOutlined />
                          </Button>
                        </Popconfirm>
                      ]}
                    >
                      <List.Item.Meta
                        avatar={<UserAddOutlined className="panitia-icon" />}
                        title={<Text strong>{p.username}</Text>}
                        description={<div className="panitia-id">{p.id_user}</div>}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>

            <Col xs={24} md={12}>
              <Card bordered={false} className="criclebox h-full w-full card">
                <Title level={3}>Data Customers</Title>

                {/* Input Pencarian */}
                <Input
                  placeholder="Search Pelanggan"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                  prefix={<SearchOutlined />}
                />

                {/* Filter Status Tiket */}
                <Select
                  placeholder="Filter Status"
                  value={statusFilter}
                  onChange={handleStatusFilterChange}
                  className="status-filter"
                >
                  <Select.Option value="">All</Select.Option>
                  <Select.Option value="Terpakai">Terpakai</Select.Option>
                  <Select.Option value="Belum terpakai">Belum terpakai</Select.Option>
                </Select>

                {/* Tabel Data Pelanggan */}
                <Table
                  dataSource={filteredData.map(ticket => ({
                    id: ticket.ticket_id,
                    name: ticket.ticket_owner_username,
                    package: ticket.package_name,
                    status: ticket.deleted_at ? "Terpakai" : "Belum terpakai",
                    usedTime: ticket.deleted_at ? ticket.deleted_at : "—",
                    scannedBy: ticket.deleted_at ? ticket.scannedBy : "—",
                  }))}
                  rowKey="id"
                  pagination={false}
                >
                  <Table.Column title="ID" dataIndex="id" key="id" />
                  <Table.Column title="Nama" dataIndex="name" key="name" />
                  <Table.Column title="Package" dataIndex="package" key="package" /> {/* New Package Column */}
                  <Table.Column
                    title="Status Tiket"
                    dataIndex="status"
                    key="status"
                    render={(text) => (
                      <span className="status-container">
                        <span className={`status-badge ${text === 'Terpakai' ? 'red-bg' : 'green-bg'}`}>
                          {text}
                        </span>
                      </span>
                    )}
                  />
                  <Table.Column title="Waktu" dataIndex="usedTime" key="usedTime" />
                  <Table.Column title="Delete By" dataIndex="scannedBy" key="scannedBy" />
                </Table>
                <Pagination
                  current={currentPage}
                  total={totalCustomer}
                  pageSize={9}
                  onChange={(page) => setCurrentPage(page)}
                  showSizeChanger={false}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '20px',
                    textAlign: 'center'
                  }}
                />
              </Card>
            </Col>
          </Row>
        </Col>
      </Col>
    </Content >
  );
};

export default AdminDetail;
