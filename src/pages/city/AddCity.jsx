import React from "react";
import { useEffect, useContext, useReducer, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";
import { INITIAL_STATE_AXIOS } from "../../reducer/InitialState";
import { AXIOS_ACTION_TYPE } from "../../reducer/ActionType";
import { axiosReducer } from "../../reducer/axiosReducer";
import { addCity } from "../../services/CityService";
import { CityForm } from "./CityForm";
import { cityFormValidation } from "./cityFormValidation";
export const AddCity = () => {
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const navigate = useNavigate();
  const location = useLocation();
  const previousPath = location.state?.prevPath;
  const initailvalues = {
    CountryId: 0,
    CityName: "",
    StateId: 0,
    DisplayOrder: 0,
    Published: true,
    AllowCustomerReviews: false,
    AllowCustomerRatings: false,
    RatingSum: 0,
    TotalRatingVotes: 0,
    TopCity: false,
    ShowOnHomePage: false,
    ShowOnFooter: false,
  };
  const [formValues, setFormValues] = useState(initailvalues);
  const [formErrors, setFormErrors] = useState({});
  const [axiosState, dispatch] = useReducer(axiosReducer, INITIAL_STATE_AXIOS);
  const handleChangeInput = async (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeCheckbox = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const newFormErrors = cityFormValidation(formValues);
    setFormErrors(newFormErrors);
    if (Object.keys(newFormErrors).length === 0) {
      try {
        dispatch({
          type: AXIOS_ACTION_TYPE.AXIOS_START,
        });

        const response = await addCity(formValues);
        if (
          response.status === 200 &&
          response.data.StatusCode === 200 &&
          response.data.Data != null &&
          response.data.Data.CityId > 0
        ) {
          dispatch({
            type: AXIOS_ACTION_TYPE.AXIOS_SUCCESS,
          });
          navigate(`/admin/directory/city/${response.data.Data.CityId}`, {
            state: {
              previousUrl: location.pathname,
            },
          });
        } else {
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
      <div className="m-2">
        <span>Add City</span>

        <NavLink
          to={previousPath ? previousPath : "/admin/directory/city"}
          state={{ prevPath: location.pathname }}
        >
          (back to city list)
        </NavLink>
      </div>

      <CityForm
        handleChangeInput={handleChangeInput}
        handleChangeCheckbox={handleChangeCheckbox}
        handleSubmitForm={handleSubmitForm}
        formValues={formValues}
        formErrors={formErrors}
        axiosState={axiosState}
      />
    </>
  );
};
