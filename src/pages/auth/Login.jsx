import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { adminLogin } from "../../services/AuthApi";
import { LoginContext } from "../../context/LoginContext";
import { LoginForm } from "./LoginForm";
export const Login = () => {
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const [loginRequest, setLoginRequest] = useState({});
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState({ message: "", code: "" });
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (loggedIn === true) {
      navigate(
        location.state?.previousUrl && location.state.previousUrl !== "/login"
          ? location.state.previousUrl
          : "/admin/dashboard"
      );
    }
  }, []);
  const validate = () => {
    let valid = true;
    const errors = { username: "", password: "" };
    if (!loginRequest.Username) {
      errors.username = "Please choose a username.";
      valid = false;
    } else if (!loginRequest.Password) {
      errors.password = "Please choose a password.";
      valid = false;
    } else if (loginRequest.Password.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (validate()) {
        const apierror = { message: "", code: "" };
        setApiError(apierror);
        setLoading(true);
        const response = await adminLogin(loginRequest);
        if (response.status === 200) {
          localStorage.setItem("token", response.data.AccessToken);
          localStorage.setItem("refresh", response.data.RefreshToken);
          setLoggedIn(true);
          setLoading(false);
          navigate(
            location.state?.previousUrl &&
              location.state.previousUrl !== "/login"
              ? location.state.previousUrl
              : "/admin/dashboard"
          );
        } else {
          localStorage.clear();
          setLoggedIn(false);
          const errors = {
            message: response.statusText,
            code: response.status,
          };
          setApiError(errors);
          setLoading(false);
        }
      }
    } catch (error) {
      console.log("Error", error);
      localStorage.clear();
      setLoggedIn(false);
      const errors = {
        message: error?.response?.data
          ? error.response.data.Message
            ? error.response.data.Message
            : error.response.data.title
          : error?.message,
        code: error?.response?.data
          ? error.response.data?.status
          : error.status,
      };
      setApiError(errors);
      setLoading(false);
    }
  };
  const handleChange = async (e) => {
    setLoginRequest({
      ...loginRequest,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <LoginForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loginRequest={loginRequest}
        loading={loading}
        formErrors={errors}
        apiError={apiError}
      />
    </>
  );
};
