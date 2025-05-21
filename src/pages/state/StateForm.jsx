import React from "react";
import { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import { CountryDropDownList } from "../../components/CountryDropDownList";
export const StateForm = ({
  handleChangeInput,
  handleSubmitForm,
  handleCloseModel,
  handleShowModel,
  show,
  formValues,
  formErrors,
  axiosState,
  formSubmitButtonText,
  formTitle,
}) => {
  const handleClose = () => {
    handleCloseModel(false);
  };
  const handleShow = () => {
    handleShowModel(true);
  };
  const handleChange = async (e) => {
    handleChangeInput(e);
  };
  const handleSubmit = async (e) => {
    handleSubmitForm(e);
  };

  return (
    <>
      {formSubmitButtonText === "Add" ? (
        <>
          <button
            type="button"
            onClick={handleShow}
            className="block mx-auto m-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            + Add State
          </button>
        </>
      ) : (
        <button type="button" onClick={handleShow}>
          Edit
        </button>
      )}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{formTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} id="stateModel">
            <div className="form-row">
              <div className="form-group col-md-10 m-3">
                <label htmlFor="CountryId" className="m-2">
                  Country Name
                </label>
                <CountryDropDownList
                  selectedCountry={formValues.CountryId}
                  handleCountryChange={handleChange}
                />
                {formErrors.CountryName && (
                  <p className="text-red-500 text-xs italic">
                    {formErrors.CountryName}
                  </p>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-10 m-3">
                <label htmlFor="StateName" className="m-2">
                  State Name
                </label>
                <input
                  className="form-control"
                  name="StateName"
                  type="text"
                  value={formValues.StateName}
                  onChange={handleChange}
                  placeholder="state name"
                />
                {formErrors.StateName && (
                  <p className="text-red-500 text-xs italic">
                    {formErrors.StateName}
                  </p>
                )}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-10 m-3">
                <label htmlFor="DisplayOrder" className="m-2">
                  DisplayOrder
                </label>
                <input
                  className="form-control"
                  name="DisplayOrder"
                  type="number"
                  value={formValues.DisplayOrder}
                  onChange={handleChange}
                  placeholder="display order"
                />
                {formErrors.DisplayOrder && (
                  <p className="text-red-500 text-xs italic">
                    {formErrors.DisplayOrder}
                  </p>
                )}
              </div>
            </div>
            <div className="form-group">
              {axiosState.isApiError && (
                <p className="text-red-500 text-xs italic">
                  {axiosState.apiErrors.errorMessage}
                </p>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded"
            onClick={handleClose}
          >
            Close
          </button>
          {axiosState.loading ? (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              disabled
            >
              <svg
                className="animate-spin h-2 w-5 mr-3 ..."
                viewBox="0 0 20 20"
              ></svg>
              Processing...
            </button>
          ) : (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              form="stateModel"
            >
              {formSubmitButtonText}
            </button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};
