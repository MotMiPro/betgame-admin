export const pathName = {
  _DASHBOARD: "/",
  _USERS: "/users",
  _AFFILIATE_OVERVIEW: "/affiliate/overview",
  _AFFILIATE_TOP_REFUNDS: "/affiliate/top-refunds",
  _AFFILIATE_TOP_COMMISSIONS: "/affiliate/top-commision",
  _GAME_SLOTS: "/games/slots",
  _GAME_DICE: "/games/dice",
  _GAME_MOON: "/games/moon",
  _GAME_NEW_DICE: "/games/new-dice",
  _WALLETS: "/wallets",
  _LOGIN: "/login",
  _GAME: "/game",
  _FUND_OVERVIEW: "/fund/overview",
  _FUND_WITHDRAW: "/fund/withdraw",
  _FUND_DEPOSIT: "/fund/depodit",
  _FUND_APPROVED: "/fund/approved",
  _CONFIG_AFFILIATE: "/config/affiliate",
  _CONFIG_COIN: "/config/coin",
  _CONFIG_GAME: "/config/game",
  _USER_DETAILS: "/user-details/:userId",
  _USER_DETAILS_PATH: "/user-details/",
  _SWAP_PATH: "/config/swap",
  _SWAP_HISTORY_PATH: "/fund/swap",
  _BOT_MANAGER_PATH: "/bot-manager",
};

export const leftRouteSide = [
  {
    display_name: "dashboard",
    route: "/",
    icon: "fas fa-th-large",
  },
  {
    display_name: "users",
    route: pathName._USERS,
    icon: "fas fa-users",
  },

  {
    display_name: "fund",
    route: pathName._WALLETS,
    icon: "fas fa-wallet",
    subMenu: [
      {
        display_name: "overview",
        route: pathName._FUND_OVERVIEW,
        icon: "fas fa-dice",
      },
      {
        display_name: "deposit",
        route: pathName._FUND_DEPOSIT,
        icon: "fas fa-dice",
      },
      {
        display_name: "withdraw",
        route: pathName._FUND_WITHDRAW,
        icon: "fas fa-dice-d6",
      },
      {
        display_name: "aproved",
        route: pathName._FUND_APPROVED,
        icon: "fas fa-moon",
      },
      {
        display_name: "Swap",
        route: pathName._SWAP_HISTORY_PATH,
        icon: "fas fa-moon",
      },
    ],
  },
  {
    display_name: "affiliate",
    icon: "fas fa-asterisk",
    subMenu: [
      {
        display_name: "overview",
        route: pathName._AFFILIATE_OVERVIEW,
        icon: "fas fa-dice",
      },
      {
        display_name: "top commissions",
        route: pathName._AFFILIATE_TOP_COMMISSIONS,
        icon: "fas fa-dice",
      },
      {
        display_name: "top referral",
        route: pathName._AFFILIATE_TOP_REFUNDS,
        icon: "fas fa-dice-d6",
      },
    ],
  },
  {
    display_name: "Config",
    icon: "fas fa-asterisk",
    subMenu: [
      {
        display_name: "coin",
        route: pathName._CONFIG_COIN,
        icon: "fas fa-dice",
      },
      {
        display_name: "affiliate",
        route: pathName._CONFIG_AFFILIATE,
        icon: "fas fa-dice",
      },
      {
        display_name: "game",
        route: pathName._CONFIG_GAME,
        icon: "fas fa-dice-d6",
      },
      {
        display_name: "swap",
        route: pathName._SWAP_PATH,
        icon: "fas fa-dice-d6",
      },
    ],
  },
  {
    display_name: "games",
    route: "/games",
    icon: "fas fa-gamepad",
    subMenu: [
      {
        display_name: "overview",
        route: pathName._GAME,
        icon: "fas fa-dice",
      },
      {
        display_name: "dice",
        route: pathName._GAME_DICE,
        icon: "fas fa-dice",
      },
      {
        display_name: "slots",
        route: pathName._GAME_SLOTS,
        icon: "fas fa-dice-d6",
      },
      {
        display_name: "moon",
        route: pathName._GAME_MOON,
        icon: "fas fa-moon",
      },
      {
        display_name: "New Dice",
        route: pathName._GAME_NEW_DICE,
        icon: "fas fa-dice",
      },
    ],
  },
  {
    display_name: "BOT",
    route: pathName._BOT_MANAGER_PATH,
    icon: "fas fa-robot",
  },
];

export const appColor = {
  bgPrimaryColor: "#272931",
  bgSecondaryColorBrow: "#393C47",
  bgThirdColorDeepBrow: "#22252c",
  textPrimaryColorGreen: "#1da57a",
  textSecondaryColorGray: "#bbbec5",
  textWhiteColor: "#ffffff",
  borderPrimaryColor: "#34363d",
  // extends
  white: "#fff",
  black: "#000",
  black1: "rgba(0, 0, 0, 0.85)",
  red: "#d0011b",
  red1: "#ce0a24",
  red2: "#d0011b",
  lightgray: "#dddddd",
  lightgray3: "#f7f7f7",
  darkgray: "#202021",
  gray: "#4a4a4a", // text color
  gray2: "#f4f5f7",
  gray3: "#8e8e8e", // text color
  gray4: "#e7e9ec",
  gray9: "#858585",
  gray11: "#9b9b9b",
  blue: "#189eff",
  blue2: "#007bff",
  orange: "#f57224",
  deepBrow: "#34495e",
  violet: "#8e44ad",
};

export const tabKeys = {
  _FUND: "FUND",
  _AFFILIATE: "AFFILIATE",
  _DEPOSIT: "DEPOSIT",
  _WITHDRAW: "WITHDRAW",
  _ACTIVITIES: "ACTIVITIES",
  _BALANCES: "BALANCES",
  _DICEGAME: "DICEGAME",
  _SLOTSGAME: "SLOTSGAME",
  _MOONGAME: "MOONGAME",
  _NEW_DICEGAME: "NEW_DICEGAME",
};
const paginTemp = { total: 1, current: 1, pageSize: 10 };

export const userDetailsTabs = [
  {
    title: "Funds",
    keyword: tabKeys._FUND,
    column: [],
    data: [],
    pagin: paginTemp,
  },
  {
    title: "Affiliates",
    keyword: tabKeys._AFFILIATE,
    column: [],
    data: [],
    pagin: paginTemp,
  },
  {
    title: "Balances",
    keyword: tabKeys._BALANCES,
    column: [],
    data: [],
    pagin: paginTemp,
  },
  {
    title: "Deposits",
    keyword: tabKeys._DEPOSIT,
    column: [],
    data: [],
    pagin: paginTemp,
  },
  {
    title: "Withdraws",
    keyword: tabKeys._WITHDRAW,
    column: [],
    data: [],
    pagin: paginTemp,
  },
  {
    title: "Dice",
    keyword: tabKeys._DICEGAME,
    column: [],
    data: [],
    pagin: paginTemp,
  },
  {
    title: "Slots",
    keyword: tabKeys._SLOTSGAME,
    column: [],
    data: [],
    pagin: paginTemp,
  },
  {
    title: "Moon",
    keyword: tabKeys._MOONGAME,
    column: [],
    data: [],
    pagin: paginTemp,
  },
  {
    title: "New Dice",
    keyword: tabKeys._NEW_DICEGAME,
    column: [],
    data: [],
    pagin: paginTemp,
  },
  {
    title: "Activities",
    keyword: tabKeys._ACTIVITIES,
    column: [],
    data: [],
    pagin: paginTemp,
  },
];
