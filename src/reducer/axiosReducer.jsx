import { AXIOS_ACTION_TYPE } from "./ActionType";
export const axiosReducer = (state, action) => {
  switch (action.type) {
    case AXIOS_ACTION_TYPE.AXIOS_START:
      return {
        loading: true,
        apiErrors: {},
        isApiError: false,
      };
    case AXIOS_ACTION_TYPE.AXIOS_SUCCESS:
      return {
        loading: false,
        apiErrors: {},
        isApiError: false,
      };
    case AXIOS_ACTION_TYPE.AXIOS_ERROR:
      return {
        loading: false,
        apiErrors: action.payload.apiErrors,
        isApiError: true,
      };
    case AXIOS_ACTION_TYPE.AXIOS_RESET:
      return {
        loading: false,
        apiErrors: {},
        isApiError: false,
      };
    default:
      return state;
  }
};
