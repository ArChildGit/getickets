// import React, { useState } from "react";
// import { Typography, Form, Input, Button, Avatar, Divider, message, Row, Col, Space } from "antd";
// import {
//   UserOutlined,
//   EditOutlined,
//   SaveOutlined,
//   QrcodeOutlined,
//   MailOutlined,
//   PhoneOutlined,
//   CalendarOutlined,
//   ManOutlined,
//   HomeOutlined,
// } from "@ant-design/icons";

// const { Title, Text } = Typography;

// const ProfilePage = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [user, setUser] = useState({
//     id: "#FTK3CHGL",
//     name: "Febe Amalindah",
//     email: "febe@student.undiksha.ac.id",
//     phone: "08389203910",
//     birthDate: "26/08/2004",
//     gender: "Female",
//     address: "Jalan Sudirman Nomor 7",
//   });

//   const [form] = Form.useForm();

//   const handleEdit = () => {
//     setIsEditing(true);
//     form.setFieldsValue({
//       name: user.name,
//       email: user.email,
//       phone: user.phone,
//       birthDate: user.birthDate,
//       gender: user.gender,
//       address: user.address,
//     });
//   };

//   const handleSave = () => {
//     form.validateFields().then((values) => {
//       setUser((prevUser) => ({
//         ...prevUser,
//         ...values,
//       }));
//       setIsEditing(false);
//       message.success("Profile updated successfully!");
//     });
//   };

//   return (
//     <Row justify="center">
//       <Col span={20}>
//         {/* Header with Avatar */}
//         <Space direction="vertical" align="center" size="large" style={{ width: "100%", padding: "24px 0" }}>
//           <Avatar size={120} icon={<UserOutlined />} />
//           <Title level={3}>{user.name}</Title>
//           <Text type="secondary">{user.id}</Text>
//         </Space>

//         <Divider />

//         {/* Profile Information */}
//         <Form form={form} layout="vertical" onFinish={handleSave}>
//           <Row gutter={[24, 24]}>
//             <Col span={12}>
//               <Form.Item label="UserID">
//                 <Input prefix={<QrcodeOutlined />} value={user.id} disabled />
//               </Form.Item>
//             </Col>

//             <Col span={12}>
//               <Form.Item label="Email" name="email">
//                 {isEditing ? (
//                   <Input prefix={<MailOutlined />} placeholder="Email" />
//                 ) : (
//                   <Text>{user.email}</Text>
//                 )}
//               </Form.Item>
//             </Col>

//             <Col span={12}>
//               <Form.Item label="Phone Number" name="phone">
//                 {isEditing ? (
//                   <Input prefix={<PhoneOutlined />} placeholder="Phone Number" />
//                 ) : (
//                   <Text>{user.phone}</Text>
//                 )}
//               </Form.Item>
//             </Col>

//             <Col span={12}>
//               <Form.Item label="Date of Birth" name="birthDate">
//                 {isEditing ? (
//                   <Input prefix={<CalendarOutlined />} placeholder="Date of Birth" />
//                 ) : (
//                   <Text>{user.birthDate}</Text>
//                 )}
//               </Form.Item>
//             </Col>

//             <Col span={12}>
//               <Form.Item label="Gender" name="gender">
//                 {isEditing ? (
//                   <Input prefix={<ManOutlined />} placeholder="Gender" />
//                 ) : (
//                   <Text>{user.gender}</Text>
//                 )}
//               </Form.Item>
//             </Col>

//             <Col span={12}>
//               <Form.Item label="Address" name="address">
//                 {isEditing ? (
//                   <Input prefix={<HomeOutlined />} placeholder="Address" />
//                 ) : (
//                   <Text>{user.address}</Text>
//                 )}
//               </Form.Item>
//             </Col>
//           </Row>

//           <Divider />

//           {/* Action Buttons */}
//           <Space style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
//             {!isEditing ? (
//               <Button icon={<EditOutlined />} onClick={handleEdit}>
//                 Edit Profile
//               </Button>
//             ) : (
//               <Button type="primary" icon={<SaveOutlined />} htmlType="submit">
//                 Save Changes
//               </Button>
//             )}
//           </Space>
//         </Form>
//       </Col>
//     </Row>
//   );
// };

// export default ProfilePage;










import React, { useState } from "react";
import { Card, Typography, Form, Input, Button, Avatar, Divider, message, Row, Col } from "antd";
import { UserOutlined, EditOutlined, SaveOutlined, QrcodeOutlined, MailOutlined, PhoneOutlined, CalendarOutlined, ManOutlined, HomeOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    id: "#FTK3CHGL",
    name: "Febe Amalindah",
    email: "febe@student.undiksha.ac.id",
    phone: "08389203910",
    birthDate: "26/08/2004",
    gender: "Female",
    address: "Jalan Sudirman Nomor 7",
  });

  const [form] = Form.useForm();

  const handleEdit = () => { };

  const handleSave = () => {
    form.validateFields().then((values) => {
      setUser((prevUser) => ({
        ...prevUser,
        name: values.name,
        email: values.email,
        phone: values.phone,
        birthDate: values.birthDate,
        gender: values.gender,
        address: values.address,
      }));
      setIsEditing(false);
      message.success("Profile updated successfully!");
    });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      <Card style={{ width: "90%", maxWidth: 1000, textAlign: "center", borderRadius: 10 }}>

        {/* Header with Background and Avatar */}
        <div
          style={{
            position: "relative",
            backgroundImage: "url('https://example.com/background.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: 100,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        >
          <Avatar
            size={120}
            icon={<UserOutlined />}
            style={{
              position: "absolute",
              bottom: -60,
              left: "50%",
              transform: "translateX(-50%)",
              border: "4px solid white",
            }}
          />
        </div>

        <div style={{ paddingTop: 80, textAlign: "center" }}>
          <Title level={3} style={{ marginBottom: 5 }}>{user.name}</Title>
          <Text type="secondary"> {user.id}</Text>
        </div>

        <Divider />

        {/* Profile Information */}
        <Form form={form} layout="vertical" onFinish={handleSave} style={{ width: "100%" }}>
          <Row gutter={[24, 24]} style={{ padding: "20px 0" }}>
            <Col span={12}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <QrcodeOutlined style={{ fontSize: 24, marginRight: 10 }} />
                <div style={{ backgroundColor: "#508C9B", padding: "10px", borderRadius: 8, width: "100%" }}>
                  <Text strong>UserID</Text>
                  <div>{user.id}</div>
                </div>
              </div>
            </Col>

            <Col span={12}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <MailOutlined style={{ fontSize: 24, marginRight: 10 }} />
                <div style={{ backgroundColor: "#508C9B", padding: "10px", borderRadius: 8, width: "100%" }}>
                  <Text strong>Email</Text>
                  {isEditing ? (
                    <Form.Item name="email" style={{ marginBottom: 0 }}>
                      <Input placeholder="Email" />
                    </Form.Item>
                  ) : (
                    <div>{user.email}</div>
                  )}
                </div>
              </div>
            </Col>

            <Col span={12}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <PhoneOutlined style={{ fontSize: 24, marginRight: 10 }} />
                <div style={{ backgroundColor: "#508C9B", padding: "10px", borderRadius: 8, width: "100%" }}>
                  <Text strong>Phone Number</Text>
                  {isEditing ? (
                    <Form.Item name="phone" style={{ marginBottom: 0 }}>
                      <Input placeholder="Phone Number" />
                    </Form.Item>
                  ) : (
                    <div>{user.phone}</div>
                  )}
                </div>
              </div>
            </Col>

            <Col span={12}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <CalendarOutlined style={{ fontSize: 24, marginRight: 10 }} />
                <div style={{ backgroundColor: "#508C9B", padding: "10px", borderRadius: 8, width: "100%" }}>
                  <Text strong>Date of Birth</Text>
                  {isEditing ? (
                    <Form.Item name="birthDate" style={{ marginBottom: 0 }}>
                      <Input placeholder="Date of Birth" />
                    </Form.Item>
                  ) : (
                    <div>{user.birthDate}</div>
                  )}
                </div>
              </div>
            </Col>

            {/* Gender and Address side by side */}
            <Col span={12}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <ManOutlined style={{ fontSize: 24, marginRight: 10 }} />
                <div style={{ backgroundColor: "#508C9B", padding: "10px", borderRadius: 8, width: "100%" }}>
                  <Text strong>Gender</Text>
                  {isEditing ? (
                    <Form.Item name="gender" style={{ marginBottom: 0 }}>
                      <Input placeholder="Gender" />
                    </Form.Item>
                  ) : (
                    <div>{user.gender}</div>
                  )}
                </div>
              </div>
            </Col>

            <Col span={12}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <HomeOutlined style={{ fontSize: 24, marginRight: 10 }} />
                <div style={{ backgroundColor: "#508C9B", padding: "10px", borderRadius: 8, width: "100%" }}>
                  <Text strong>Address</Text>
                  {isEditing ? (
                    <Form.Item name="address" style={{ marginBottom: 0 }}>
                      <Input placeholder="Address" />
                    </Form.Item>
                  ) : (
                    <div>{user.address}</div>
                  )}
                </div>
              </div>
            </Col>
          </Row>

          <Divider />


          {/* Edit Button */}
          {!isEditing ? (
            <Button
              type="default"
              icon={<EditOutlined />}
              onClick={handleEdit}
              style={{ marginBottom: 20 }}
            >
              Edit Profile
            </Button>
          ) : (
            <Button
              type="primary"
              icon={<SaveOutlined />}
              htmlType="submit"
              style={{ marginBottom: 20 }}
            >
              Save Changes
            </Button>
          )}
        </Form>
      </Card>
    </div>
  );
};

export default ProfilePage;
