import { useEffect, useState } from "react";
import { Avatar, Dropdown, Layout, Menu } from "antd";
import {
  DesktopOutlined,
  SettingFilled,
  FieldTimeOutlined,
  UserOutlined,
  ProfileOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useNavigate,
} from "react-router-dom";
import joy from "../Main_module/joy.png";
import EDashboard from "./Emp_Dashboard/EDashboard";
import AddTimesheet from "./Emp_Timesheet/ETimesheet";

const { Header, Content, Sider } = Layout;

export function EmpTimesheet() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<Array<any>>([]);
  const onCollapse = (collapsed: any) => {
    setCollapsed(collapsed);
  };

  const handleMenuClick = (e: any) => {
    setSelectedKeys([e.key]);
  };

  const navigate = useNavigate();
  function handleLogout() {
    window.history.replaceState(null, "", "/");
    navigate("/", { replace: true });
    localStorage.removeItem("token");
  }
  function UserDetails() {
    const userMenu = (
      <Menu>
        <Menu.Item key="logout" onClick={handleLogout}>
          Logout
        </Menu.Item>
      </Menu>
    );

    return (
      <div style={{ display: "flex", alignItems: "right", marginLeft: 400 }}>
        <Dropdown overlay={userMenu} placement="bottomRight">
          <Avatar
            style={{
              backgroundColor: "navy",
              cursor: "pointer",
              marginRight: 50,
            }}
            icon={<UserOutlined />}
          />
        </Dropdown>
      </div>
    );
  }
  return (
    <>
      <Layout style={{ minHeight: "100vh", position: "fixed" }}>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            background: "rgba(19, 19, 109, 0.3)",
            padding: 0,
          }}
        >
          <img
            style={{
              width: 68,
              display: "inline-block",
              marginLeft: 20,
              marginRight: 100,
              color: "white",
              filter: "saturate(100%)",
            }}
            src={joy}
            alt="JOY"
          />
          <h1
            style={{
              color: "black",
              fontSize: 28,
              textAlign: "center",
              marginBottom: 10,
              marginTop: 2,
              fontFamily: "Roboto",
              marginLeft: 15,
              marginRight: 390, // Add margin to separate the image and text
            }}
          >
            𝐉𝐨𝐲 𝐈𝐓 𝐒𝐨𝐥𝐮𝐭𝐢𝐨𝐧𝐬
          </h1>
          <UserDetails />
        </Header>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={onCollapse}
            style={{ marginTop: 0 }}
          >
            <div className="logo" />

            <Menu
              theme="dark"
              onClick={handleMenuClick}
              mode="inline"
              style={{ marginTop: 5 }}
              selectedKeys={selectedKeys}
            >
              <Menu.Item key="" icon={<DesktopOutlined />}>
                <Link to="/employee/dashboard">Dashboard</Link>
              </Menu.Item>
              <Menu.Item key="timesheetsummary" icon={<FieldTimeOutlined />}>
                <Link to="/employee/timesheetsummary">Timesheet Summary</Link>
              </Menu.Item>
              <Menu.Item key="timesheet" icon={<ProfileOutlined />}>
                <Link to="/employee/timesheet">Timesheet </Link>
              </Menu.Item>
              <Menu.Item key="hrcontactinfo" icon={<PhoneOutlined />}>
                <Link to="/employee/hrcontact">HR Contact</Link>
              </Menu.Item>
              <Menu.Item key="userprofile" icon={<UserOutlined />}>
                <Link to="/employee/userprofile">User Profile</Link>
              </Menu.Item>
            </Menu>
          </Sider>

          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content
            style={{
              height: "calc(100vh )",
              overflow: "scroll",
              padding: "0% 3% 30% 2% ",
              background:
                "-webkit-linear-gradient(45deg,rgba(255, 192, 203, 0.7), rgba(135, 206, 235, 0.4) 100%)",
            }}
          >
            <AddTimesheet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
