import { Tabs, Tag } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { appColor } from "../../../../configs/settings";
import { socketSubscriber } from "../../../../services/sockets/moonSocket";
import { Aview } from "../../../Presentations/UIs";
import AdminTables from "../../../Presentations/UIs/Tables";
const { TabPane } = Tabs;

function LastGames() {
  const [allTable, setAllTable] = useState([]);

  useEffect(() => {
    const moonlatestGame = "MOON.LATEST_GAME";
    socketSubscriber((err, res) => {
      const data = res?.data;
      if (data) {
        const result =
          data?.length > 0 &&
          data.map((item) => ({
            name: item.id,
            dataTable: {
              column: withColumn,
              data: withData(item?.users),
              pagination: false,
            },
            profit: item?.profit,
            profitToday: res?.profitCurrentDay,
          }));
        setAllTable(result);
      } else {
        setAllTable([]);
      }
    }, moonlatestGame);
  }, []);

  return (
    <Aview title="10 lastest games">
      <Tabs
        style={{
          padding: "5px 10px",
          textTransform: "capitalize",
        }}
      >
        {allTable?.length > 0 &&
          allTable.map((item) => {
            return (
              <TabPane tab={item.name} key={item.name}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <ProfitToday
                    label="Profit on game:"
                    data={item?.profit}
                    isFirst
                  />
                  <ProfitToday label="Profit Today:" data={item?.profitToday} />
                </div>
                <AdminTables scrollX={996} tableRender={item.dataTable} />
              </TabPane>
            );
          })}
      </Tabs>
    </Aview>
  );
}

export default LastGames;

const ProfitToday = ({ data, label, isFirst }) => {
  return (
    <ProfitWrapper isFirst={isFirst}>
      <span>{label}</span>
      <span>{data} </span>
    </ProfitWrapper>
  );
};

const ProfitWrapper = styled.div`
  position: relative;
  padding: 5px 10px;
  margin-left: ${(props) => (props?.isFirst ? 0 : "15px")};
  font-size: 15px;
  text-transform: uppercase;
  font-weight: 600;
  &::before {
    content: "";
    position: absolute;
    left: -5px;
    width: 2px;
    height: 60%;
    background-color: ${appColor.textPrimaryColorGreen};
    display: ${(props) => (props?.isFirst ? "none" : "block")};
    margin: auto 0;
  }
  span {
    &:last-child {
      margin-left: 5px;
      background-color: ${(props) =>
        props?.isFirst ? appColor.blue : appColor.orange};
      padding: 5px 10px;
      color: ${appColor.textWhiteColor};
      border-radius: 5px;
    }
  }
`;

export const withData = (arr) => {
  return arr.map((item, idx) => {
    return {
      key: idx,
      amount: item,
      // autoCashout: item?.autoCashout,
      multiplier: item?.multiplier,
      state: item?.state,
      userName: item?.userName,
      stt: idx + 1,
      profit: profitOnUser(item?.multiplier, item?.amount),
    };
  });
};

export const withColumn = [
  {
    title: "#",
    dataIndex: "stt",
    key: "stt",
    responsive: ["xs", "sm"],
  },
  {
    title: "User name",
    dataIndex: "userName",
    key: "userName",
    responsive: ["xs", "sm"],
  },
  {
    title: "User state",
    dataIndex: "state",
    key: "state",
    responsive: ["xs", "sm"],
  },
  {
    title: "multiplier",
    dataIndex: "multiplier",
    key: "multiplier",
    responsive: ["xs", "sm"],
    render: (item) => <Tag color={item > 0 ? "green" : "red"}>{item}</Tag>,
  },
  {
    title: "amount",
    dataIndex: "amount",
    key: "amount",
    responsive: ["xs", "sm"],
    render: (item) => (
      <div>
        <span> {`${item.amount} ${item.currency}`} </span>
      </div>
    ),
  },
  {
    title: "Profit",
    dataIndex: "profit",
    key: "profit",
    responsive: ["xs", "sm"],
    render: (item) => <Tag color={item > 0 ? "green" : "red"}>{item}</Tag>,
  },
];

const profitOnUser = (multis, amount) => {
  if (multis === 0) return -amount;
  return amount * multis;
};
