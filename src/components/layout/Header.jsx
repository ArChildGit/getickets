import { useState, useEffect } from "react";
import { Row, Col, Button, Drawer, Typography, Switch } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

function Header({
  placement,
  onPress,
  handleSidenavColor,
  handleSidenavType,
  handleFixedNavbar,
}) {
  const [visible, setVisible] = useState(false);
  const [sidenavType, setSidenavType] = useState("transparent");
  const location = useLocation();
  const navigate = useNavigate();
  
  const pathSegments = location.pathname.split("/").filter(Boolean);

  useEffect(() => window.scrollTo(0, 0), []);

  const showDrawer = () => setVisible(true);
  const hideDrawer = () => setVisible(false);

  return (
    <>
      <Row gutter={[24, 0]} align="middle">
        <Col span={24} md={8}>
          <Text>John Doe</Text>
        </Col>
        <Col span={24} md={16} style={{ textAlign: "right" }}>
          <Button type="link" onClick={showDrawer}>
            Settings
          </Button>
          <Button type="link" onClick={onPress}>
            Toggle Sidebar
          </Button>
          <Drawer
            title={
              <div>
                <Title level={4}>Configurator</Title>
                <Text>See our dashboard options.</Text>
              </div>
            }
            width={360}
            placement={placement}
            onClose={hideDrawer}
            open={visible}
          >
            <div>
              <Title level={5}>Sidebar Color</Title>
              <Row gutter={8}>
                <Col>
                  <Button
                    style={{ backgroundColor: "#1890ff" }}
                    onClick={() => handleSidenavColor("#1890ff")}
                  />
                </Col>
                <Col>
                  <Button
                    style={{ backgroundColor: "#52c41a" }}
                    onClick={() => handleSidenavColor("#52c41a")}
                  />
                </Col>
                <Col>
                  <Button
                    style={{ backgroundColor: "#d9363e" }}
                    onClick={() => handleSidenavColor("#d9363e")}
                  />
                </Col>
                <Col>
                  <Button
                    style={{ backgroundColor: "#fadb14" }}
                    onClick={() => handleSidenavColor("#fadb14")}
                  />
                </Col>
                <Col>
                  <Button
                    style={{ backgroundColor: "#111" }}
                    onClick={() => handleSidenavColor("#111")}
                  />
                </Col>
              </Row>

              <Title level={5} style={{ marginTop: 16 }}>Sidenav Type</Title>
              <Text>Choose between 2 different sidenav types.</Text>
              <Row gutter={8} style={{ marginTop: 8 }}>
                <Col>
                  <Button
                    type={sidenavType === "transparent" ? "primary" : "default"}
                    onClick={() => {
                      handleSidenavType("transparent");
                      setSidenavType("transparent");
                    }}
                  >
                    TRANSPARENT
                  </Button>
                </Col>
                <Col>
                  <Button
                    type={sidenavType === "white" ? "primary" : "default"}
                    onClick={() => {
                      handleSidenavType("#fff");
                      setSidenavType("white");
                    }}
                  >
                    WHITE
                  </Button>
                </Col>
              </Row>

              <Title level={5} style={{ marginTop: 16 }}>Navbar Fixed</Title>
              <Switch onChange={handleFixedNavbar} />
            </div>
          </Drawer>
          <Button type="text" onClick={() => navigate('/login', { replace: true })}>
            <LogoutOutlined />
            <span>Sign Out</span>
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default Header;
