import axios from "axios";
import { BaseUrl } from "../constants/Constant";

export const loadCountries = async () => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${
      localStorage.length > 0 ? localStorage.token : ""
    }`,
  };
  const response = await axios.get(`${BaseUrl}Country/AllCountries`, {
    headers,
  });
  return response.data;
};
export const getAllCountries = async () => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${
      localStorage.length > 0 ? localStorage.token : ""
    }`,
  };
  const response = await axios.get(`${BaseUrl}Country/AllCountries`, {
    headers,
  });
  return response;
};

export const addCountry = async (request) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${
      localStorage.length > 0 ? localStorage.token : ""
    }`,
  };
  const response = await axios.post(`${BaseUrl}Country/AddCountry`, request, {
    headers,
  });
  return response;
};
export const updateCountry = async (request) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${
      localStorage.length > 0 ? localStorage.token : ""
    }`,
  };
  const response = await axios.put(
    `${BaseUrl}Country/UpdateCountry/${request.CountryId}`,
    request,
    {
      headers,
    }
  );
  return response;
};
