import { useEffect, useContext, useReducer, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";
import { INITIAL_STATE_AXIOS } from "../../reducer/InitialState";
import { AXIOS_ACTION_TYPE } from "../../reducer/ActionType";
import { axiosReducer } from "../../reducer/axiosReducer";
import { getAllCities } from "../../services/CityService";

import { getAllStates } from "../../services/StateService";
import DataTable from "react-data-table-component";
import Spinner from "react-bootstrap/Spinner";
export const City = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const [axiosState, dispatch] = useReducer(axiosReducer, INITIAL_STATE_AXIOS);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [filterCities, setFilterCities] = useState([]);
  const [searchRequest, setSearchRequest] = useState({
    CityName: "",
    StateId: 0,
  });
  const loadAllStates = async () => {
    try {
      dispatch({
        type: AXIOS_ACTION_TYPE.AXIOS_START,
      });
      const response = await getAllStates();

      if (response.status === 200 && response.data.StatusCode === 200) {
        dispatch({
          type: AXIOS_ACTION_TYPE.AXIOS_SUCCESS,
        });
        setStates(response.data.Data);
      } else {
        const errors = {
          errorCode: response.data.StatusCode,
          errorMessage: response.data.Message,
        };
        dispatch({
          type: AXIOS_ACTION_TYPE.AXIOS_ERROR,
          payload: { apiErrors: errors },
        });
        if (response.data.StatusCode === 401) {
          setLoggedIn(false);
          localStorage.clear();
          dispatch({
            type: AXIOS_ACTION_TYPE.AXIOS_RESET,
          });
          navigate("/login", {
            state: {
              previousUrl: location.pathname,
            },
          });
        }
      }
    } catch (error) {
      const errors = {
        errorCode: error.status,
        errorMessage: error.message,
      };
      dispatch({
        type: AXIOS_ACTION_TYPE.AXIOS_ERROR,
        payload: { apiErrors: errors },
      });
      if (error.status === 401) {
        setLoggedIn(false);
        localStorage.clear();
        dispatch({
          type: AXIOS_ACTION_TYPE.AXIOS_RESET,
        });
        navigate("/login", {
          state: {
            previousUrl: location.pathname,
          },
        });
      }
    }
  };
  const loadAllCities = async () => {
    try {
      dispatch({
        type: AXIOS_ACTION_TYPE.AXIOS_START,
      });
      const response = await getAllCities();

      if (response.status === 200 && response.data.StatusCode === 200) {
        dispatch({
          type: AXIOS_ACTION_TYPE.AXIOS_SUCCESS,
        });
        setCities(response.data.Data);
        setFilterCities(response.data.Data);
      } else {
        const errors = {
          errorCode: response.data.StatusCode,
          errorMessage: response.data.Message,
        };
        dispatch({
          type: AXIOS_ACTION_TYPE.AXIOS_ERROR,
          payload: { apiErrors: errors },
        });
        if (response.data.StatusCode === 401) {
          setLoggedIn(false);
          localStorage.clear();
          dispatch({
            type: AXIOS_ACTION_TYPE.AXIOS_RESET,
          });
          navigate("/login", {
            state: {
              previousUrl: location.pathname,
            },
          });
        }
      }
    } catch (error) {
      const errors = {
        errorCode: error.status,
        errorMessage: error.message,
      };
      dispatch({
        type: AXIOS_ACTION_TYPE.AXIOS_ERROR,
        payload: { apiErrors: errors },
      });
      if (error.status === 401) {
        setLoggedIn(false);
        localStorage.clear();
        dispatch({
          type: AXIOS_ACTION_TYPE.AXIOS_RESET,
        });
        navigate("/login", {
          state: {
            previousUrl: location.pathname,
          },
        });
      }
    }
  };

  useEffect(() => {
    loadAllStates();
    loadAllCities();
  }, []);

  const handleSearchChange = (e) => {
    setSearchRequest({
      ...searchRequest,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const tableData = cities.filter((item) => {
      if (searchRequest.CityName && searchRequest.StateId > 0) {
        return (
          item.CityName.toLowerCase().match(
            searchRequest.CityName.toLowerCase()
          ) && item.StateId == searchRequest.StateId
        );
      } else if (searchRequest.CityName) {
        return item.CityName.toLowerCase().match(
          searchRequest.CityName.toLowerCase()
        );
      } else if (searchRequest.StateId > 0) {
        return item.StateId == searchRequest.StateId;
      } else return item;
    });
    setFilterCities(tableData);
  };
  const columns = [
    {
      name: "City Name",
      selector: (row) => row.CityName,
      sortable: true,
    },
    {
      name: "Dispaly Order",
      selector: (row) => row.DisplayOrder,
    },
    {
      name: "Action",
      cell: (row) => (
        <NavLink
          className="text-blue-500 hover:text-blue-800"
          to={`/admin/directory/city/${row.CityId}`}
          state={{ prevPath: location.pathname }}
        >
          Edit
        </NavLink>
      ),
    },
  ];
  return (
    <>
      <DataTable
        title="City List"
        columns={columns}
        data={filterCities}
        progressPending={axiosState.loading}
        progressComponent={<Spinner animation="border" variant="success" />}
        fixedHeader
        fixedHeaderScrollHeight="450px"
        pagination
        highlightOnHover
        actions={
          <NavLink
            className="text-blue-500 hover:text-blue-800"
            to={`/admin/directory/addcity`}
            state={{ prevPath: location.pathname }}
          >
            <button
              type="button"
              name="btnAddCity"
              className="btn btn-sm btn-info"
            >
              +Add City
            </button>
          </NavLink>
        }
        subHeader
        subHeaderComponent={
          <form onSubmit={handleSearchSubmit}>
            <div class="row">
              <div class="col-md-5">
                <select
                  type="text"
                  className="form-control"
                  name="StateId"
                  value={searchRequest.StateId}
                  onChange={handleSearchChange}
                  select={searchRequest.StateId}
                >
                  <option value="0">-Select State -</option>
                  if(states)
                  {states.map((state) => {
                    return (
                      <option key={state.StateName} value={state.StateId}>
                        {state.StateName}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div class="col-md-5">
                <input
                  type="text"
                  placeholder="Enter city name"
                  className="form-control"
                  name="CityName"
                  value={searchRequest.CityName}
                  onChange={handleSearchChange}
                />
              </div>
              <div class="col-md-2">
                <button type="submit" className="btn btn-sm btn-info">
                  Search
                </button>
              </div>
            </div>
          </form>
        }
        subHeaderAlign="left"
      />
    </>
  );
};
