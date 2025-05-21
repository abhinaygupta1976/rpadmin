import React from "react";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";

export const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();
  function handleClick() {
    navigate("/admin/dashboard");
  }
  return (
    <>
      <div>NotFound</div>
      <button onClick={handleClick}>Go Home</button>
    </>
  );
};
