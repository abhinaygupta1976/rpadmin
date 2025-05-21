import { loadCountries } from "../services/CountryService";
import { useQuery } from "@tanstack/react-query";
export const CountryDropDownList = ({
  selectedCountry,
  handleCountryChange,
}) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["countries"],
    queryFn: loadCountries,
  });

  const handleChange = async (e) => {
    handleCountryChange(e);
  };
  if (isLoading) {
    return (
      <>
        <select
          name="CountryId"
          value={selectedCountry}
          onChange={handleChange}
          select={selectedCountry}
          className="form-control"
        >
          <option value="0">loading...</option>
        </select>
      </>
    );
  }
  if (isError) {
    return (
      <>
        <select
          name="CountryId"
          value={selectedCountry}
          onChange={handleChange}
          select={selectedCountry}
          className="form-control"
        >
          <option value="0">{error.message}</option>
        </select>
      </>
    );
  }
  if (data && data.StatusCode !== 200 && data.StatusCode !== 401) {
    return (
      <>
        <select
          name="CountryId"
          value={selectedCountry}
          onChange={handleChange}
          select={selectedCountry}
          className="form-control"
        >
          <option value="0">data.Message</option>
        </select>
      </>
    );
  }
  return (
    <>
      <select
        name="CountryId"
        value={selectedCountry}
        onChange={handleChange}
        select={selectedCountry}
        className="form-control"
      >
        <option value="0">Choose Country...</option>
        if(data && data.StatusCode === 200 )
        {data.Data.map((country) => {
          return (
            <option key={country.CountryId} value={country.CountryId}>
              {country.CountryName}
            </option>
          );
        })}
      </select>
    </>
  );
};
