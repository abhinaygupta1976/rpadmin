export const countryFormValidation = (values) => {
  const errors = {};
  const regexAlphabetOnly = /^[A-Za-z]+$/;
  if (!values.CountryName) errors.CountryName = "country name is required ! ";
  else if (values.CountryName.length < 3) {
    errors.CountryName =
      "country name value must be  greater than 2 character !";
  } else if (!regexAlphabetOnly.test(values.CountryName))
    errors.CountryName = "only alphabet allowed in country name !";
  if (!values.CountryCode) errors.CountryCode = "country code is required ! ";
  else if (values.CountryCode.length != 2)
    errors.CountryCode = "country code value must be 2 character long ! ";
  else if (!regexAlphabetOnly.test(values.CountryCode))
    errors.CountryCode = "only alphabet allowed in country code !";
  if (values.DisplayOrder < 0)
    errors.DisplayOrder = "disply order value must be greater than 0 ! ";
  return errors;
};
