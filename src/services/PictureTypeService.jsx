import axios from "axios";
import { BaseUrl } from "../constants/Constant";

export const getAllPictureTypes = async () => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${
      localStorage.length > 0 ? localStorage.token : ""
    }`,
  };
  const response = await axios.get(`${BaseUrl}PictureType/AllPictureTypes`, {
    headers,
  });
  return response.data;
};
