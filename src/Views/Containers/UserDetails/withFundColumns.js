import { Popover, Tag } from "antd";
import { Fragment } from "react";
import { parseTimer } from "../../../ultils/helpers/parseTimer";
import { TurnDiceFace } from "../../Presentations/UIs/DiceUI";
import NumbersIcons from "../../Presentations/UIs/NumbersIcons";
import { RenderColumnItem } from "../Fund/OverViewFund";

export const withData = (arr) => {
  return arr.map((item, idx) => ({
    key: idx,
    currency: item?.currency,
    balance: item,
    amount: item,
    totalDeposit: item?.totalDeposit,
    toalWithdrawal: item?.toalWithdrawal,
    date: parseTimer(item?.createdAt),
    email: item?.userId?.email,
    level: item?.level,
    status: item?.status,
    type: item?.type,
    address: item?.address,
    transactionHash: item?.transactionHash,
    fee: item,
  }));
};

export const withFundData = (arr) => {
  return arr.map((item, idx) => ({
    key: idx,
    balance: item?.balance ?? [],
    deposit: item?.deposit ?? [{ amount: 997952.992926008, currency: "USDT" }],
    withdrawal: item?.withdrawal ?? [],
  }));
};
export const withGameData = (arr) => {
  return arr.map((item, idx) => ({
    key: idx,
    date: parseTimer(item?.createdAt),
    multiplier_dice: item?.multiplier,
    multiplier_slot: item?.multipliers,
    multiplier_moon: item?.multiplier,
    amount: item,
    profit: item?.profit,
    roll: item?.roll,
    game: item?.numbers,
    state: item?.state,
    newDideRoll: item?.numbers,
    winEnd: item,
  }));
};

export const withSlotsColumn = () => {
  return [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      responsive: ["xs", "sm"],
    },
    {
      title: "Amount",
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
      title: "Multiplier",
      dataIndex: "multiplier_slot",
      key: "multiplier_slot",
      responsive: ["xs", "sm"],
      render: (item) => {
        return (
          <div>
            {item.map((mul, i) => {
              return <div key={i}>{formatView(mul)}</div>;
            })}
          </div>
        );
      },
    },
    {
      title: "Profit",
      dataIndex: "profit",
      key: "profit",
      responsive: ["xs", "sm"],
    },
    {
      title: "Game",
      dataIndex: "game",
      key: "game",
      responsive: ["xs", "sm"],
      render: (item) => <NumbersIcons item={item} />,
      width: "15%",
    },
  ];
};
export const withMoonColumn = () => {
  return [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      responsive: ["xs", "sm"],
    },
    {
      title: "Multiplier",
      dataIndex: "multiplier_moon",
      key: "multiplier_moon",
      responsive: ["xs", "sm"],
    },
    {
      title: "Amount",
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
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
      responsive: ["xs", "sm"],
      render: (item) => (
        <div>
          <Tag color="orange"> {item} </Tag>
        </div>
      ),
    },
  ];
};
export const withDiceColumn = () => {
  return [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      responsive: ["xs", "sm"],
    },
    {
      title: "Multiplier",
      dataIndex: "multiplier_dice",
      key: "multiplier_dice",
      responsive: ["xs", "sm"],
    },
    {
      title: "Amount",
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
    },
    {
      title: "Result",
      dataIndex: "roll",
      key: "roll",
      responsive: ["xs", "sm"],
    },
  ];
};
export const withNewDiceColumn = () => {
  return [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      responsive: ["xs", "sm"],
    },
    {
      title: "Multiplier",
      dataIndex: "multiplier_dice",
      key: "multiplier_dice",
      responsive: ["xs", "sm"],
    },
    {
      title: "Amount",
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
      title: "Win/End",
      dataIndex: "winEnd",
      key: "winEnd",
      responsive: ["xs", "sm"],
      render: (item) => (
        <div>
          <Tag color="green">
            {`${item.isWin ? "Win" : "Lose"} / ${item.isEnd ? "End" : "Run"}`}
          </Tag>
        </div>
      ),
    },
    {
      title: "Profit",
      dataIndex: "profit",
      key: "profit",
      responsive: ["xs", "sm"],
    },
    {
      title: "Result",
      dataIndex: "newDideRoll",
      key: "newDideRoll",
      responsive: ["xs", "sm"],
      render: (item) => (
        <div style={{ display: "flex" }}>
          {item?.length > 0
            ? item.map((num, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: 3,
                  }}
                >
                  <TurnDiceFace number={num} />
                </div>
              ))
            : null}
        </div>
      ),
    },
  ];
};

export const withColumn = () => {
  return [
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
      responsive: ["xs", "sm"],
      render: (item) => <RenderColumnItem items={item} />,
    },
    {
      title: "Deposit",
      dataIndex: "deposit",
      key: "deposit",
      responsive: ["xs", "sm"],
      render: (item) => <RenderColumnItem items={item} />,
    },
    {
      title: "Withdraw",
      dataIndex: "withdrawal",
      key: "withdrawal",
      responsive: ["xs", "sm"],
      render: (item) => <RenderColumnItem items={item} />,
    },
  ];
};
export const withAfColumn = () => {
  return [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      responsive: ["xs", "sm"],
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      responsive: ["xs", "sm"],
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
      responsive: ["xs", "sm"],
    },
  ];
};
export const withBaColumn = () => {
  return [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      responsive: ["xs", "sm"],
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      responsive: ["xs", "sm"],
    },
    {
      title: "Coin",
      dataIndex: "currency",
      key: "currency",
      responsive: ["xs", "sm"],
    },
    {
      title: "Balance",
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      responsive: ["xs", "sm"],
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      responsive: ["xs", "sm"],
    },
  ];
};

export const withDeColumn = () => {
  return [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      responsive: ["xs", "sm"],
      width: 150,
      fixed: "left",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      responsive: ["xs", "sm"],
    },
    {
      title: "Amount",
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      responsive: ["xs", "sm"],
      render: (item) => (
        <Tag color={item === "success" ? "green" : "orange"}>{item}</Tag>
      ),
      width: "7%",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      responsive: ["xs", "sm"],
      render: (item) => (
        <Tag color={item === "internal" ? "blue" : "cyan"}>{item}</Tag>
      ),
      width: "7%",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      responsive: ["xs", "sm"],
      render: (item) => (
        <Popover
          style={{
            cursor: "pointer",
          }}
          content={item}
        >
          {item}
        </Popover>
      ),
    },
    {
      title: "TransactionHash",
      dataIndex: "transactionHash",
      key: "transactionHash",
      responsive: ["xs", "sm"],
      render: (item) => (
        <Popover
          style={{
            cursor: "pointer",
          }}
          content={item}
        >
          {item}
        </Popover>
      ),
    },
  ];
};

export const withDrawColumn = () => {
  return [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      responsive: ["xs", "sm"],
      width: 150,
      fixed: "left",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      responsive: ["xs", "sm"],
    },
    {
      title: "Amount",
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
      title: "Fee",
      dataIndex: "fee",
      key: "fee",
      responsive: ["xs", "sm"],
      render: (item) => (
        <div>
          <span> {`${item.fee} ${item.currency}`} </span>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      responsive: ["xs", "sm"],
      render: (item) => (
        <Tag color={item === "success" ? "green" : "orange"}>{item}</Tag>
      ),
      width: "7%",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      responsive: ["xs", "sm"],
      render: (item) => (
        <Tag color={item === "internal" ? "blue" : "cyan"}>{item}</Tag>
      ),
      width: "7%",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      responsive: ["xs", "sm"],
      render: (item) => (
        <Popover
          style={{
            cursor: "pointer",
          }}
          content={item}
        >
          {item}
        </Popover>
      ),
    },
    {
      title: "TransactionHash",
      dataIndex: "transactionHash",
      key: "transactionHash",
      responsive: ["xs", "sm"],
      render: (item) => (
        <Popover
          style={{
            cursor: "pointer",
          }}
          content={item}
        >
          {item}
        </Popover>
      ),
    },
  ];
};

export const formatView = (item) => {
  return !item || item === 0 ? (
    `_`
  ) : (
    <Fragment>
      <span style={{ fontSize: 10 }}>x</span>
      <span style={{ fontSize: 16 }}>{item}</span>
    </Fragment>
  );
};
