import * as types from "./types";
const initialState = {
  isLoggedIn: false,
  infos: null,
  authHeader: null,
};

const authentication = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        infos: action.payload,
        authHeader: { Authorization: "Bearer " + action?.payload?._token },
      };

    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
};
export default authentication;
