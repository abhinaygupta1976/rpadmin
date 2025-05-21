import { useMutation } from "@tanstack/react-query";
import { useContext, useState, useEffect, useReducer } from "react";
import { useLocation, useNavigate, useParams, NavLink } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";
import {
  getAllCityPictures,
  deleteCityPicture,
} from "../../services/CityPictureService";
import DataTable from "react-data-table-component";
import { AddCityPicture } from "./AddCityPicture";
import { Button, Modal } from "react-bootstrap";
import { deleteImage } from "../../services/CloudinaryService";
import { INITIAL_STATE_AXIOS } from "../../reducer/InitialState";
import { AXIOS_ACTION_TYPE } from "../../reducer/ActionType";
import {
  axiosReducerCityPictureGet,
  axiosReducerCityPictureDelete,
} from "../../reducer/axiosReducerCityPicture";

import Spinner from "react-bootstrap/Spinner";
export const CityPicture = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const [cityPictures, setCityPictures] = useState([]);
  const [filterCityPictures, setFilterCityPictures] = useState([]);
  const [searchCityPicture, setSearchCityPicture] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const { cityId } = useParams();
  const [axiosStateCityPictureGet, dispatchCityPictureGet] = useReducer(
    axiosReducerCityPictureGet,
    INITIAL_STATE_AXIOS
  );
  const [axiosStateCityPictureDelete, dispatchCityPictureDelete] = useReducer(
    axiosReducerCityPictureDelete,
    INITIAL_STATE_AXIOS
  );
  //const queryClient = useQueryClient();
  //const { data, isLoading, isError, error } = useQuery({
  // queryKey: ["cityPictures", cityId],
  // queryFn: () => getAllCityPictures(cityId),
  //queryFn: getAllCityPictures(),
  //gcTime: 500,//cachetime in milisecond if we not define default is 5 min
  // staleTime: 50000, // default is 0 second 50000 means data is fresh for 5 second after that data is stale and api is call for fresh data
  //});
  const loadAllCityPictures = async () => {
    try {
      dispatchCityPictureGet({
        type: AXIOS_ACTION_TYPE.AXIOS_START,
      });
      const response = await getAllCityPictures(cityId);

      if (response.status === 200 && response.data.StatusCode === 200) {
        dispatchCityPictureGet({
          type: AXIOS_ACTION_TYPE.AXIOS_SUCCESS,
        });
        setCityPictures(response.data.Data);
        setFilterCityPictures(response.data.Data);
      } else {
        const errors = {
          errorCode: response.data.StatusCode,
          errorMessage: response.data.Message,
        };
        dispatchCityPictureGet({
          type: AXIOS_ACTION_TYPE.AXIOS_ERROR,
          payload: { apiErrors: errors },
        });
        if (response.data.StatusCode === 401) {
          setLoggedIn(false);
          localStorage.clear();
          dispatchCityPictureGet({
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
      dispatchCityPictureGet({
        type: AXIOS_ACTION_TYPE.AXIOS_ERROR,
        payload: { apiErrors: errors },
      });
      if (error.status === 401) {
        setLoggedIn(false);
        localStorage.clear();
        dispatchCityPictureGet({
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
    if (searchCityPicture != "") {
      const tableData = cityPictures?.filter((item) => {
        return (
          searchCityPicture &&
          item.PictureTypeName.toLowerCase().match(
            searchCityPicture.toLowerCase()
          )
        );
      });
      setFilterCityPictures(tableData);
    } else {
      setFilterCityPictures(cityPictures);
    }
  }, [searchCityPicture]);

  useEffect(() => {
    loadAllCityPictures(cityId);
  }, []);
  const handleSearchChange = (e) => {
    setSearchCityPicture(e.target.value);
  };
  const handleRowDelete = (row) => {
    setSelectedRow(row);
    setShowConfirmation(true);
  };
  const confirmDelete = async () => {
    try {
      dispatchCityPictureDelete({
        type: AXIOS_ACTION_TYPE.AXIOS_START,
      });
      const response = await deleteImage(selectedRow.PicturePublicId);
      if (response.status === 200) {
        deleteMutation.mutate(selectedRow.CityPictureId);
      }
    } catch (error) {
      const errors = {
        errorCode: error.status,
        errorMessage: error.message,
      };
      dispatchCityPictureDelete({
        type: AXIOS_ACTION_TYPE.AXIOS_ERROR,
        payload: { apiErrors: errors },
      });
      if (error.status === 401) {
        setLoggedIn(false);
        localStorage.clear();
        dispatchCityPictureDelete({
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

  const deleteMutation = useMutation({
    mutationFn: (cityPictureId) => deleteCityPicture(cityPictureId),
    onSuccess: (response, cityPictureId) => {
      if (response.status === 200 && response.data.StatusCode === 200) {
        setSearchCityPicture("");
        let filterData = cityPictures.filter((item) => {
          return item.CityPictureId != cityPictureId;
        });
        setCityPictures(filterData);
        setFilterCityPictures(filterData);
        dispatchCityPictureDelete({
          type: AXIOS_ACTION_TYPE.AXIOS_SUCCESS,
        });
        setShowConfirmation(false);
      } else {
        const errors = {
          errorCode: response.data.StatusCode,
          errorMessage: response.data.Message,
        };
        dispatchCityPictureDelete({
          type: AXIOS_ACTION_TYPE.AXIOS_ERROR,
          payload: { apiErrors: errors },
        });
        if (response.data.StatusCode === 401) {
          setLoggedIn(false);
          localStorage.clear();
          dispatchCityPictureDelete({
            type: AXIOS_ACTION_TYPE.AXIOS_RESET,
          });
          navigate("/login", {
            state: {
              previousUrl: location.pathname,
            },
          });
        }
      }
    },
    onError: (error) => {
      const errors = {
        errorCode: error.status,
        errorMessage: error.message,
      };
      dispatchCityPictureDelete({
        type: AXIOS_ACTION_TYPE.AXIOS_ERROR,
        payload: { apiErrors: errors },
      });
      if (error.status === 401) {
        setLoggedIn(false);
        localStorage.clear();
        dispatchCityPictureDelete({
          type: AXIOS_ACTION_TYPE.AXIOS_RESET,
        });
        navigate("/login", {
          state: {
            previousUrl: location.pathname,
          },
        });
      }
    },
  });
  const getAddedCityPicture = async (addedCityPicture) => {
    setSearchCityPicture("");
    let updatedRecord = [...cityPictures, addedCityPicture];
    console.log("updatedRecord", updatedRecord);
    setCityPictures(updatedRecord);
    setFilterCityPictures(updatedRecord);
  };
  const columns = [
    {
      name: "Picture Type",
      selector: (row) => row.PictureTypeName,
      sortable: true,
    },
    {
      name: "Dispaly Order",
      selector: (row) => row.DisplayOrder,
    },
    {
      name: "AltTag",
      selector: (row) => row.AltTag,
    },
    {
      name: "Title",
      selector: (row) => row.Title,
    },
    {
      name: "City Picture",
      selector: (row) => <img width={50} height={50} src={row.PictureUrl} />,
    },

    {
      name: "Actions",
      cell: (row) => (
        <Button variant="danger" onClick={() => handleRowDelete(row)}>
          Delete
        </Button>
      ),
    },
  ];

  if (axiosStateCityPictureGet.isApiError) {
    return (
      <div className="alert alert-danger" role="alert">
        Errorrs :{""}
        {axiosStateCityPictureGet.apiErrors.errorMessage ||
          "some thing went wrong !!"}
      </div>
    );
  }
  return (
    <>
      <DataTable
        title="City Pictures"
        columns={columns}
        data={filterCityPictures}
        progressPending={axiosStateCityPictureGet.loading}
        progressComponent={<Spinner animation="border" variant="success" />}
        fixedHeader
        fixedHeaderScrollHeight="450px"
        pagination
        highlightOnHover
        actions={
          <AddCityPicture
            cityId={cityId}
            getAddedCityPicture={getAddedCityPicture}
          />
        }
        subHeader
        subHeaderComponent={
          <input
            type="text"
            placeholder="Enter picture type to search.."
            className="form-control"
            name="PictureTypeName"
            value={searchCityPicture}
            onChange={handleSearchChange}
          />
        }
      />
      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
        {axiosStateCityPictureDelete.isApiError && (
          <p className="text-red-500 text-xs italic">
            {axiosStateCityPictureDelete.apiErrors.errorMessage}
          </p>
        )}
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmation(false)}
          >
            Cancel
          </Button>
          {axiosStateCityPictureDelete.loading ? (
            <Button variant="danger" disabled>
              <svg
                className="animate-spin h-2 w-5 mr-3 ..."
                viewBox="0 0 20 20"
              ></svg>
              Processing...
            </Button>
          ) : (
            <Button variant="danger" onClick={confirmDelete}>
              Delete
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};
