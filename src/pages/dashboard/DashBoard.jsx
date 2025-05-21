import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../../context/LoginContext";
import { useEffect } from "react";
export const DashBoard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  useEffect(() => {
    if (loggedIn === false) {
      navigate("/login", {
        state: {
          previousUrl: location.pathname,
        },
      });
    }
  }, []);
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </>
  );
};
