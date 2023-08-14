import { statusColor } from "../configs/configs";

export const getColor = (status) => {
  return statusColor[status];
};
