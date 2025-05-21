import React, { useEffect } from "react";
import { getAllPictureTypes } from "../services/PictureTypeService";
import { useQuery } from "@tanstack/react-query";
export const PictureTypeDropDownList = ({
  selectedPictureType,
  handlePictureTypeChange,
}) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["pictureTypes"],
    queryFn: getAllPictureTypes,
  });
  const handleChange = async (e) => {
    handlePictureTypeChange(e);
  };
  if (isLoading) {
    return (
      <>
        <select
          name="PictureTypeId"
          value={selectedPictureType}
          onChange={handleChange}
          select={selectedPictureType}
          className="form-control"
        >
          if(isLoading)
          <option value="0">loading...</option>
        </select>
      </>
    );
  }
  if (isError) {
    return (
      <>
        <select
          name="PictureTypeId"
          value={selectedPictureType}
          onChange={handleChange}
          select={selectedPictureType}
          className="form-control"
        >
          if(isLoading)
          <option value="0">error occured...</option>
        </select>
      </>
    );
  }
  return (
    <>
      <select
        name="PictureTypeId"
        value={selectedPictureType}
        onChange={handleChange}
        select={selectedPictureType}
        className="form-control"
      >
        <option value="0">Choose Picture Type...</option>
        if(data && data.StatusCode === 200 )
        {data.Data.map((item) => {
          return (
            <option key={item.PictureTypeId} value={item.PictureTypeId}>
              {item.Name}
            </option>
          );
        })}
      </select>
    </>
  );
};
