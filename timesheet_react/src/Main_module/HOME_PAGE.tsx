import { useEffect, useState } from "react";
import { Avatar, Dropdown, Layout, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  BrowserRouter,
  Navigate,
  useNavigate,
} from "react-router-dom";

//import LoginPage from "./LOGIN";
import { AdminDashboard } from "../Admin_module/dash_layout";
import { Configuration } from "../Admin_module/Config_layout";
import { EmployeeA } from "../Admin_module/Emp_layout";
import LoginPage from "./LOGIN";

const { Header, Content, Sider } = Layout;

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      {
        setIsAuthenticated(true);
      }
    } else {
      navigate("/");
    }
  }, [navigate]);
  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated.toString());
  }, [isAuthenticated]);
  return (
    <Layout>
      <Content>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/admin"
            element={
              "isAuthenticated" ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          {/* <Route path="/admin" element={<AdminDashboard />} /> */}
          {/* <Route path="/employee" element={<Config />} /> */}
        </Routes>

        {/*  admin routes   */}
        <Routes>
          <Route
            path="/admin/dashboard"
            element={
              "isAuthenticated" ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/admin/configuration"
            element={
              "isAuthenticated" ? (
                <Configuration />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route path="/admin/timesheet_status" element={<h1>Status</h1>} />
          <Route
            path="/admin/employees"
            element={
              "isAuthenticated" ? <EmployeeA /> : <Navigate to="/" replace />
            }
          />
          <Route path="/admin/user_profile" element={<h1>profile</h1>} />
        </Routes>
        {/*  employee routes   */}
        <Routes></Routes>
      </Content>
    </Layout>
  );
};

const JoyTS = () => (
  <BrowserRouter>
    <Home />
  </BrowserRouter>
);

export default JoyTS;
