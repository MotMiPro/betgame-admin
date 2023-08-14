import { pathName } from "../configs/settings";
import UserPages from "../Views/Containers/users";
import {
  AproveWithDraw,
  DepositFund,
  OverViewFund,
  SwapHistory,
  WithDrawFund,
} from "../Views/Containers/Fund";
import Dashboard from "../Views/Containers/dashboard";
import {
  GameDice,
  GameMoon,
  GameSlots,
  NewDiceGame,
  OverViewGames,
} from "../Views/Containers/games";
import Login from "../Views/Containers/Login";
import {
  AffiliateConfig,
  CoinConfig,
  GameAllConfig,
  SwapConfig,
} from "../Views/Containers/Configs";
import {
  AffiliatePages,
  TopCommissions,
  TopReferral,
} from "../Views/Containers/Affiliates";
import UserDetailsPage from "../Views/Containers/UserDetails";
import BotManager from "../Views/Containers/BOTs";

export const adminRoute = [
  {
    path: "/",
    component: () => <Dashboard />,
  },
  {
    path: pathName._USERS,
    component: () => <UserPages />,
  },
  {
    path: pathName._GAME_DICE,
    component: () => <GameDice />,
  },
  {
    path: pathName._GAME_SLOTS,
    component: () => <GameSlots />,
  },
  {
    path: pathName._GAME_NEW_DICE,
    component: () => <NewDiceGame />,
  },
  {
    path: pathName._GAME_MOON,
    component: () => <GameMoon />,
  },
  {
    path: pathName._AFFILIATE_OVERVIEW,
    component: () => <AffiliatePages />,
  },
  {
    path: pathName._AFFILIATE_TOP_COMMISSIONS,
    component: () => <TopCommissions />,
  },
  {
    path: pathName._AFFILIATE_TOP_REFUNDS,
    component: () => <TopReferral />,
  },
  {
    path: pathName._FUND_OVERVIEW,
    component: () => <OverViewFund />,
  },
  {
    path: pathName._FUND_WITHDRAW,
    component: () => <WithDrawFund />,
  },
  {
    path: pathName._FUND_DEPOSIT,
    component: () => <DepositFund />,
  },
  {
    path: pathName._FUND_APPROVED,
    component: () => <AproveWithDraw />,
  },
  {
    path: pathName._LOGIN,
    component: () => <Login />,
  },
  {
    path: pathName._GAME,
    component: () => <OverViewGames />,
  },
  {
    path: pathName._CONFIG_AFFILIATE,
    component: () => <AffiliateConfig />,
  },
  {
    path: pathName._CONFIG_COIN,
    component: () => <CoinConfig />,
  },
  {
    path: pathName._SWAP_PATH,
    component: () => <SwapConfig />,
  },
  {
    path: pathName._SWAP_HISTORY_PATH,
    component: () => <SwapHistory />,
  },
  {
    path: pathName._CONFIG_GAME,
    component: () => <GameAllConfig />,
  },
  {
    path: pathName._USER_DETAILS,
    component: () => <UserDetailsPage />,
  },
  {
    path: pathName._BOT_MANAGER_PATH,
    component: () => <BotManager />,
  },
];
