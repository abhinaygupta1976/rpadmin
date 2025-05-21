import React, { useEffect } from "react";

import { CountryDropDownList } from "../../components/CountryDropDownList";
import { StateDropDownList } from "../../components/StateDropDownList";
export const CityForm = ({
  handleChangeInput,
  handleChangeCheckbox,
  handleSubmitForm,
  formValues,
  formErrors,
  axiosState,
}) => {
  const handleChange = async (e) => {
    handleChangeInput(e);
  };
  const handleCheckboxChange = (e) => {
    handleChangeCheckbox(e);
  };
  const handleSubmit = async (e) => {
    handleSubmitForm(e);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-4 m-2">
          <label htmlFor="CountryId">Country</label>
          <CountryDropDownList
            selectedCountry={formValues.CountryId}
            handleCountryChange={handleChange}
          />
          {formErrors.Country && (
            <p className="text-red-500 text-xs italic">{formErrors.Country}</p>
          )}
        </div>
        <div className="col-md-4 m-2">
          <label htmlFor="StateId">State</label>
          <StateDropDownList
            selectedCountry={formValues.CountryId}
            selectedState={formValues.StateId}
            handleStateChange={handleChange}
          />

          {formErrors.State && (
            <p className="text-red-500 text-xs italic">{formErrors.State}</p>
          )}
        </div>
      </div>

      <div className="row">
        <div className="col-md-4 m-2">
          <label htmlFor="CityName">City</label>
          <input
            type="text"
            className="form-control"
            name="CityName"
            value={formValues.CityName}
            onChange={handleChange}
          />
          {formErrors.CityName && (
            <p className="text-red-500 text-xs italic">{formErrors.CityName}</p>
          )}
        </div>
        <div className="col-md-4 m-2">
          <label htmlFor="DisplayOrder">Display Order</label>
          <input
            type="number"
            className="form-control"
            name="DisplayOrder"
            value={formValues.DisplayOrder}
            onChange={handleChange}
          />
          {formErrors.DisplayOrder && (
            <p className="text-red-500 text-xs italic">
              {formErrors.DisplayOrder}
            </p>
          )}
        </div>
      </div>

      <div className="row">
        <div className="col-md-1 m-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="TopCity"
              checked={formValues.TopCity}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="TopCity">
              Top City
            </label>
          </div>
        </div>
        <div className="col-md-2 m-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="ShowOnHomePage"
              checked={formValues.ShowOnHomePage}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="ShowOnHomePage">
              Show On Home Page
            </label>
          </div>
        </div>
        <div className="col-md-2 m-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="ShowOnFooter"
              checked={formValues.ShowOnFooter}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="ShowOnFooter">
              Show On Footer
            </label>
          </div>
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
      <button type="submit" className="btn btn-primary m-2">
        Save
      </button>
    </form>
  );
};
