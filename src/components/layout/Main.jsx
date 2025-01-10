import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Layout, Drawer, Affix } from "antd";
import Sidenav from "./Sidenav";
import Header from "./Header";
import Footer from "./Footer";

const { Header: AntHeader, Content, Sider } = Layout;

function MainLayout({ children }) {
  const [visible, setVisible] = useState(false);
  const [placement, setPlacement] = useState("right");
  const [sidenavColor, setSidenavColor] = useState("#ffffff");
  const [fixed, setFixed] = useState(false);

  const openDrawer = () => setVisible(!visible);
  const handleSidenavColor = (color) => setSidenavColor(color);
  const handleFixedNavbar = (type) => setFixed(type);

  let { pathname } = useLocation();
  pathname = pathname.replace("/", "");

  useEffect(() => {
    setPlacement(pathname === "rtl" ? "left" : "right");
  }, [pathname]);

  return (
    <Layout>
      <Drawer
        placement={placement === "right" ? "left" : "right"}
        closable={false}
        onClose={() => setVisible(false)}
        open={visible}
        width={250}
      >
        <Layout
          className={`layout - dashboard ${
            pathname === "rtl" ? "layout-dashboard-rtl" : ""
          }`}
        >
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          trigger={null}
          width={250}
          theme="light"
          style={{ background: sidenavColor }}
        >
          <Sidenav color={sidenavColor} />
        </Sider>
    </Layout>
      </Drawer >

    <Layout>
      {fixed ? (
        <Affix>
          <AntHeader>
            <Header
              onPress={openDrawer}
              handleSidenavColor={handleSidenavColor}
              handleFixedNavbar={handleFixedNavbar}
            />
          </AntHeader>
        </Affix>
      ) : (
        <AntHeader>
          <Header
            onPress={openDrawer}
            name={pathname}
            subName={pathname}
            handleSidenavColor={handleSidenavColor}
            handleFixedNavbar={handleFixedNavbar}
          />
        </AntHeader>
      )}
      <Content>{children}</Content>
      <Footer />
    </Layout>
    </Layout >
  );
}

export default MainLayout;
