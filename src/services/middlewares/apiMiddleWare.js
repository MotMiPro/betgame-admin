import axiosService from "../apiService";
import { BASE_URL_API } from "../../configs/configs";
import { parseUrlToQuery } from "../../ultils/helpers/parseQuery";

//user
export const userLogin = (values) => {
  const url = `${BASE_URL_API}user/login`;
  return axiosService.post(url, values);
};
export const userUpdateStatus = (values, auth, query) => {
  const url = values
    ? `${BASE_URL_API}admin/user/update-state`
    : `${BASE_URL_API}admin/user/remove-2fa${parseUrlToQuery(query)}`;
  return values
    ? axiosService.put(url, values, auth)
    : axiosService.put(url, {}, auth);
};
export const getUserDetails = (header, query) => {
  const url = `${BASE_URL_API}admin/user${query}`;
  return axiosService.get(url, header);
};

export const exportData = (header, endpoint = "user/download-users") => {
  const url = `${BASE_URL_API}admin/${endpoint}`;
  return axiosService.get(url, header);
};

//admin
export const getStatisticOverview = (header) => {
  const url = `${BASE_URL_API}admin/overview`;
  return axiosService.get(url, header);
};

export const getFundApis = (header, endpoint = "overview", query) => {
  const url = query
    ? `${BASE_URL_API}admin/fund/${endpoint}${query}`
    : `${BASE_URL_API}admin/fund/${endpoint}`;
  return axiosService.get(url, header);
};

export const fundApis_edited = (header, body) => {
  const url = `${BASE_URL_API}admin/fund/overview`;
  return axiosService.post(url, body, header);
};
//affliate
export const getAffiliateOverview = (header) => {
  const url = `${BASE_URL_API}admin/affiliate/total-user-commission`;
  return axiosService.get(url, header);
};

export const getGameDaily = (header, values) => {
  const query = parseUrlToQuery(values);
  const url = `${BASE_URL_API}admin/game/daily-revenue${query}`;
  return axiosService.get(url, header);
};

export const getUserList = (body, header) => {
  const url = `${BASE_URL_API}admin/user/list`;
  return axiosService.post(url, body, header);
};

export const getFundHistory = (values, header, endPoint = "deposit") => {
  const url = `${BASE_URL_API}admin/fund/${endPoint}`;
  return axiosService.post(url, values, header);
};

export const userWithdrawalManager = (
  values,
  header,
  endpoint = "approve-withdrawal"
) => {
  const url = `${BASE_URL_API}admin/fund/${endpoint}`;
  return axiosService.post(url, values, header);
};

export const userAffiliates = (values, header, endPoint = "top-referral") => {
  const url = `${BASE_URL_API}admin/affiliate/${endPoint}`;
  return axiosService.post(url, values, header);
};

//table
export const getDataApis = (header, endpoint = "currency") => {
  const url = `${BASE_URL_API}table/${endpoint}`;
  return axiosService.get(url, header);
};

export const updateDataApis = (
  header,
  body,
  endpoint = "reward-commission",
  method
) => {
  const url = `${BASE_URL_API}table/${endpoint}`;
  switch (method) {
    case "delete":
      return axiosService.delete(url, body, header);
    case "put":
      return axiosService.put(url, body, header);

    default:
      return axiosService.post(url, body, header);
  }
};
//game
export const gameDataApis = (values, header, endPoint = "top-profit") => {
  const url = `${BASE_URL_API}admin/game/${endPoint}`;
  return axiosService.post(url, values, header);
};

export const getMyGames = (body, header, endPoint = "user-dice") => {
  const url = `${BASE_URL_API}admin/game/${endPoint}`;
  return axiosService.post(url, body, header);
};

//swap
export const getSwapDataApis = (header, body) => {
  const url = `${BASE_URL_API}admin/fund/swap`;
  return axiosService.post(url, body, header);
};
