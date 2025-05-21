import { loadStatesByCountry } from "../services/StateService";
import { useQuery } from "@tanstack/react-query";
export const StateDropDownList = ({
  selectedCountry,
  selectedState,
  handleStateChange,
}) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["states", selectedCountry],
    queryFn: () => loadStatesByCountry(selectedCountry),
    //gcTime: 500,//cachetime in milisecond if we not define default is 5 min
    //staleTime: 50000, // default is 0 second 50000 means data is fresh for 5 second after that data is stale and api is call for fresh data
  });

  const handleChange = async (e) => {
    handleStateChange(e);
  };
  if (selectedCountry === 0) {
    return (
      <>
        <select
          name="StateId"
          value={selectedState}
          onChange={handleChange}
          select={selectedState}
          className="form-control"
        >
          <option value="0">Choose State...</option>
        </select>
      </>
    );
  }
  if (isLoading) {
    return (
      <>
        <select
          name="StateId"
          value={selectedState}
          onChange={handleChange}
          select={selectedState}
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
          name="StateId"
          value={selectedState}
          onChange={handleChange}
          select={selectedState}
          className="form-control"
        >
          <option value="0">{error.message}</option>
        </select>
      </>
    );
  }
  if (data && data.StatusCode !== 200) {
    return (
      <>
        <select
          name="StateId"
          value={selectedState}
          onChange={handleChange}
          select={selectedState}
          className="form-control"
        >
          <option value="0">Choose State...</option>
        </select>
      </>
    );
  }
  return (
    <>
      <select
        name="StateId"
        value={selectedState}
        onChange={handleChange}
        select={selectedState}
        className="form-control"
      >
        <option value="0">Choose State...</option>
        if (selectedCountry!==0 && data && data.StatusCode === 200 )
        {data.Data.map((state) => {
          return (
            <option key={state.StateId} value={state.StateId}>
              {state.StateName}
            </option>
          );
        })}
      </select>
    </>
  );
};
