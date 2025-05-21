import axios from "axios";
import { BaseUrl } from "../constants/Constant";

export const getAllCityPictures = async (cityId) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${
      localStorage.length > 0 ? localStorage.token : ""
    }`,
  };
  const response = await axios.get(
    `${BaseUrl}CityPicture/AllCityPictures?cityid=${cityId}`,
    {
      headers,
    }
  );
  return response;
};
export const addCityPicture = async (request) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${
      localStorage.length > 0 ? localStorage.token : ""
    }`,
  };
  const response = await axios.post(
    `${BaseUrl}CityPicture/AddCityPicture`,
    request,
    {
      headers,
    }
  );
  return response;
};
export const deleteCityPicture = async (cityPictureId) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${
      localStorage.length > 0 ? localStorage.token : ""
    }`,
  };
  const response = await axios.delete(
    `${BaseUrl}CityPicture/DeleteCityPicture/${cityPictureId}`,
    {
      headers,
    }
  );
  return response;
};
