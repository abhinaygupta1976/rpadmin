export const stateFormValidation = (values) => {
  const errors = {};
  // const regexAlphabetOnly = /^[A-Za-z, ]+$/;
  const regexAlphabetOnly = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;
  if (!values.StateName) errors.StateName = "state name is required ! ";
  else if (values.StateName.length < 3) {
    errors.StateName = "state name value must be  greater than 2 character !";
  } else if (!regexAlphabetOnly.test(values.StateName))
    errors.StateName = "only alphabet allowed in state name !";

  if (values.CountryId <= 0) errors.CountryName = "please select country.";

  if (values.DisplayOrder < 0)
    errors.DisplayOrder = "disply order value must be greater than 0 ! ";
  return errors;
};
