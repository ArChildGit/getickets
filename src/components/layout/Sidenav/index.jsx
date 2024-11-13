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
} from "@ant-design/icons";

function Sidenav({ color }) {
  const [selectedKey, setSelectedKey] = useState("1");
  const [collapsed, setCollapsed] = useState(false); // Menambahkan state untuk collapse menu

  const handleMenuKey = (key) => {
    setSelectedKey(key);
  };

  return (
    <div className="sidenav-container">
      <Card style={{ textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={gaventLogo}
            alt="GETicket Logo"
            style={{ width: "32px", height: "32px", marginRight: "8px" }} // Sesuaikan ukuran gambar dan jarak
          />
          <span>GETicket</span>
        </div>
      </Card>
      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[selectedKey]}
        onSelect={({ key }) => handleMenuKey(key)}
        inlineCollapsed={collapsed} // Menambahkan pengaturan collapse
      >
        {/* Menambahkan SubMenu untuk Dashboard */}
        <Menu.SubMenu
          key="main"
          title={
            <span>
              <DashboardOutlined />
              <span className="label">MAIN</span>
            </span>
          }
        >
          <Menu.Item key="/dashboard">
            <NavLink to="/dashboard">Dashboard</NavLink>
          </Menu.Item>
          <Menu.Item key="/profile">
            <NavLink to="/profile">Profile</NavLink>
          </Menu.Item>
          <Menu.Item key="/details">
            <NavLink to="/details">Details</NavLink>
          </Menu.Item>
          <Menu.Item key="/uts">
            <NavLink to="/uts">Ujian Tengah Semester</NavLink>
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.SubMenu
          key="organizer"
          title={
            <span>
              <DashboardOutlined />
              <span className="label">Organizer</span>
            </span>
          }
        >
          <Menu.Item key="/manage">
            <NavLink to="/manage">Manage</NavLink>
          </Menu.Item>
          <Menu.Item key="/invitation">
            <NavLink to="/invitation">Invitation</NavLink>
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.SubMenu
          key="admin"
          title={
            <span>
              <DashboardOutlined />
              <span className="label">ADMIN</span>
            </span>
          }
        >
          <Menu.Item key="/manage">
            <NavLink to="/manage">Manage</NavLink>
          </Menu.Item>
          <Menu.Item key="/invitation">
            <NavLink to="/invitation">Invitation</NavLink>
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
          
    </div>
  );
}

export default Sidenav;
