import React from "react";
import { Row, Col, Button, Tooltip, Typography } from "antd";
import { MenuOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const { Text } = Typography;

const Header = ({ onPress }) => {
  // Retrieve username from sessionStorage or set default value
  const username = JSON.parse(sessionStorage.getItem('UserProfile'))?.username || "Default_";
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "fixed", // Menjadikan header tetap di atas
        top: 0,
        left: 0,
        width: "100%", // Pastikan header mengisi seluruh lebar layar
        zIndex: 1000, // Pastikan berada di atas elemen lain
        background: "#001529",
        color: "#fff",
        borderBottom: "1px solid #ccc",
        padding: "10px 20px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Tambahkan bayangan agar terlihat lebih profesional
      }}
    >
      <Row gutter={[16, 0]} align="middle" justify="space-between">
        {/* User Name Section */}
        <Col>
          <Text
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "#fff",
              margin: 0,
            }}
          >
            {username}
          </Text>
        </Col>

        {/* Action Buttons Section */}
        <Col>
          <div
            style={{
              display: "flex",
              gap: "16px",
              alignItems: "center",
            }}
          >
            {/* Sidebar Toggle */}
            <Tooltip title="Toggle Sidebar">
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={onPress}
                className="sidebar-toggle"
                style={{ color: "#fff" }}
              />
            </Tooltip>

            {/* Sign Out Button */}
            <Tooltip title="Sign Out">
              <Button
                type="text"
                onClick={() => {
                  console.log("Sign Out clicked");

                  // Hapus sessionStorage items
                  sessionStorage.removeItem("AccessToken");
                  sessionStorage.removeItem("UserProfile");

                  console.log("SessionStorage cleared");

                  // Navigasi ke halaman login
                  navigate("/login", { replace: true });
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "#ff4d4f",
                }}
              >
                <LogoutOutlined />
                <span style={{ marginLeft: 8 }}>Sign Out</span>
              </Button>
            </Tooltip>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
