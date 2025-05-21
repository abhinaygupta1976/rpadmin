import React from "react";
import { useEffect, useContext, useReducer, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";
import { CountryTable } from "./CountryTable";
import { AddCountry } from "./AddCountry";
import { INITIAL_STATE_AXIOS } from "../../reducer/InitialState";
import { AXIOS_ACTION_TYPE } from "../../reducer/ActionType";
import { getAllCountries } from "../../services/CountryService";
import { countryContext } from "../../context/countryContext";
import { axiosReducer } from "../../reducer/axiosReducer";

export const Country = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const [axiosState, dispatch] = useReducer(axiosReducer, INITIAL_STATE_AXIOS);
  const [countries, setCountries] = useState([]);

  const loadAllCountries = async () => {
    try {
      dispatch({
        type: AXIOS_ACTION_TYPE.AXIOS_START,
      });
      const response = await getAllCountries();
      if (response.status === 200 && response.data.StatusCode === 200) {
        dispatch({
          type: AXIOS_ACTION_TYPE.AXIOS_SUCCESS,
        });
        setCountries(response.data.Data);
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
    if (loggedIn === false) {
      navigate("/login", {
        state: {
          previousUrl: location.pathname,
        },
      });
    } else loadAllCountries();
  }, []);

  return (
    <>
      <countryContext.Provider value={[countries, setCountries]}>
        <AddCountry countries={countries} />
        <hr className="text-sm font-medium text-gray-900 dark:text-white"></hr>
        <CountryTable axiosState={axiosState} countries={countries} />
      </countryContext.Provider>
    </>
  );
};
