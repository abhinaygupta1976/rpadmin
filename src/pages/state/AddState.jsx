import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useReducer, useState } from "react";
import { LoginContext } from "../../context/LoginContext";
import { stateContext } from "../../context/StateContext";
import { INITIAL_STATE_AXIOS } from "../../reducer/InitialState";
import { AXIOS_ACTION_TYPE } from "../../reducer/ActionType";
import { axiosReducer } from "../../reducer/axiosReducer";
import { stateFormValidation } from "./stateFormValidation";
import { addState } from "../../services/StateService";
import { StateForm } from "./StateForm";

export const AddState = () => {
  const initailvalues = {
    CountryId: 0,
    StateName: "",
    DisplayOrder: 0,
  };
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [states, setStates] = useContext(stateContext);
  const [formValues, setFormValues] = useState(initailvalues);
  const [formErrors, setFormErrors] = useState({});
  const [show, setShow] = useState(false);

  const [axiosState, dispatch] = useReducer(axiosReducer, INITIAL_STATE_AXIOS);

  const handleCloseModel = (showModel) => {
    setShow(showModel);
    dispatch({
      type: AXIOS_ACTION_TYPE.AXIOS_RESET,
    });
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

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    console.log(formValues);
    const newFormErrors = stateFormValidation(formValues);
    setFormErrors(newFormErrors);
    if (Object.keys(newFormErrors).length === 0) {
      try {
        dispatch({
          type: AXIOS_ACTION_TYPE.AXIOS_START,
        });
        const response = await addState(formValues);
        if (
          response.status === 200 &&
          response.data.StatusCode === 200 &&
          response.data.Data != null &&
          response.data.Data.StateId > 0
        ) {
          const addedState = {
            StateId: response.data.Data.StateId,
            StateName: formValues.StateName,
            CountryId: formValues.CountryId,
            DisplayOrder: formValues.DisplayOrder,
            IsActive: true,
          };
          dispatch({
            type: AXIOS_ACTION_TYPE.AXIOS_SUCCESS,
          });
          setStates([...states, addedState]);
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
      <StateForm
        handleChangeInput={handleChangeInput}
        handleSubmitForm={handleSubmitForm}
        handleCloseModel={handleCloseModel}
        handleShowModel={handleShowModel}
        show={show}
        formValues={formValues}
        formErrors={formErrors}
        axiosState={axiosState}
        formSubmitButtonText="Add"
        formTitle="Add State"
      />
    </>
  );
};
