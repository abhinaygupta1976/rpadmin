import axios from "axios";
import { BaseUrl } from "../constants/Constant";

export const adminLogin = async (loginRequest) => {
  const headers = {
    "Client-Guid": "41b87de5-878c-4f5b-944c-55254f84f0fb",
    "Content-Type": "application/json",
  };
  const response = await axios.post(`${BaseUrl}Auth/Login`, loginRequest, {
    headers,
  });
  return response;
};
