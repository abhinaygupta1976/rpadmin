import { useNavigate, useLocation } from "react-router-dom";
import React, { useContext, useState, useReducer } from "react";
import { LoginContext } from "../../context/LoginContext";
import { CityPictureForm } from "./CityPictureForm";
import { useMutation } from "@tanstack/react-query";
import { uploadImage } from "../../services/CloudinaryService";
import { addCityPicture } from "../../services/CityPictureService";
import { cityPictureFormValidation } from "../../validation/cityPictureFormValidation";

import { INITIAL_STATE_AXIOS } from "../../reducer/InitialState";
import { AXIOS_ACTION_TYPE } from "../../reducer/ActionType";
import { axiosReducerCityPictureAdd } from "../../reducer/axiosReducerCityPicture";
export const AddCityPicture = ({ cityId, getAddedCityPicture }) => {
  const initailvalues = {
    PictureTypeId: 0,
    PictureType: "",
    PictureURL: "",
    PicturePublicId: "",
    CityId: cityId,
    DisplayOrder: 0,
    AltTag: "",
    Title: "",
  };
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [formValues, setFormValues] = useState(initailvalues);
  const [formErrors, setFormErrors] = useState({});
  const [show, setShow] = useState(false);
  const [axiosStateCityPictureAdd, dispatchCityPictureAdd] = useReducer(
    axiosReducerCityPictureAdd,
    INITIAL_STATE_AXIOS
  );
  const handleCloseModel = (showModel) => {
    setShow(showModel);
    setFormValues(initailvalues);
    setFormErrors({});
  };
  const handleShowModel = (showModel) => {
    setShow(showModel);
  };
  const handleChangeInput = async (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeInputFile = async (e) => {
    dispatchCityPictureAdd({
      type: AXIOS_ACTION_TYPE.AXIOS_START,
    });
    uploadImageMutation.mutate(e.target.files[0]);
  };

  const uploadImageMutation = useMutation({
    mutationFn: (cityImage) => uploadImage(cityImage),
    onSuccess: (response, image) => {
      if (response.status === 200) {
        setFormValues({
          ...formValues,
          PictureURL: response.data.url,
          PicturePublicId: response.data.public_id,
        });
        dispatchCityPictureAdd({
          type: AXIOS_ACTION_TYPE.AXIOS_SUCCESS,
        });
      }
    },
    onError: (error) => {
      const errors = {
        errorCode: error.status,
        errorMessage: error.message,
      };
      dispatchCityPictureAdd({
        type: AXIOS_ACTION_TYPE.AXIOS_ERROR,
        payload: { apiErrors: errors },
      });
      if (error.status === 401) {
        setLoggedIn(false);
        localStorage.clear();
        dispatchCityPictureAdd({
          type: AXIOS_ACTION_TYPE.AXIOS_RESET,
        });
        navigate("/login", {
          state: {
            previousUrl: location.pathname,
          },
        });
      }
    },
  });
  const addCityPictureMutation = useMutation({
    mutationFn: (formValues) => addCityPicture(formValues),
    onSuccess: (response, formValues) => {
      if (response.status === 200 && response.data.StatusCode === 200) {
        const addedCityPicture = {
          CityPictureId: response.data.Data.CityPictureId,
          PictureUrl: formValues.PictureURL,
          PictureTypeName: response.data.Data.PictureTypeName,
          PicturePublicId: formValues.PicturePublicId,
          CityId: formValues.CityId,
          PictureId: response.data.Data.PictureId,
          DisplayOrder: formValues.DisplayOrder,
          AltTag: formValues.AltTag,
          Title: formValues.Title,
        };

        getAddedCityPicture(addedCityPicture);
        dispatchCityPictureAdd({
          type: AXIOS_ACTION_TYPE.AXIOS_SUCCESS,
        });
        handleCloseModel(false);
      } else {
        const errors = {
          errorCode: response.data.StatusCode,
          errorMessage: response.data.Message,
        };
        dispatchCityPictureAdd({
          type: AXIOS_ACTION_TYPE.AXIOS_ERROR,
          payload: { apiErrors: errors },
        });
        if (response.data.StatusCode === 401) {
          setLoggedIn(false);
          localStorage.clear();
          dispatchCityPictureAdd({
            type: AXIOS_ACTION_TYPE.AXIOS_RESET,
          });
          navigate("/login", {
            state: {
              previousUrl: location.pathname,
            },
          });
        }
      }
    },
    onError: (error) => {
      const errors = {
        errorCode: error.status,
        errorMessage: error.message,
      };
      dispatchCityPictureAdd({
        type: AXIOS_ACTION_TYPE.AXIOS_ERROR,
        payload: { apiErrors: errors },
      });
      if (error.status === 401) {
        setLoggedIn(false);
        localStorage.clear();
        dispatchCityPictureAdd({
          type: AXIOS_ACTION_TYPE.AXIOS_RESET,
        });
        navigate("/login", {
          state: {
            previousUrl: location.pathname,
          },
        });
      }
    },
  });
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const newFormErrors = cityPictureFormValidation(formValues);
    setFormErrors(newFormErrors);
    if (Object.keys(newFormErrors).length === 0) {
      dispatchCityPictureAdd({
        type: AXIOS_ACTION_TYPE.AXIOS_START,
      });
      addCityPictureMutation.mutate(formValues);
    }
  };
  return (
    <>
      <CityPictureForm
        handleChangeInput={handleChangeInput}
        handleChangeInputFile={handleChangeInputFile}
        handleSubmitForm={handleSubmitForm}
        handleCloseModel={handleCloseModel}
        handleShowModel={handleShowModel}
        show={show}
        formValues={formValues}
        formErrors={formErrors}
        formSubmitButtonText="Add"
        formTitle="Add City Picture"
        axiosState={axiosStateCityPictureAdd}
      />
    </>
  );
};
