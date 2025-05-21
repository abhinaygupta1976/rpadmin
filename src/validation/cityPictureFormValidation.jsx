export const cityPictureFormValidation = (values) => {
  const errors = {};
  if (values.PictureTypeId <= 0)
    errors.PictureType = "please select picture type.";
  if (values.DisplayOrder < 0)
    errors.DisplayOrder = "disply order value must be greater than 0 ! ";
  if (values.CityId <= 0) errors.City = "please select city.";
  if (!values.PictureURL || !values.PicturePublicId)
    errors.Picture = "please upload picture ! ";
  if (!values.AltTag) errors.AltTag = "please enter alt tag ! ";
  else if (values.AltTag.length < 6) {
    errors.AltTag = "alt tag value must be  greater than 6 character !";
  }
  if (!values.Title) errors.Title = "please enter title ! ";
  else if (values.Title.length < 10) {
    errors.Title = "alt tag value must be  greater than 10 character !";
  }
  return errors;
};
