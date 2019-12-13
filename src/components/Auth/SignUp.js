import React, { useState } from 'react';
import { Button, Input, Form, Icon } from 'antd';
import { Redirect, useHistory, Link } from 'react-router-dom';
import { useAuth } from '../../utils/dataStore';
import StyledSignIn from './auth.styles';
import splash from '../../assets/splash-image.png';
import { postUser } from './axiosAuth/axios';

const inputStyles = {
  fontSize: '16px',
  lineHeight: 1.5,
  marginBottom: '15px',
};

const SignIn = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useAuth();
  const history = useHistory();
  const [credentials, setCredentials] = useState({
    firstName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const saveUserAndRedirect = (returnedUser) => {
    setUser(returnedUser);
    setIsAuthenticated(true);
    history.push('/dashboard');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postUser(credentials, saveUserAndRedirect);
  };

  return (
    <StyledSignIn>
      <div style={{ marginBottom: '-1px' }}>
        <h2 style={{ position: 'absolute' }}>
          Create
          <br />
          Account
        </h2>
        <img src={splash} alt="leaves" style={{ width: '100%' }} />
      </div>

      <div className="form-wrapper">
        <Form onSubmit={handleSubmit}>
          <Input
            style={inputStyles}
            placeholder="Name"
            type="text"
            size="large"
            name="firstName"
            value={credentials.firstName}
            onChange={handleChange}
          />
          <Input
            style={inputStyles}
            placeholder="Email"
            type="text"
            size="large"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
          />
          <Input.Password
            style={{ ...inputStyles, marginBottom: 28 }}
            placeholder="Password"
            type="password"
            size="large"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          />
          <Button className="btn signup" htmlType="submit">
            Sign Up
          </Button>
        </Form>
        <div className="account">
          <p>Already have an account?</p>
          <Link to="/signin">Sign In</Link>
        </div>
      </div>

      {isAuthenticated && <Redirect to="/dashboard" />}
    </StyledSignIn>
  );
};

export default SignIn;
