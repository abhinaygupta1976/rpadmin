import React from "react";
import { useState, useEffect, useReducer, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AXIOS_ACTION_TYPE } from "../../reducer/ActionType";
import { INITIAL_STATE_AXIOS } from "../../reducer/InitialState";
import { axiosReducer } from "../../reducer/axiosReducer";
import { LoginContext } from "../../context/LoginContext";
import { stateContext } from "../../context/StateContext";
import { getAllCountries } from "../../services/CountryService";
import { getAllStates } from "../../services/StateService";
import { StateTable } from "./StateTable";
import { AddState } from "./AddState";
export const State = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [states, setStates] = useState([]);
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const [axiosState, dispatch] = useReducer(axiosReducer, INITIAL_STATE_AXIOS);

  const loadAllStates = async () => {
    try {
      const response = await getAllStates();
      if (response.status === 200 && response.data.StatusCode === 200) {
        dispatch({
          type: AXIOS_ACTION_TYPE.AXIOS_SUCCESS,
        });

        setStates(response.data.Data);
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
    loadAllStates();
  }, []);

  return (
    <stateContext.Provider value={[states, setStates]}>
      <AddState />
      <hr className="text-sm font-medium text-gray-900 dark:text-white"></hr>
      <StateTable axiosState={axiosState}></StateTable>
    </stateContext.Provider>
  );
};
