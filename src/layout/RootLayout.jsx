import React from "react";
import { RootHeader } from "../components/RootHeader";
import AdminFooter from "../components/AdminFooter";
import { Outlet } from "react-router";

export const RootLayout = () => {
  return (
    <div>
      <RootHeader />
      <Outlet />
      <AdminFooter />
    </div>
  );
};
