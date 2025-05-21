import { useEffect, useContext, useReducer, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";
import { updateCountry } from "../../services/CountryService";
import { INITIAL_STATE_AXIOS } from "../../reducer/InitialState";
import { AXIOS_ACTION_TYPE } from "../../reducer/ActionType";
import { countryContext } from "../../context/countryContext";
import { axiosReducer } from "../../reducer/axiosReducer";
import { CountryForm } from "./CountryForm";
import { countryFormValidation } from "./countryFormValidation";
export const EditCountry = ({ country }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [formValues, setFormValues] = useState(country);
  const [formErrors, setFormErrors] = useState({});
  const [countries, setCountries] = useContext(countryContext);
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const [axiosState, dispatch] = useReducer(axiosReducer, INITIAL_STATE_AXIOS);
  const handleCloseModel = (showModel) => {
    setShow(showModel);
    dispatch({
      type: AXIOS_ACTION_TYPE.AXIOS_RESET,
    });
    setFormValues({
      CountryId: -1,
      CountryName: "",
      CountryCode: "",
      DisplayOrder: 0,
    });
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

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const newFormErrors = countryFormValidation(formValues);
    setFormErrors(newFormErrors);
    if (Object.keys(newFormErrors).length === 0) {
      try {
        dispatch({
          type: AXIOS_ACTION_TYPE.AXIOS_START,
        });
        const response = await updateCountry(formValues);
        if (
          response.status === 200 &&
          response.data.StatusCode === 200 &&
          response.data.Data != null &&
          response.data.Data.CountryId > 0
        ) {
          const updatedCountries = countries.map((country) => {
            if (response.data.Data.CountryId === country.CountryId) {
              return {
                ...country,
                CountryId: response.data.Data.CountryId,
                CountryName: formValues.CountryName,
                CountryCode: formValues.CountryCode,
                DisplayOrder: formValues.DisplayOrder,
              };
            }
            return country;
          });
          dispatch({
            type: AXIOS_ACTION_TYPE.AXIOS_SUCCESS,
          });
          setCountries(updatedCountries);
          handleCloseModel(false);
        } else {
          handleShowModel(true);
          const errors = {
            errorCode: response.data.StatusCode,
            errorMessage: response.data.Message,
          };
          dispatch({
            type: AXIOS_ACTION_TYPE.AXIOS_ERROR,
            payload: { apiErrors: errors },
          });
          if (response.data.StatusCode === 401) {
            setLoggedIn(false);
            localStorage.clear();
            dispatch({
              type: AXIOS_ACTION_TYPE.AXIOS_RESET,
            });
            navigate("/login", {
              state: {
                previousUrl: location.pathname,
              },
            });
          }
        }
      } catch (error) {
        handleShowModel(true);
        const errors = {
          errorCode: error.status,
          errorMessage: error.message,
        };
        dispatch({
          type: AXIOS_ACTION_TYPE.AXIOS_ERROR,
          payload: { apiErrors: errors },
        });
        if (error.status === 401) {
          setLoggedIn(false);
          localStorage.clear();
          dispatch({
            type: AXIOS_ACTION_TYPE.AXIOS_RESET,
          });
          navigate("/login", {
            state: {
              previousUrl: location.pathname,
            },
          });
        }
      }
    }
  };
  return (
    <>
      <CountryForm
        handleChangeInput={handleChangeInput}
        handleSubmitForm={handleSubmitForm}
        handleCloseModel={handleCloseModel}
        handleShowModel={handleShowModel}
        formValues={formValues}
        show={show}
        formSubmitButtonText="Update"
        formTitle="Update Country"
        axiosState={axiosState}
        formErrors={formErrors}
      />
    </>
  );
};
