import React, { useCallback, useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import { RootContext } from "../../../../ContextApp";
import {
  fundApis_edited,
  getDataApis,
  updateDataApis,
} from "../../../../services/middlewares/apiMiddleWare";
import { Aview } from "../../../Presentations/UIs";
import AdminTables from "../../../Presentations/UIs/Tables";
import WithEditable from "./withEditable";
import {
  withGameConfigColumn,
  withData,
  withGameMoonConfigColumn,
} from "./withGameColumn";
import { Tabs } from "antd";
import {
  // disconnectSocket,
  // socketSubscriber,
  socketEmitter,
} from "../../../../services/sockets/moonSocket";
import { appColor } from "../../../../configs/settings";
import { timeFilterBy, USDT } from "../../../../configs/configs";
import moment from "moment";
import { getFixedNumber } from "../../../../ultils/helpers/parseDecimalNumber";
import styled from "styled-components";
const { TabPane } = Tabs;

const GAME_LIST = {
  MOON: "MOON",
  DICE: "DICE",
  SLOTS: "SLOTS",
  "NEW DICE": "NEW DICE",
};
const initProfit = {
  slotsGame: 0,
  newDiceGame: 0,
  diceGame: 0,
  moonGame: 0,
};

function GameConfig(props) {
  const { userLoginInfos, handleViewLatestGame } = props;
  const { authHeader: auth } = userLoginInfos;
  const { setModalState } = useContext(RootContext);
  const [loading, setLoading] = useState([]);

  const [activeTabs, setActiveTabs] = useState(GAME_LIST["MOON"]);
  const [allTable, setAllTable] = useState([]);

  // const [totalAmount, setTotalAmount] = useState(0);

  const [gameTotalProfit, setGameTotalProfit] = useState(initProfit);
  const [gameProfitToday, setGameProfitToday] = useState(initProfit);

  // useEffect(() => {
  //   const moonlatestGame = "MOON.LATEST_GAME";
  //   socketSubscriber((err, data) => {
  //     console.log({ data });
  //     setTotalAmount(data?.bankRoll);
  //   }, moonlatestGame);
  //   return () => disconnectSocket();
  // }, []);

  const editTable = (item) => {
    setModalState((state) => ({
      ...state,
      isVisible: true,
      title: "Games Config",
      content: (
        <WithEditable
          data={item}
          handleConfirm={handleConfirm}
          setModalState={setModalState}
        />
      ),
    }));
  };

  const stopGame = () => {
    socketEmitter({ accessToken: auth.Authorization }, (err) => {
      console.log({ err });
    });
  };

  const handleConfirm = async (body) => {
    try {
      const { data } = await updateDataApis(auth, body, "game-config", "put");
      if (data?.success) {
        handleGetdata();
        setModalState((state) => ({
          ...state,
          isVisible: false,
          content: null,
        }));
      }
    } catch (error) {
      console.log("err", error);
    }
  };

  const handleGetdata = useCallback(async () => {
    setLoading(true);
    const { data } = await getDataApis(auth, "game-config");
    if (data?.success) {
      const gameConfig = data?.data?.gameConfig;

      const slots = gameFinding(gameConfig, GAME_LIST["SLOTS"]);
      const dice = gameFinding(gameConfig, GAME_LIST["DICE"]);
      const moon = gameFinding(gameConfig, GAME_LIST["MOON"]);
      const newDice = gameFinding(gameConfig, GAME_LIST["NEW DICE"]);

      setAllTable([
        {
          ...moon,
          dataTable: {
            column: withGameMoonConfigColumn({ editTable, stopGame }),
            data: withData(gameConfig, moon.name),
            pagination: false,
          },
        },
        {
          ...slots,
          dataTable: {
            column: withGameConfigColumn({ editTable }),
            data: withData(gameConfig, slots.name),
            pagination: false,
          },
        },
        {
          ...dice,
          dataTable: {
            column: withGameConfigColumn({ editTable }),
            data: withData(gameConfig, dice.name),
            pagination: false,
          },
        },
        {
          ...newDice,
          dataTable: {
            column: withGameConfigColumn({ editTable }),
            data: withData(gameConfig, newDice.name),
            pagination: false,
          },
        },
      ]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    handleGetdata();
    handleGetProfit();
  }, []);

  const handleTableChange = (type) => {
    setActiveTabs(type);
    type === GAME_LIST["MOON"]
      ? handleViewLatestGame(true)
      : handleViewLatestGame(false);
    switch (type) {
      case GAME_LIST["MOON"]:
      case GAME_LIST["SLOTS"]:
      case GAME_LIST["DICE"]:
      case GAME_LIST["NEW DICE"]:
        handleGetProfit();
        break;

      default:
        break;
    }
  };

  const handleGetProfit = useCallback(async () => {
    const date = {
      filterBy: {
        fromDate: `${moment().subtract(0, "days").format("YYYY-MM-DD")} ${
          timeFilterBy.from
        }`,
        toDate: `${moment().subtract(0, "days").format("YYYY-MM-DD")} ${
          timeFilterBy.to
        }`,
      },
    };
    const { data: all } = await fundApis_edited(auth, {});
    const { data: today } = await fundApis_edited(auth, date);
    if (all?.success) {
      const allProfit = all?.data?.data;
      setGameTotalProfit((state) => ({
        ...state,
        slotsGame: profitFinding(allProfit?.totalSlot),
        diceGame: profitFinding(allProfit?.totalDice),
        newDiceGame: profitFinding(allProfit?.totalNewDice),
        moonGame: profitFinding(allProfit?.totalMoon),
      }));
    }
    if (today?.success) {
      const todayProfit = today?.data?.data;
      setGameProfitToday((state) => ({
        ...state,
        slotsGame: profitFinding(todayProfit?.totalSlot),
        diceGame: profitFinding(todayProfit?.totalDice),
        newDiceGame: profitFinding(todayProfit?.totalNewDice),
        moonGame: profitFinding(todayProfit?.totalMoon),
      }));
    }
  }, []);

  return (
    <Aview
      title="Games config"
      viewSum={
        <div
          style={{
            color: appColor.white,
            backgroundColor: appColor.orange,
            borderRadius: 5,
          }}
        >
          <div style={{ padding: "3px 10px", display: "flex", gap: 10 }}>
            <div>
              <ProfitTitle
                style={{
                  marginRight: 10,
                }}
              >
                All Profit :
              </ProfitTitle>
              <ProfitValue profit={gameTotalProfit} activeTabs={activeTabs} />
            </div>
            <Devide>
              <ProfitTitle>Profit Today :</ProfitTitle>
              <ProfitValue profit={gameProfitToday} activeTabs={activeTabs} />
            </Devide>
          </div>
        </div>
      }
    >
      <div>
        <Tabs
          style={{
            padding: "5px 10px",
            textTransform: "capitalize",
          }}
          onChange={handleTableChange}
          defaultActiveKey={activeTabs}
        >
          {allTable?.length > 0 &&
            allTable.map((item) => {
              return (
                <TabPane tab={item.name} key={item.name.toUpperCase()}>
                  <AdminTables
                    scrollX={996}
                    loading={loading}
                    tableRender={item.dataTable}
                  />
                </TabPane>
              );
            })}
        </Tabs>
      </div>
    </Aview>
  );
}

const mapStateToProps = (state) => ({
  userLoginInfos: state.authentication,
});

export default connect(mapStateToProps, null)(React.memo(GameConfig));

function gameFinding(game, findValue) {
  return game.find((item) => item.name.toUpperCase() === findValue);
}
function profitFinding(profit) {
  return profit.find(({ currency }) => currency === USDT)?.amount;
}

const Devide = styled.div`
  position: relative;
  padding: 0 10px;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 2px;
    height: 10px;
    background-color: whitesmoke;
    bottom: 0;
    margin: auto;
  }
`;

const ProfitTitle = styled.span`
  font-size: 16px;
  margin-right: 10px;
`;

const ProfitValue = (props) => {
  const { profit, activeTabs } = props;
  return (
    <span
      style={{
        fontWeight: 600,
      }}
    >
      {activeTabs === GAME_LIST["MOON"] &&
        `${getFixedNumber(profit?.moonGame)} ${USDT}`}
      {activeTabs === GAME_LIST["SLOTS"] &&
        `${getFixedNumber(profit?.slotsGame)} ${USDT}`}
      {activeTabs === GAME_LIST["DICE"] &&
        `${getFixedNumber(profit?.diceGame)} ${USDT}`}
      {activeTabs === GAME_LIST["NEW DICE"] &&
        `${getFixedNumber(profit?.newDiceGame)} ${USDT}`}
    </span>
  );
};
