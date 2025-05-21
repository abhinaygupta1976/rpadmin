import { FORM_ACTION_TYPE } from "../../utilities/ActionType";
export const countryReducer = (state, action) => {
  switch (action.type) {
    case FORM_ACTION_TYPE.CHANGE_INPUT:
      return {};
    case FORM_ACTION_TYPE.FORM_ERROR:
      return {};
    default:
      return state;
  }
};
