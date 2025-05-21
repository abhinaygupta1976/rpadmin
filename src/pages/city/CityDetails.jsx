import React, { useEffect } from "react";
import { NavLink } from "react-router";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useContext, useReducer, useState } from "react";
import { LoginContext } from "../../context/LoginContext";
import { INITIAL_STATE_AXIOS } from "../../reducer/InitialState";
import { AXIOS_ACTION_TYPE } from "../../reducer/ActionType";
import { axiosReducer } from "../../reducer/axiosReducer";
import { getCityByCityId, updateCity } from "../../services/CityService";
import { CityForm } from "./CityForm";
import { CityPicture } from "./CityPicture";
import { cityFormValidation } from "./cityFormValidation";
export const CityDetails = () => {
  const { cityId } = useParams();
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const navigate = useNavigate();
  const location = useLocation();
  const previousPath = location.state?.prevPath;
  const initailvalues = {
    CountryId: 0,
    CityId: 0,
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
  const [key, setKey] = useState("editCity");
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

  const loadCityByCityId = async () => {
    try {
      dispatch({
        type: AXIOS_ACTION_TYPE.AXIOS_START,
      });
      const response = await getCityByCityId(cityId);

      if (response.status === 200 && response.data.StatusCode === 200) {
        dispatch({
          type: AXIOS_ACTION_TYPE.AXIOS_SUCCESS,
        });

        if (response.data.Data != null) {
          const formData = {
            ...formValues,
            CountryId: response.data.Data.CountryId,
            CityId: response.data.Data.CityId,
            CityName: response.data.Data.CityName,
            StateId: response.data.Data.StateId,
            DisplayOrder: response.data.Data.DisplayOrder,
            Published: response.data.Data.Published == 1 ? true : false,
            AllowCustomerReviews:
              response.data.Data.AllowCustomerReviews == 1 ? true : false,
            AllowCustomerRatings:
              response.data.Data.AllowCustomerRatings == 1 ? true : false,
            RatingSum: response.data.Data.RatingSum,
            TotalRatingVotes: response.data.Data.TotalRatingVotes,
            TopCity: response.data.Data.TopCity == 1 ? true : false,
            ShowOnHomePage:
              response.data.Data.ShowOnHomePage == 1 ? true : false,
            ShowOnFooter: response.data.Data.ShowOnFooter == 1 ? true : false,
          };

          setFormValues(formData);
        }
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
  };
  useEffect(() => {
    loadCityByCityId();
  }, []);
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const newFormErrors = cityFormValidation(formValues);
    setFormErrors(newFormErrors);
    if (Object.keys(newFormErrors).length === 0) {
      try {
        dispatch({
          type: AXIOS_ACTION_TYPE.AXIOS_START,
        });

        const response = await updateCity(formValues);
        if (
          response.status === 200 &&
          response.data.StatusCode === 200 &&
          response.data.Data != null &&
          response.data.Data.CityId > 0
        ) {
          dispatch({
            type: AXIOS_ACTION_TYPE.AXIOS_SUCCESS,
          });
          alert("City Updated Sucessfully !");
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
  const handleTabSelect = (k) => {
    setKey(k);
  };
  return (
    <>
      <div className="m-2">
        <span>Edit city Details</span>

        <NavLink
          to={previousPath ? previousPath : "/admin/directory/city"}
          state={{ prevPath: location.pathname }}
        >
          (back to city list)
        </NavLink>
      </div>

      <Tabs
        id="cityDetailTabs"
        activeKey={key}
        onSelect={handleTabSelect}
        className="mb-3 bg-gray-300 font-bold"
      >
        <Tab eventKey="editCity" title="Edit City">
          <CityForm
            handleChangeInput={handleChangeInput}
            handleChangeCheckbox={handleChangeCheckbox}
            handleSubmitForm={handleSubmitForm}
            formValues={formValues}
            formErrors={formErrors}
            axiosState={axiosState}
          />
        </Tab>
        <Tab eventKey="cityPhoto" title="City Photo">
          <CityPicture />
        </Tab>
      </Tabs>
    </>
  );
};
