import React from "react";
import { Form, Input, message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./credential.css";

const Login = () => {
  const navigate = useNavigate();
  const onfinishhandler = async (values) => {
    try {
      //   dispatch(showLoading()); //first show the loading
      const res = await axios.post("/api/login", values);
      //using GLOBAL WINDOW OBJECT
      window.location.reload(); //SINCE IT NEEDED TO RELOAD AGAIN FOR THE USER TO BE DISPLAYED AND THE SIDEBAR
      //MENU TO BE SHIFTED TO THE USER PORTAL AND NOT THE ADMIN IF A USER LOGS IN
      //then as the request goes then we will hide the loading

      //checking the successfully login status
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");
        //then navigating the user to the home page
        navigate("/");
        //ALSO WE NEED TO GENERATE THE TOKEN ALSO AT THE LOCAL STORAGE
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  return (
    <>
      <div className="form-container">
        <Form
          layout="vertical"
          onFinish={onfinishhandler} //HERE THE SUBMIT HANDLER
          className="register-form"
        >
          <h1 className="text-center">Login Form</h1>

          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <Link to="/register" className="m-2">
            New User
          </Link>
          <button className="btn btn-primary lg-btn" type="Submit">
            Login
          </button>
        </Form>
      </div>
    </>
  );
};

export default Login;
