import React from "react";
import { Form, Input, message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./credential.css";
const Register = () => {
  const navigate = useNavigate();

  const onfinishhandler = async (values) => {
    try {
      console.log(values);
      const res = await axios.post("/api/register", values); //when the endpoint is hit then just pass the values in the form
      console.log("RES:", res);
      if (res.data.success) {
        message.success("Registered Successfully!");
        return navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="form-container">
        <Form
          layout="vertical"
          onFinish={onfinishhandler}
          className="register-form"
        >
          <h1 className="text-center">Register Form</h1>
          <Form.Item label="Name" name="name">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <Link to="/login" className="m-2">
            Already a User
          </Link>
          <button className="btn btn-primary" type="Submit">
            Register
          </button>
        </Form>
      </div>
    </>
  );
};

export default Register;
