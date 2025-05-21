import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { LoginContext } from "../../context/LoginContext";
import { NavLink } from "react-router";
export const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  return (
    <>
      <div className="flex h-screen items-center justify-center bg-grey-300 min-h-screen">
        <div className="hidden sm:ml-6 sm:block">
          <div className="flex space-x-4">
            {loggedIn ? (
              <>
                <NavLink
                  to="/admin/dashboard"
                  className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                  aria-current="page"
                >
                  Go to Dashboard
                </NavLink>
                <div>Welcome to admin portal | RealProperties</div>
              </>
            ) : (
              <>
                <div>Welcome to admin portal | RealProperties</div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
