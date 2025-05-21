import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useReducer, useState } from "react";
import { LoginContext } from "../../context/LoginContext";
import { stateContext } from "../../context/StateContext";
import { INITIAL_STATE_AXIOS } from "../../reducer/InitialState";
import { AXIOS_ACTION_TYPE } from "../../reducer/ActionType";
import { axiosReducer } from "../../reducer/axiosReducer";
import { stateFormValidation } from "./stateFormValidation";
import { updateState } from "../../services/StateService";
import { StateForm } from "./StateForm";

export const EditState = ({ state }) => {
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [formValues, setFormValues] = useState(state);
  const [formErrors, setFormErrors] = useState({});
  const [show, setShow] = useState(false);
  const [axiosState, dispatch] = useReducer(axiosReducer, INITIAL_STATE_AXIOS);
  const [states, setStates] = useContext(stateContext);
  const handleCloseModel = (showModel) => {
    setShow(showModel);
    dispatch({
      type: AXIOS_ACTION_TYPE.AXIOS_RESET,
    });
    setFormValues({
      CountryId: -1,
      StateId: -1,
      CountryName: "",
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
    const newFormErrors = stateFormValidation(formValues);
    setFormErrors(newFormErrors);
    if (Object.keys(newFormErrors).length === 0) {
      try {
        dispatch({
          type: AXIOS_ACTION_TYPE.AXIOS_START,
        });
        const response = await updateState(formValues);
        if (
          response.status === 200 &&
          response.data.StatusCode === 200 &&
          response.data.Data != null &&
          response.data.Data.StateId > 0
        ) {
          const updatedStates = states.map((state) => {
            if (response.data.Data.StateId === state.StateId) {
              return {
                ...state,
                StateId: response.data.Data.StateId,
                StateName: formValues.StateName,
                CountryId: formValues.CountryId,
                DisplayOrder: formValues.DisplayOrder,
              };
            }
            return state;
          });
          dispatch({
            type: AXIOS_ACTION_TYPE.AXIOS_SUCCESS,
          });
          setStates(updatedStates);
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
    <StateForm
      handleChangeInput={handleChangeInput}
      handleSubmitForm={handleSubmitForm}
      handleCloseModel={handleCloseModel}
      handleShowModel={handleShowModel}
      show={show}
      formValues={formValues}
      formErrors={formErrors}
      axiosState={axiosState}
      formSubmitButtonText="Update"
      formTitle="Update State"
    />
  );
};
