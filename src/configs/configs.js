import logo from "../assets/images/logo.png";
import { appColor } from "./settings";

import BTC from "../assets/images/coins/btc.svg";
import ETH from "../assets/images/coins/eth.svg";
import BIT from "../assets/images/coins/bitwin.svg";
import DAS from "../assets/images/coins/dash.svg";
import LIT from "../assets/images/coins/lite.svg";
import MON from "../assets/images/coins/monero.svg";

export const iconCollection = {
  0: BIT,
  1: BTC,
  2: ETH,
  3: MON,
  4: DAS,
  5: LIT,
};

export const LOGO = logo;

export const Color = {
  gray: "#f0f2f5",
};

export const timeFilterBy = {
  from: "00:00:00:00",
  to: "23:59:59:999",
};

export const cookieN = "_adminToken";
export const defaultCurrency = {
  USDT: "USDT",
};

export const BASE_URL_API = `${process.env.REACT_APP_BASE_URL}api/`;
export const SOCKET_BASE_API = `${process.env.REACT_APP_BASE_URL}`;

export const pagingSample = {
  data: [],
  column: [],
  pagination: {
    total: 1,
    current: 1,
    pageSize: 10,
  },
};
export const typeList = ["internal", "external"];

export const statusColor = {
  active: appColor.textPrimaryColorGreen,
  inactive: appColor.orange,
  block: appColor.gray,
  true: appColor.textPrimaryColorGreen,
  false: appColor.orange,
  edit: appColor.textPrimaryColorGreen,
  delete: appColor.red,
};

export const USDT = "USDT";
export const SPC = "SPC";

export const gameList = ["Dice", "Slots"];
export const currencyList = [USDT, SPC];
export const errorValues = [null, undefined, ""];
export const withdrawStatus = [
  "pending",
  "approved",
  "confirmed",
  "cancelled",
  "failed",
  "success",
];
