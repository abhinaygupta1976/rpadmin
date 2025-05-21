import axios from "axios";
import { BaseUrl } from "../constants/Constant";

export const getAllStates = async () => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${
      localStorage.length > 0 ? localStorage.token : ""
    }`,
  };
  const response = await axios.get(`${BaseUrl}State/AllStates`, {
    headers,
  });

  return response;
};

export const loadStatesByCountry = async (countryId) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${
      localStorage.length > 0 ? localStorage.token : ""
    }`,
  };
  const response = await axios.get(
    `${BaseUrl}State/AllStatesByCountry?countryid=${countryId}`,
    {
      headers,
    }
  );

  return response.data;
};
export const getAllStatesByCountry = async (countryId) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${
      localStorage.length > 0 ? localStorage.token : ""
    }`,
  };
  const response = await axios.get(
    `${BaseUrl}State/AllStatesByCountry?countryid=${countryId}`,
    {
      headers,
    }
  );

  return response;
};

export const addState = async (request) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${
      localStorage.length > 0 ? localStorage.token : ""
    }`,
  };
  const response = await axios.post(`${BaseUrl}State/AddState`, request, {
    headers,
  });
  return response;
};

export const updateState = async (request) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${
      localStorage.length > 0 ? localStorage.token : ""
    }`,
  };
  const response = await axios.put(
    `${BaseUrl}State/UpdateState/${request.StateId}`,
    request,
    {
      headers,
    }
  );
  return response;
};
