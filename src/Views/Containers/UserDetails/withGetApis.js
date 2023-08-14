import {
  withData,
  withColumn,
  withAfColumn,
  withDeColumn,
  withDrawColumn,
  withBaColumn,
  withDiceColumn,
  withGameData,
  withSlotsColumn,
  withFundData,
  withMoonColumn,
  withNewDiceColumn,
} from "./withFundColumns";
import {
  gameDataApis,
  getFundApis,
  getFundHistory,
  userAffiliates,
} from "../../../services/middlewares/apiMiddleWare";
import { parseUrlToQuery } from "../../../ultils/helpers/parseQuery";
import { tabKeys } from "../../../configs/settings";

const convertDataToArr = ({ data }) => {
  data.key = Math.random();
  return [data];
};

export const handleGetDataApis = async (type, id, token, body) => {
  let keyword = type,
    dataSuccess = [],
    columnSuccess = [],
    pagination = {},
    state = false;
  switch (type) {
    case tabKeys._FUND:
      const { data } = await getFundApis(
        token,
        "all-fund",
        parseUrlToQuery(id)
      );
      if (data?.success) {
        const getDataConverted = convertDataToArr(data);
        if (getDataConverted?.length) {
          dataSuccess = withFundData(getDataConverted);
          columnSuccess = withColumn();
        }
        state = true;
      }
      break;

    case tabKeys._AFFILIATE:
      const { data: members } = await userAffiliates(
        body,
        token,
        "get-members"
      );
      if (members?.success) {
        dataSuccess = withData(members?.data?.members);
        columnSuccess = withAfColumn();
        state = true;
      }
      break;

    case tabKeys._DEPOSIT:
      const { data: deposit } = await getFundHistory(body, token, "deposit");
      if (deposit?.success) {
        dataSuccess = withData(deposit?.data?.data);
        columnSuccess = withDeColumn();
        state = true;
      }
      break;

    case tabKeys._WITHDRAW:
      const { data: withdraw } = await getFundHistory(body, token, "withdraw");
      if (withdraw?.success) {
        dataSuccess = withData(withdraw?.data?.data);
        columnSuccess = withDrawColumn();
        state = true;
      }
      break;
    case tabKeys._BALANCES:
      const { data: balance } = await getFundHistory(
        body,
        token,
        "balance-history"
      );
      if (balance?.success) {
        const { data: balanceData, limit, page, total } = balance?.data;
        dataSuccess = withData(balanceData);
        columnSuccess = withBaColumn();
        pagination = {
          limit,
          page,
          total,
        };
        state = true;
      }
      break;
    case tabKeys._DICEGAME:
      const addDiceBody = {
        ...body,
        sortBy: {
          createdAt: -1,
        },
      };
      const { data: diceData } = await gameDataApis(
        addDiceBody,
        token,
        "user-dice"
      );
      if (diceData?.success) {
        const { data: dice, limit, page, total } = diceData?.data;
        dataSuccess = withGameData(dice);
        columnSuccess = withDiceColumn();
        pagination = {
          limit,
          page,
          total,
        };
        state = true;
      }
      break;
    case tabKeys._NEW_DICEGAME:
      const addNewDiceBody = {
        ...body,
        sortBy: {
          createdAt: -1,
        },
      };
      const { data: newDiceData } = await gameDataApis(
        addNewDiceBody,
        token,
        "user-new-dice"
      );
      if (newDiceData?.success) {
        const { data: newDice, limit, page, total } = newDiceData?.data;
        dataSuccess = withGameData(newDice);
        columnSuccess = withNewDiceColumn();
        pagination = {
          limit,
          page,
          total,
        };
        state = true;
      }
      break;
    case tabKeys._SLOTSGAME:
      const addBody = {
        ...body,
        sortBy: {
          createdAt: -1,
        },
      };
      const { data: slotData } = await gameDataApis(
        addBody,
        token,
        "user-slot"
      );
      if (slotData?.success) {
        const { data: slots, limit, page, total } = slotData?.data;
        dataSuccess = withGameData(slots);
        columnSuccess = withSlotsColumn();
        pagination = {
          limit,
          page,
          total,
        };
        state = true;
      }
      break;
    case tabKeys._MOONGAME:
      const addMoonBody = {
        ...body,
        sortBy: {
          createdAt: -1,
        },
      };
      const { data: moonData } = await gameDataApis(
        addMoonBody,
        token,
        "user-moon"
      );
      if (moonData?.success) {
        const { data: moon, limit, page, total } = moonData?.data;
        dataSuccess = withGameData(moon);
        columnSuccess = withMoonColumn();
        pagination = {
          limit,
          page,
          total,
        };
        state = true;
      }
      break;

    default:
      dataSuccess = [];
      columnSuccess = [];
      state = false;
      break;
  }

  return { keyword, dataSuccess, columnSuccess, pagination, state };
};
