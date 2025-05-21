import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  data,
  Route,
  RouterProvider,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { RootLayout } from "./layout/RootLayout";
import { AdminLayout } from "./layout/AdminLayout";
import { DirectoryLayout } from "./layout/DirectoryLayout";
import { ServicesLayout } from "./layout/ServicesLayout";
import { Home } from "./pages/home/Home";
import { Login } from "./pages/auth/Login";
import { NotFound } from "./pages/notfound/NotFound";
import { LoginContext } from "./context/LoginContext";
import { DashBoard } from "./pages/dashboard/DashBoard";
import { Country } from "./pages/country/Country";
import { State } from "./pages/state/State";
import { City } from "./pages/city/City";
import { CityDetails } from "./pages/city/CityDetails";
import { Locality } from "./pages/locality/Locality";
import { Project } from "./pages/project/Project";
import { AddCity } from "./pages/city/AddCity";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
const App = () => {
  const queryClient = new QueryClient();
  const [loggedIn, setLoggedIn] = useState(
    localStorage.length > 0 && localStorage.token ? true : false
  );
  useEffect(() => {
    function refreshToken() {
      console.log("Refreshing token");
      if (localStorage.refresh) {
        const url = "https://pasv3.azurewebsites.net/api/auth/RefreshToken";
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Client-Guid": "41b87de5-878c-4f5b-944c-55254f84f0fb",
          },
          body: JSON.stringify({
            RefreshToken: localStorage.refresh,
          }),
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data.AccessToken && data.RefreshToken) {
              localStorage.setItem("token", data.AccessToken);
              localStorage.setItem("refresh", data.RefreshToken);
              setLoggedIn(true);
            } else {
              localStorage.clear();
              setLoggedIn(false);
            }
            console.log("Token refreshed");
          });
      }
    }
    const minute = 60000;
    setInterval(refreshToken, minute * 5);
  }, []);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<DashBoard />} />
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="directory" element={<DirectoryLayout />}>
            <Route index element={<Country />} />
            <Route path="country" element={<Country />} />
            <Route path="state" element={<State />} />
            <Route path="city" element={<City />} />
            <Route path="addcity" element={<AddCity />} />
            <Route path="city/:cityId" element={<CityDetails />} />
            <Route path="locality" element={<Locality />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="services" element={<ServicesLayout />}>
            <Route index element={<Project />} />
            <Route path="project" element={<Project />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
  return (
    <LoginContext.Provider value={[loggedIn, setLoggedIn]}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </LoginContext.Provider>
  );
};

export default App;
