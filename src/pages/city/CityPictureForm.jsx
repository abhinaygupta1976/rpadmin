import React from "react";
import Modal from "react-bootstrap/Modal";
import { PictureTypeDropDownList } from "../../components/PictureTypeDropDown";
export const CityPictureForm = ({
  handleChangeInput,
  handleChangeInputFile,
  handleSubmitForm,
  handleCloseModel,
  handleShowModel,
  show,
  formValues,
  formErrors,
  formSubmitButtonText,
  formTitle,
  axiosState,
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
  const handleCityPictureChange = async (e) => {
    handleChangeInputFile(e);
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
            className="btn btn-sm btn-info"
          >
            + Add City Picture
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
          <form onSubmit={handleSubmit} id="cityPictureModel">
            <div className="row">
              <div className="col-md-6 m-2">
                <label htmlFor="PictureTypeId" className="m-2">
                  Picture Type
                </label>

                <PictureTypeDropDownList
                  selectedPictureType={formValues.PictureTypeId}
                  handlePictureTypeChange={handleChange}
                />

                {formErrors.PictureType && (
                  <p className="text-red-500 text-xs italic">
                    {formErrors.PictureType}
                  </p>
                )}
              </div>
              <div className="col-md-4 m-2">
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
            <div className="row">
              <div className="col-md-10 m-2">
                <label htmlFor="CityImage" className="m-2">
                  Browse City Picture
                </label>

                <input
                  className="form-control"
                  name="CityImage"
                  type="file"
                  accept="images/*"
                  onChange={handleCityPictureChange}
                />
                {formErrors.Picture && (
                  <p className="text-red-500 text-xs italic">
                    {formErrors.Picture}
                  </p>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-5 m-2">
                <label htmlFor="AltTag" className="m-2">
                  Alt Tag
                </label>
                <input
                  className="form-control"
                  name="AltTag"
                  type="text"
                  value={formValues.AltTag}
                  onChange={handleChange}
                  placeholder="Enter alt tag"
                />
                {formErrors.AltTag && (
                  <p className="text-red-500 text-xs italic">
                    {formErrors.AltTag}
                  </p>
                )}
              </div>
              <div className="col-md-5 m-2">
                <label htmlFor="Title" className="m-2">
                  Title
                </label>
                <input
                  className="form-control"
                  name="Title"
                  type="text"
                  value={formValues.Title}
                  onChange={handleChange}
                  placeholder="Enter image title"
                />
                {formErrors.Title && (
                  <p className="text-red-500 text-xs italic">
                    {formErrors.Title}
                  </p>
                )}
              </div>
            </div>
            <div className="row">
              <div className="form-group">
                {axiosState.isApiError && (
                  <p className="text-red-500 text-xs italic">
                    {axiosState.apiErrors.errorMessage}
                  </p>
                )}
              </div>
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
              form="cityPictureModel"
            >
              {formSubmitButtonText}
            </button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};
