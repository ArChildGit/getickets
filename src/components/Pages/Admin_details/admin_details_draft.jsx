// import React, { useState } from 'react';
// import { Layout, Card, Typography, Button, Row, Col, Divider, InputNumber, Input, notification, Table, Popconfirm, Form, Select } from 'antd';
// import { CalendarFilled, EnvironmentFilled, DollarCircleFilled, EditFilled, UserAddOutlined, SearchOutlined, DeleteOutlined } from '@ant-design/icons';
// import integer5 from '../../../assets/geticket_images/event/social_harmony.png';
// import './admin_details.css';

// const { Content } = Layout;
// const { Title, Text } = Typography;
// const { Option } = Select;

// const initialEventData = {
//   title: "SOCIAL HARMONY #10: Music Festival",
//   description: "Social Harmony tahun ini menghadirkan Lomba Sihir dan banyak band lokal lainnya. Don't miss it! Save the date and sing together with us!",
//   price: 60000,
//   date: "21 Desember 2024",
//   location: "Lapangan Sepak Bola Kampus Tengah, Undiksha, Singaraja-Bali",
//   imageUrl: integer5,
//   presenter: "Bem Fakultas Hukum dan Ilmu Sosial"
// };

// const AdminDetail = () => {
//   const [editing, setEditing] = useState(false);
//   const [imageFile, setImageFile] = useState(null);
//   const [imageChanged, setImageChanged] = useState(false);
//   const [eventData, setEventData] = useState(initialEventData);

//   const [panitiaData, setPanitiaData] = useState([
//     { id: 'P001', name: 'Febe Amalindah' },
//     { id: 'P002', name: 'Jane Smith' },
//   ]);

//   const [customerData, setCustomerData] = useState([
//     { id: 'C001', name: 'Galuh Rizki', status: 'Terpakai', usedTime: '2024-12-21 19:00:00' },
//     { id: 'C002', name: 'Dwik', status: 'Belum terpakai', usedTime: '' },
//     { id: 'C003', name: 'Danan', status: 'Terpakai', usedTime: '2024-12-21 19:00:00' },
//     { id: 'C004', name: 'Febe', status: 'Belum terpakai', usedTime: '' },
//     { id: 'C005', name: 'Alice Johnson', status: 'Terpakai', usedTime: '2024-12-21 19:00:00' },
//     { id: 'C006', name: 'Bob Williams', status: 'Belum terpakai', usedTime: '' },
//     { id: 'C007', name: 'John Doe', status: 'Terpakai', usedTime: '2024-12-21 19:00:00' },
//     { id: 'C008', name: 'Jane Smith', status: 'Belum terpakai', usedTime: '' },
//   ]);

//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredCustomerData, setFilteredCustomerData] = useState(customerData);
//   const [filteredPanitiaData, setFilteredPanitiaData] = useState(panitiaData);
//   const [statusFilter, setStatusFilter] = useState('');

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEventData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setEventData((prevData) => ({ ...prevData, imageUrl: event.target.result }));
//       };
//       reader.readAsDataURL(file);
//       setImageChanged(true);
//     }
//   };

//   const handleSaveImage = () => {
//     notification.success({
//       message: 'Image updated successfully',
//     });
//     setImageChanged(false);
//   };

//   const handleSave = () => {
//     notification.success({
//       message: 'Event details updated successfully',
//     });
//     setEditing(false);
//   };

//   const handleCancel = () => {
//     setEditing(false);
//     setEventData(initialEventData);
//   };

//   const handleCancelImage = () => {
//     setImageFile(null);
//     setEventData((prevData) => ({ ...prevData, imageUrl: integer5 }));
//     setImageChanged(false);
//   };

//   const handleAddPanitia = (id) => {
//     if (!id) {
//       notification.error({ message: 'Panitia ID cannot be empty' });
//       return;
//     }

//     const newPanitia = { id, name: `Panitia ${id}` };
//     const updatedPanitia = [...panitiaData, newPanitia];

//     setPanitiaData(updatedPanitia);
//     setFilteredPanitiaData(updatedPanitia);

//     notification.success({
//       message: 'Panitia added successfully',
//     });
//   };

//   const handleDeletePanitia = (id) => {
//     const updatedPanitia = panitiaData.filter((p) => p.id !== id);

//     setPanitiaData(updatedPanitia);
//     setFilteredPanitiaData(updatedPanitia);

//     notification.success({
//       message: 'Panitia deleted successfully',
//     });
//   };

//   const handleSearchCustomers = (query) => {
//     const filtered = customerData.filter(c =>
//       c.name.toLowerCase().includes(query.toLowerCase()) ||
//       c.id.toLowerCase().includes(query.toLowerCase())
//     );
//     setFilteredCustomerData(filtered);
//   };

//   const handleStatusFilterChange = (value) => {
//     setStatusFilter(value);
//     const filtered = customerData.filter(c => (value ? c.status === value : true));
//     setFilteredCustomerData(filtered);
//   };

//   const columns = [
//     {
//       title: 'ID',
//       dataIndex: 'id',
//       key: 'id',
//     },
//     {
//       title: 'Nama',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: 'Status Tiket',
//       dataIndex: 'status',
//       key: 'status',
//       render: (text) => (
//         <span className="status-container">
//           <span className={`status-badge ${text === 'Terpakai' ? 'red-bg' : 'green-bg'}`}>
//             {text}
//           </span>
//         </span>
//       ),
//     },
//     {
//       title: 'Waktu',
//       dataIndex: 'usedTime',
//       key: 'usedTime',
//     },
//   ];

//   return (
//     <Content className="layout-content">
//       <Row gutter={[24, 0]}>
//         <Col xs={24} className="mb-24">
//           <Card bordered={false} className="criclebox h-full w-full card">
//             <Row gutter={[24, 0]}>
//               <Col xs={24} md={12}>
//                 <img
//                   src={eventData.imageUrl}
//                   alt="Event"
//                   className="event-image"
//                 />
//                 <div className="image-upload-container">
//                   <input type="file" accept="image/*" onChange={handleImageChange} className="image-upload-input" />
//                   {imageChanged && (
//                     <div className="image-edit-actions">
//                       <Button type="primary" onClick={handleSaveImage} className="save-image-button">
//                         Save Image
//                       </Button>
//                       <Button type="default" onClick={handleCancelImage} className="cancel-image-button">
//                         Cancel
//                       </Button>
//                     </div>
//                   )}
//                 </div>
//               </Col>

//               <Col xs={24} md={12}>
//                 <Title level={2} className="event-title">
//                   {editing ? (
//                     <Input
//                       name="title"
//                       value={eventData.title}
//                       onChange={handleInputChange}
//                       className="title-input"
//                     />
//                   ) : (
//                     eventData.title
//                   )}
//                 </Title>
//                 <div className="presenter-container">
//                   <Text className="presenter-label">Presented by:</Text>
//                   {editing ? (
//                     <Input
//                       name="presenter"
//                       value={eventData.presenter}
//                       onChange={handleInputChange}
//                       className="presenter-input"
//                     />
//                   ) : (
//                     <Text className="presenter-text">{eventData.presenter}</Text>
//                   )}
//                 </div>
//                 {editing ? (
//                   <Input.TextArea
//                     name="description"
//                     value={eventData.description}
//                     onChange={handleInputChange}
//                     rows={4}
//                     className="description-textarea"
//                   />
//                 ) : (
//                   <Text type="secondary" className="event-description">
//                     {eventData.description}
//                   </Text>
//                 )}

//                 <Divider />

//                 <Title level={4} className="event-price">
//                   <DollarCircleFilled className="icon" />
//                   Price/pcs
//                 </Title>
//                 {editing ? (
//                   <InputNumber
//                     name="price"
//                     value={eventData.price}
//                     onChange={(value) => setEventData((prevData) => ({ ...prevData, price: value }))}
//                     className="price-input"
//                   />
//                 ) : (
//                   <Text className="price-text">
//                     Rp. {eventData.price}
//                   </Text>
//                 )}

//                 <Divider />

//                 <Title level={4} className="event-date">
//                   <CalendarFilled className="icon" />
//                   Date
//                 </Title>
//                 {editing ? (
//                   <Input
//                     name="date"
//                     value={eventData.date}
//                     onChange={handleInputChange}
//                     className="date-input"
//                   />
//                 ) : (
//                   <Text className="date-text">
//                     {eventData.date}
//                   </Text>
//                 )}

//                 <Divider />

//                 <Title level={4} className="event-location">
//                   <EnvironmentFilled className="icon" />
//                   Location
//                 </Title>
//                 {editing ? (
//                   <Input
//                     name="location"
//                     value={eventData.location}
//                     onChange={handleInputChange}
//                     className="location-input"
//                   />
//                 ) : (
//                   <Text className="location-text">
//                     {eventData.location}
//                   </Text>
//                 )}

//                 {!editing && (
//                   <Button type="primary" onClick={() => setEditing(true)} className="edit-button">
//                     <EditFilled /> Edit Event Details
//                   </Button>
//                 )}

//                 {editing && (
//                   <div className="edit-actions">
//                     <Button type="primary" onClick={handleSave} className="save-button">
//                       Save Changes
//                     </Button>
//                     <Button type="default" onClick={handleCancel} className="cancel-button">
//                       Cancel
//                     </Button>
//                   </div>
//                 )}
//               </Col>
//             </Row>
//           </Card>
//         </Col>

//         <Col xs={24} className="mb-24">
//           <Row gutter={[24, 0]}>
//             <Col xs={24} md={12}>
//               <Card bordered={false} className="criclebox h-full w-full card">
//                 <Title level={3}>Add Panitia Event</Title>
//                 <Form layout="inline" onFinish={(values) => handleAddPanitia(values.id)}>
//                   <Form.Item name="id" rules={[{ required: true, message: 'Please input Panitia ID!' }]}>
//                     <Input placeholder="Add Panitia ID" className="panitia-input" />
//                   </Form.Item>
//                   <Form.Item>
//                     <Button type="primary" htmlType="submit" className="add-panitia-button">
//                       <UserAddOutlined /> Add Panitia
//                     </Button>
//                   </Form.Item>
//                 </Form>
//                 <Divider />
//                 <Title level={4}>List Panitia</Title>
//                 <div className="panitia-list">
//                   <ul>
//                     {filteredPanitiaData.map((p) => (
//                       <li key={p.id} className="panitia-item">
//                         <UserAddOutlined className="panitia-icon" />
//                         <div>
//                           <Text strong>{p.name}</Text>
//                           <div className="panitia-id">{p.id}</div>
//                         </div>
//                         <Popconfirm title="Are you sure to delete this panitia?" onConfirm={() => handleDeletePanitia(p.id)}>
//                           <Button type="link" danger className="delete-button"><DeleteOutlined /></Button>
//                         </Popconfirm>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </Card>
//             </Col>

//             <Col xs={24} md={12}>
//               <Card bordered={false} className="criclebox h-full w-full card">
//                 <Title level={3}>Data Customers</Title>
//                 <Input
//                   placeholder="Search Pelanggan"
//                   value={searchQuery}
//                   onChange={(e) => {
//                     setSearchQuery(e.target.value);
//                     handleSearchCustomers(e.target.value);
//                   }}
//                   className="search-input"
//                   prefix={<SearchOutlined />}
//                 />
//                 <Select
//                   placeholder="Filter Status"
//                   value={statusFilter}
//                   onChange={handleStatusFilterChange}
//                   className="status-filter"
//                 >
//                   <Option value="">All</Option>
//                   <Option value="Terpakai">Terpakai</Option>
//                   <Option value="Belum terpakai">Belum terpakai</Option>
//                 </Select>
//                 <div className="customer-table-container">
//                   <Table
//                     dataSource={filteredCustomerData}
//                     columns={columns}
//                     rowKey="id"
//                     pagination={false}
//                   />
//                 </div>
//               </Card>
//             </Col>
//           </Row>
//         </Col>
//       </Row>
//     </Content>
//   );
// };

// export default AdminDetail;