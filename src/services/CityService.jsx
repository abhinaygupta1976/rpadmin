import axios from "axios";
import { BaseUrl } from "../constants/Constant";

export const getAllCities = async () => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${
      localStorage.length > 0 ? localStorage.token : ""
    }`,
  };
  const response = await axios.get(`${BaseUrl}City/AllCities`, {
    headers,
  });
  return response;
};
export const getCityByCityId = async (cityId) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${
      localStorage.length > 0 ? localStorage.token : ""
    }`,
  };
  const response = await axios.get(
    `${BaseUrl}City/CityByCityId?CityId=${cityId}`,
    {
      headers,
    }
  );

  return response;
};

export const addCity = async (request) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${
      localStorage.length > 0 ? localStorage.token : ""
    }`,
  };
  const response = await axios.post(`${BaseUrl}City/AddCity`, request, {
    headers,
  });
  return response;
};
export const updateCity = async (request) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${
      localStorage.length > 0 ? localStorage.token : ""
    }`,
  };
  const response = await axios.put(
    `${BaseUrl}City/UpdateCity/${request.CityId}`,
    request,
    {
      headers,
    }
  );
  return response;
};
