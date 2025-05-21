import React from "react";
import { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
export const CountryForm = ({
  handleChangeInput,
  handleSubmitForm,
  handleCloseModel,
  handleShowModel,
  formValues,
  show,
  formSubmitButtonText,
  formTitle,
  axiosState,
  formErrors,
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
        <button
          type="button"
          onClick={handleShow}
          className="block mx-auto m-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          + Add Country
        </button>
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
          <form
            onSubmit={handleSubmit}
            id="countryModel"
            className="w-full max-w-sm"
          >
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="CountryName"
                >
                  Country Name
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  name="CountryName"
                  type="text"
                  value={formValues.CountryName}
                  onChange={handleChange}
                  placeholder="country name"
                />
                {formErrors.CountryName && (
                  <p className="text-red-500 text-xs italic">
                    {formErrors.CountryName}
                  </p>
                )}
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="CountryCode"
                >
                  Country Code
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  name="CountryCode"
                  type="text"
                  value={formValues.CountryCode}
                  onChange={handleChange}
                  placeholder="country code"
                />
                {formErrors.CountryCode && (
                  <p className="text-red-500 text-xs italic">
                    {formErrors.CountryCode}
                  </p>
                )}
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="DisplayOrder"
                >
                  DisplayOrder
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
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
            <div className="md:flex md:items-center mb-6">
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
              form="countryModel"
            >
              {formSubmitButtonText}
            </button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};
