import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Layout, message } from "antd";
import { Content } from "antd/es/layout/layout";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import "./login.css";
const LoginPage: React.FC = () => {
  const [AddProjectForm] = Form.useForm();
  const navigate = useNavigate();
  const [token, settoken] = useState("");

  const setMessage = (statusCode: any, responseMessage: any) => {
    if (statusCode == 200) {
      message.success(responseMessage, 5);
    } else if (statusCode == 404) {
      message.error("You are not Registered");
    } else if (statusCode == 400) {
      message.error("Invalid password", 5);
    } else if (statusCode == 401) {
      message.error("You are not Registered", 5);
    } else {
      message.error(responseMessage);
    }
  };

  const onFinish = (e: any) => {
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
      url: "/api/Login/Login",
      data: e,
    })
      .then((r: any) => {
        localStorage.setItem("mailId", r.email);
        localStorage.setItem("token", r.data.token);
        localStorage.setItem("Employee_Id", r.data.Employee_Id);
        console.log(r.email);
        console.log(r.data.role_Id);

        if (r.data.role_Id === 1) {
          navigate("/admin");
        } else if (r.data.role_Id === 2) {
          navigate("/employee");
        } else {
          message.error("You are not a registered user");
          navigate("/");
        }
        settoken(r.data.token);
        AddProjectForm.resetFields();
      })
      .catch((error) => {
        const errorObject = {
          type: "https://tools.ietf.org/html/rfc7231#section-6.5.4",
          title: "Not Found",
          status: 404,
          traceId: "00-378bef0533d024b409dacc03fad55261-6a2e6fbeb3f56d0f-00",
        };

        setMessage(error.response.status, error.response.message);
        AddProjectForm.resetFields();
      });
  };

  return (
    // <div className="login-page-container">
    //   <Form
    //     name="normal_login"
    //     className="login-form"
    //     onFinish={onFinish}
    //     form={AddProjectForm}
    //   >
    //     <h1>Login</h1>
    //     <Form.Item
    //       name="email"
    //       rules={[{ required: true, message: "Please input your Email!" }]}
    //     >
    //       <Input
    //         prefix={<UserOutlined className="site-form-item-icon" />}
    //         placeholder="Enter Email"
    //       />
    //     </Form.Item>
    //     <Form.Item
    //       name="password"
    //       rules={[{ required: true, message: "Please input your Password!" }]}
    //     >
    //       <Input.Password
    //         prefix={<LockOutlined className="site-form-item-icon" />}
    //         type="password"
    //         placeholder="Password"
    //       />
    //     </Form.Item>
    //     <Form.Item>
    //       <b>
    //         <Button type="link" className="login-form-forgot">
    //           <Link to="/resetpassword"> Reset Password</Link>
    //         </Button>
    //       </b>
    //     </Form.Item>
    //     <Form.Item>
    //       <Button
    //         type="primary"
    //         htmlType="submit"
    //         className="login-form-button"
    //       >
    //         Log in
    //       </Button>
    //     </Form.Item>
    //   </Form>
    // </div>
    <div
      style={{
        margin: 0,
        padding: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        fontFamily: "'Jost', sans-serif",
        background: "linear-gradient(to bottom, #0f0c29, #302b63, #24243e)",
      }}
    >
      <div
        style={{
          width: "350px",
          height: "500px",
          background: "linear-gradient(to bottom, #0f0c29, #302b63, #24243e)",
          overflow: "hidden",
          borderRadius: "10px",
          boxShadow: "5px 20px 50px #000",
        }}
      >
        <div className="login">
          <Form
            onFinish={onFinish}
            form={AddProjectForm}
            style={{ margin: "0 auto", width: "80%" }}
          >
            <Form.Item>
              <label
                htmlFor="chk"
                style={{
                  color: "#eee",
                  fontSize: "2.3em",
                  justifyContent: "center",
                  display: "flex",
                  margin: "60px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: ".5s ease-in-out",
                }}
              >
                Login
              </label>
            </Form.Item>
            <Form.Item name="email">
              <Input
                placeholder="Email"
                style={{
                  height: 40,
                  justifyContent: "center",
                  display: "flex",
                  borderRadius: "5px",
                }}
              />
            </Form.Item>

            <Form.Item name="password">
              <Input.Password
                name="pswd"
                placeholder="Password"
                required
                style={{
                  justifyContent: "center",
                  display: "flex",
                  height: 40,
                  borderRadius: "5px",
                }}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginLeft: "36%" }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
