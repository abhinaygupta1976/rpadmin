import { Outlet } from "react-router-dom";

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { LoginContext } from "../context/LoginContext";
export const DirectoryLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  useEffect(() => {
    if (loggedIn === false) {
      localStorage.clear();
      navigate("/login", {
        state: {
          previousUrl:
            location.pathname == "/" || location.pathname == "/home"
              ? "/admin/dashboard"
              : location.pathname,
        },
      });
    }
  }, []);
  return (
    <>
      <div>
        <div className="bg-grey-300 min-h-screen">
          <Outlet />
        </div>
      </div>
    </>
  );
};
