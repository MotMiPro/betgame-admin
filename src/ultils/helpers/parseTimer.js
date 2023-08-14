import moment from "moment";

export const parseTimer = (time) => {
  return moment(time).format("YYYY-MM-DD");
};

export const dateFormat = "YYYY/MM/DD";
