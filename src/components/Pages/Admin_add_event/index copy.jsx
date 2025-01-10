// import React, { useState } from "react";
// import { Layout, Card, Form, Input, Button, Upload, DatePicker, notification, Table, Row, Col, Divider } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
// import './Admin_add_event.css';

// const { Content } = Layout;

// const AddEventForm = ({ onAddEvent, onCancel }) => {
//   const [form] = Form.useForm();
//   const [ticketTypes, setTicketTypes] = useState([]);

//   const handleAddTicketType = (values) => {
//     const newTicketType = {
//       ticketType: values.ticketType,
//       price: values.price,
//       qtyPerUser: values.qtyPerUser,
//       qtySold: values.qtySold,
//     };
//     setTicketTypes([...ticketTypes, newTicketType]);
//     form.resetFields(["ticketType", "price", "qtyPerUser", "qtySold"]); // Reset ticket type fields
//   };

//   const handleAddEvent = (values) => {
//     const newEvent = {
//       id: Date.now(),
//       name: values.title,
//       presenter: values.presenter,
//       description: values.description,
//       date: values.date.format("YYYY-MM-DD"),
//       location: values.location,
//       image: values.image[0].url, // Assuming the image is uploaded and we get the URL
//       ticketTypes: ticketTypes,
//     };
//     onAddEvent(newEvent);
//     notification.success({
//       message: "Event added successfully",
//     });
//     form.resetFields();
//     setTicketTypes([]);
//     onCancel();
//   };

//   return (
//     <Layout>
//       <Content className="add-event-layout">
//         <Card className="add-event-card">
//           <Row gutter={[24, 16]}>
//             <Col span={24}>
//               <h2 className="add-event-title">Add New Event</h2>
//               <Divider />
//             </Col>
//           </Row>

//           <Form form={form} layout="vertical" onFinish={handleAddEvent} className="add-event-form">
//             {/* Event Details */}
//             <Row gutter={[16, 16]}>
//               <Col span={12}>
//                 <Form.Item name="title" label="Event Title" rules={[{ required: true, message: "Please input the event title!" }]}>
//                   <Input placeholder="Enter event title" />
//                 </Form.Item>
//               </Col>
//               <Col span={12}>
//                 <Form.Item name="presenter" label="Presented by" rules={[{ required: true, message: "Please input the presenter!" }]}>
//                   <Input placeholder="Enter presenter name" />
//                 </Form.Item>
//               </Col>
//             </Row>

//             <Row gutter={[16, 16]}>
//               <Col span={12}>
//                 <Form.Item name="date" label="Date" rules={[{ required: true, message: "Please select the event date!" }]}>
//                   <DatePicker style={{ width: "100%" }} />
//                 </Form.Item>
//               </Col>
//               <Col span={12}>
//                 <Form.Item name="location" label="Location" rules={[{ required: true, message: "Please input the event location!" }]}>
//                   <Input placeholder="Enter event location" />
//                 </Form.Item>
//               </Col>
//             </Row>

//             <Row gutter={[16, 16]}>
//               <Col span={24}>
//                 <Form.Item name="description" label="Description" rules={[{ required: true, message: "Please input the event description!" }]}>
//                   <Input.TextArea placeholder="Enter event description" rows={4} />
//                 </Form.Item>
//               </Col>
//             </Row>

//             <Row gutter={[16, 16]}>
//               <Col span={24}>
//                 <Form.Item
//                   name="image"
//                   label="Upload Image"
//                   valuePropName="fileList"
//                   getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
//                 >
//                   <Upload name="image" listType="picture" beforeUpload={() => false}>
//                     <Button icon={<UploadOutlined />}>Upload Image</Button>
//                   </Upload>
//                 </Form.Item>
//               </Col>
//             </Row>

//             {/* Ticket Types */}
//             <Divider />
//             Add Ticket Types
//             <Row gutter={[16, 16]}>
//               <Col span={6}>
//                 <Form.Item name="ticketType" label="Ticket Type">
//                   <Input placeholder="Enter ticket type" />
//                 </Form.Item>
//               </Col>
//               <Col span={6}>
//                 <Form.Item name="price" label="Price">
//                   <Input placeholder="Enter price" />
//                 </Form.Item>
//               </Col>
//               <Col span={6}>
//                 <Form.Item name="qtyPerUser" label="Qty per User">
//                   <Input placeholder="Max qty per user" />
//                 </Form.Item>
//               </Col>
//               <Col span={6}>
//                 <Form.Item name="qtySold" label="Qty Sold">
//                   <Input placeholder="Sold qty" />
//                 </Form.Item>
//               </Col>
//               <Col span={24}>
//                 <Button
//                   type="primary"
//                   onClick={() => {
//                     form.validateFields().then(handleAddTicketType);
//                   }}
//                 >
//                   Add Ticket Type
//                 </Button>
//               </Col>
//             </Row>

//             <Row gutter={[16, 16]}>
//               <Col span={24}>
//                 <Table
//                   dataSource={ticketTypes}
//                   columns={[
//                     { title: "Ticket Type", dataIndex: "ticketType", key: "ticketType" },
//                     { title: "Price", dataIndex: "price", key: "price" },
//                     { title: "Qty per User", dataIndex: "qtyPerUser", key: "qtyPerUser" },
//                     { title: "Qty Sold", dataIndex: "qtySold", key: "qtySold" },
//                   ]}
//                   pagination={false}
//                   rowKey="ticketType"
//                 />
//               </Col>
//             </Row>

//             <Divider />
//             <Row justify="end" gutter={[16, 16]}>
//               <Col>
//                 <Button onClick={onCancel}>Cancel</Button>
//               </Col>
//               <Col>
//                 <Button type="primary" htmlType="submit">
//                   Add Event
//                 </Button>
//               </Col>
//             </Row>
//           </Form>
//         </Card>
//       </Content>
//     </Layout>
//   );
// };

// export default AddEventForm;