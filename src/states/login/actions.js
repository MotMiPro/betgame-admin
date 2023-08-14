import * as loginTypes from "./types";

export const userLoggedIn = (payload) => ({
  type: loginTypes.LOGIN_SUCCESS,
  payload,
});
export const userLoggedOut = () => ({
  type: loginTypes.LOGOUT,
});
