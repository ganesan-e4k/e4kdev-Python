"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
//import { useLoginMutation, useRefreshTokenMutation } from "../store/slice/authapi";
//import { setAuthToken } from "../store/slice/authslice";
import { Input } from "smart-webcomponents-react/input";
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

function Login() {
  const router = useRouter();
  //const [login] = useLoginMutation();
  //const [refreshToken] = useRefreshTokenMutation();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login({
        username: formData.username,
        password: formData.password,
      }).unwrap();

      if (result.login !== null && result.login.success === true) {
        //dispatch(setAuthToken(result.token));
        document.cookie = `sessionid=${result.token}; path=/`;
        Cookies.set('authtoken', result.token, { path: '/product/productlist', sameSite: 'Strict' });

        // const refreshResponse = await refreshToken().unwrap();
        // if (refreshResponse.refreshToken !== null && refreshResponse.refreshToken.success === true) {
        //   //dispatch(setAuthToken(refreshResponse.refreshToken.token));
        //   document.cookie = `sessionid=${refreshResponse.refreshToken.token}; path=/`;
        // }

        // Redirect to the product list page after successful login
        router.push('/product/productlist');
      } else {
        toast.error('Invalid username or password', { position: "top-center" });
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("Error logging in. Please try again.");
    }
  };

  return (
    <div className="login-content">
      <div className="e4k-block" id="l-register">
        <form className="e4k-form" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-12 col-xs-12">
              <div className="register-title">
                <h2>User Login Form</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-5 col-xs-12">
              <div className="input-lable">
                <span>
                  <i className="fa fa-user" aria-hidden="true"></i> Username
                </span>
              </div>
            </div>
            <div className="col-md-7 col-xs-12">
              <div className="form-group logindiv-input">
                <Input
                  placeholder="Username"
                  type="text"
                  name="username"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-5 col-xs-12">
              <div className="input-lable">
                <span>
                  <i className="fa fa-user" aria-hidden="true"></i> Password
                </span>
              </div>
            </div>
            <div className="col-md-7 col-xs-12">
              <div className="form-group logindiv-input">
                <Input
                  placeholder="Password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 col-xs-12">
              <button type="submit" className="btn alter-button register-button">
                <i className="fa fa-sign-in" aria-hidden="true"></i> Login
              </button>
            </div>
          </div>
        </form>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </div>
  );
}

export default Login;
