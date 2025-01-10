import "./Sidenav.css";
import { Menu, Card } from "antd";  // Hanya impor Menu
import { NavLink } from "react-router-dom";
import gaventLogo from '../../../assets/geticket_images/gavent.png';
import { useState } from "react";
import {
  ProductOutlined,
  ShoppingCartOutlined,
  UnorderedListOutlined,
  DashboardOutlined,
  UserOutlined,
  FileTextOutlined,
  PlayCircleOutlined,
  TeamOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";

function Sidenav({ color }) {
  const [selectedKey, setSelectedKey] = useState("1");
  const [collapsed, setCollapsed] = useState(false); // Menambahkan state untuk collapse menu

  const handleMenuKey = (key) => {
    setSelectedKey(key);
  };

  const roles = JSON.parse(sessionStorage.getItem('UserProfile'))?.roles || "Default_";

  return (
    <div className="sidenav-container">
      <Card style={{ textAlign: "center", backgroundColor: "#ffffff", color: "#001529", padding: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img
            src={gaventLogo}
            alt="GETicket Logo"
            style={{
              width: "40px", height: "40px", marginRight: "8px", borderRadius: "50%", objectFit: "cover"
            }}
          />
          <span style={{ fontSize: "18px", fontWeight: "bold" }}>GETicket</span>
        </div>
      </Card>

      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[selectedKey]}
        onSelect={({ key }) => handleMenuKey(key)}
        inlineCollapsed={collapsed}
        style={{
          backgroundColor: "#ffffff",
          color: "#001529",
          border: "none"
        }}
      >
        <Menu.Item key="/profile" icon={<UserOutlined />}>
          <NavLink to="/profile">Profile</NavLink>
        </Menu.Item>
        <Menu.Item key="/dashboard" icon={<DashboardOutlined />}>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </Menu.Item>
        <Menu.Item key="/my-ticket" icon={<FileTextOutlined />}>
          <NavLink to="/my-ticket">My Tickets</NavLink>
        </Menu.Item>
        {/* <Menu.Item key="/uts" icon={<PlayCircleOutlined />}>
          <NavLink to="/uts">Playlist</NavLink>
        </Menu.Item> */}
        <Menu.Item key="/my-committee" icon={<TeamOutlined />}>
          <NavLink to="/my-committee">Events I'm Part of</NavLink>
        </Menu.Item>
        {roles === "admin" && (
          <Menu.Item key="/admin-event-list" icon={<AppstoreAddOutlined />}>
            <NavLink to="/admin-event-list">Admin Event List</NavLink>
          </Menu.Item>
        )}
      </Menu>
    </div>
  );
}

export default Sidenav;
