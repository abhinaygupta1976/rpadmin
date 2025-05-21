export const cityFormValidation = (values) => {
  const errors = {};
  const regexAlphabetOnly = /^[A-Za-z]+$/;
  if (!values.CityName) errors.CityName = "city name is required ! ";
  else if (values.CityName.length < 3) {
    errors.CityName = "city name value must be  greater than 2 character !";
  } else if (!regexAlphabetOnly.test(values.CityName))
    errors.CityName = "only alphabet allowed in city name !";

  if (values.DisplayOrder < 0)
    errors.DisplayOrder = "disply order value must be greater than 0 ! ";
  return errors;
};
