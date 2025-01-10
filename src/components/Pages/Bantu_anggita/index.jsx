// import { Layout, Button, Row, Col, Typography, Form, Input, Card } from "antd";
// import { UserOutlined, LockOutlined } from "@ant-design/icons";
// import SignBG from "../../../assets/geticket_images/konser.png";
// import Google from "../../../assets/geticket_images/Google.jpeg";
// import Instagram from "../../../assets/geticket_images/Instagram.jpeg";
// import Background from "../../../assets/geticket_images/konser.png";
// import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// // import { AuthContext } from "../../context/AuthContext"; 

// const { Title } = Typography;
// const { Content } = Layout;

// const BantuAgt = () => {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   return (
//     <Layout className="fixed inset-0 bg-white overflow-hidden">
//       <Content
//         className="relative flex flex-col justify-center min-h-screen"
//         style={{
//           position: "relative",
//           overflow: "hidden",
//         }}
//       >
//         <div
//           className="absolute inset-0 bg-cover bg-center filter blur-sm"
//           style={{ backgroundImage: `url(${Background})` }}
//         ></div>
//         <Row gutter={[10, 0]} justify="center">
//           <Col xs={24} lg={8} md={12}>
//             <div className="h-32"></div>
//             <Card className="p-0 -mt-20 shadow-xl rounded-lg pb-0 bg-gradient-to-b from-[#d1edff] to-white">
//               <img
//                 src={SignBG}
//                 alt="Sign Background"
//                 className="w-28 h-auto -mb-6 rounded-lg mx-auto block"
//               />
//               <Title className="text-center text-gray-600 mt-4" level={5}>
//                 Welcome to Watching Dolphins
//               </Title>
//               <Form
//                 // onFinish={handleLogin}
//                 layout="vertical"
//                 className="space-y-4"
//               >
//                 <Form.Item
//                   className="username input-slide-effect"
//                   label="Username"
//                   name="username"
//                   rules={[
//                     { required: true, message: "Please input your username!" },
//                   ]}
//                 >
//                   <Input
//                     placeholder="Enter your username"
//                     prefix={
//                       <div
//                         className={`input-prefix-wrapper ${username !== "" ? "input-prefix-hidden" : ""
//                           }`}
//                       >
//                         <UserOutlined />
//                       </div>
//                     }
//                     onChange={(e) => setUsername(e.target.value)}
//                   />
//                 </Form.Item>

//                 <Form.Item
//                   className="password input-slide-effect "
//                   label="Password"
//                   name="password"
//                   rules={[
//                     { required: true, message: "Please input your password!" },
//                   ]}
//                 >
//                   <Input.Password
//                     placeholder="Enter your password"
//                     prefix={
//                       <div
//                         className={`input-prefix-wrapper ${password !== "" ? "input-prefix-hidden" : ""
//                           }`}
//                       >
//                         <LockOutlined />
//                       </div>
//                     }
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                 </Form.Item>

//                 <div className="flex justify-between mt-[-10px]">
//                   <Button type="link" className="ml-auto p-0">
//                     Forgot Password?
//                   </Button>
//                 </div>

//                 <Form.Item>
//                   <Button
//                     type="primary"
//                     htmlType="submit"
//                     className="w-full hover:bg-blue-500"
//                     disabled={username === "" || password === ""}
//                   >
//                     LOGIN
//                   </Button>
//                 </Form.Item>

//                 <div className="flex items-center justify-center gap-2 mt-2">
//                   <div className="w-40 h-px bg-gray-300"></div>
//                   <Typography.Text type="secondary" className="text-gray-500">
//                     OR
//                   </Typography.Text>
//                   <div className="w-40 h-px bg-gray-300"></div>
//                 </div>

//                 <div className="flex justify-center gap-4 mt-4">
//                   <div className="w-40 h-12 border rounded-lg shadow-xl flex items-center justify-center bg-white">
//                     <img
//                       src={Google}
//                       alt="Google Sign In"
//                       className="w-7 h-7 "
//                     />
//                   </div>
//                   <div className="w-40 h-12 border rounded-lg shadow-xl flex items-center justify-center bg-white">
//                     <img
//                       src={Instagram}
//                       alt="Instagram Sign In"
//                       className="w-7 h-7 "
//                     />
//                   </div>
//                 </div>
//                 <div className="mt-2 text-center">
//                   <Typography.Text type="secondary">
//                     Need an account?
//                   </Typography.Text>
//                   <Button type="link" onClick={() => navigate("/create")}>
//                     Create Account
//                   </Button>
//                 </div>
//               </Form>
//             </Card>
//           </Col>
//         </Row>
//       </Content>
//     </Layout>
//   );
// };

// export default BantuAgt;

import { Col, Row, Typography, Card, Table, Progress, Divider } from "antd";
import {
  DollarOutlined,
  OrderedListOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import EChart from "./chart/EChart";
// import { formatCurrency } from "../../utils/math";

const { Title, Text } = Typography;

const dataSource = [
  {
    key: "1",
    product: "Snorkeling",
    date: "Jul 12th 2024",
    status: "Completed",
  },
  {
    key: "2",
    product: "Watching Dolphin",
    date: "Jul 12th 2024",
    status: "Pending",
  },
  {
    key: "3",
    product: "Snorkling & Watching Dolphin",
    date: "Jul 12th 2024",
    status: "Pending",
  },
  {
    key: "4",
    product: "Snorkling & Watching Dolphin",
    date: "Jul 12th 2024",
    status: "Completed",
  },
  {
    key: "5",
    product: "Watching Dolphin",
    date: "Jul 12th 2024",
    status: "Completed",
  },
];

const columns = [
  {
    title: "Product",
    dataIndex: "product",
    key: "product",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
];

const BantuAgt = () => {
  // Filter data sesuai dengan dataSource
  const categories = dataSource.map((item) => item.product); // Menggunakan nama produk sebagai kategori
  const values = dataSource.map(() => Math.floor(Math.random() * 100) + 1); // Menggunakan nilai acak untuk contoh

  return (
    <div className="layout-content">
      <Row gutter={[24, 24]}>
        {/* Bagian Kiri */}
        <Col xs={24} lg={16}>
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Card bordered={false} className="dashboard-card">
                <Row gutter={[24, 24]}>
                  <Col span={8}>
                    <Card bordered={false} style={{ backgroundColor: "#f6ffed" }}>
                      <DollarOutlined style={{ fontSize: "32px", color: "#52c41a" }} />
                      <Title level={3} style={{ margin: "10px 0" }}>
                        $193,000
                      </Title>
                      <Text>Net Income</Text>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card bordered={false} style={{ backgroundColor: "#fff7e6" }}>
                      <BarChartOutlined style={{ fontSize: "32px", color: "#fa8c16" }} />
                      <Title level={3} style={{ margin: "10px 0" }}>
                        $32,000
                      </Title>
                      <Text>Total Return</Text>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card bordered={false} style={{ backgroundColor: "#e6f7ff" }}>
                      <OrderedListOutlined style={{ fontSize: "32px", color: "#1890ff" }} />
                      <Title level={3} style={{ margin: "10px 0" }}>
                        350
                      </Title>
                      <Text>Total Bookings</Text>
                    </Card>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={24}>
              <Card bordered={false} className="dashboard-card">
                <Title level={4}>Revenue</Title>
                <EChart
                  color={"#1890ff"}
                  backgroundColor={"#f0f2f5"}
                  categories={categories}
                  values={values}
                />
              </Card>
            </Col>
          </Row>
        </Col>

        {/* Bagian Kanan */}
        <Col xs={24} lg={8}>
          <Card bordered={false} className="dashboard-card">
            <Title level={4}>Total View Performance</Title>
            <Progress type="circle" percent={68} format={(percent) => `${percent}%`} />
            <Divider />
            <Text>Here are some tips on how to improve your score:</Text>
            <ul>
              <li>Optimize product descriptions.</li>
              <li>Increase advertising budget.</li>
            </ul>
          </Card>
          <Card bordered={false} className="dashboard-card" style={{ marginTop: 24 }}>
            <Title level={4}>Recent Transactions</Title>
            <Table
              size="small"
              dataSource={dataSource}
              columns={columns}
              pagination={{ pageSize: 3 }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default BantuAgt;
