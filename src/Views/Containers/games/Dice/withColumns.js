import AmountUI from "../../../Presentations/UIs/AmountUI";
import { Tag } from "antd";
import React from "react";
import { parseTimer } from "../../../../ultils/helpers/parseTimer";
import { TitleColumn } from "../../../Presentations/UIs/UiModifies";
import EmailComponent from "../../../Presentations/UIs/EmailComponent";

export const turnDiceMygame = (list) => {
  if (list?.length === 0) return;
  return list.map((item, index) => {
    return {
      createdAt: parseTimer(item.createdAt, true),
      amount: item,
      email: item?.userId,
      isRollOver: item?.isRollOver,
      multiplier: item?.multiplier,
      profit: item?.profit,
      isWin: item?.isWin,
      roll: item?.roll,
      target: item?.target,
      winChance: item?.winChance,
      key: `${item._id}_${index}`,
    };
  });
};

export const withMyDiceColumns = (onFilter) => [
  {
    title: () => <TitleColumn title="Date" />,
    dataIndex: "createdAt",
    key: "createdAt",
    responsive: ["xs", "sm"],
    render: (item) => <span>{item}</span>,
    onHeaderCell: (column) => {
      return {
        onClick: () => onFilter(column),
      };
    },
  },
  {
    title: () => <TitleColumn title="email" isSort={false} />,
    dataIndex: "email",
    key: "email",
    responsive: ["xs", "sm"],
    render: (item) => (
      <EmailComponent item={{ email: item?.email, id: item?._id }} />
    ),
  },
  {
    title: () => <TitleColumn title="Amount" />,
    dataIndex: "amount",
    key: "amount",
    responsive: ["xs", "sm"],
    render: (item) => <AmountUI data={item} />,
    onHeaderCell: (column) => {
      return {
        onClick: () => onFilter(column),
      };
    },
  },
  {
    title: () => <TitleColumn title="Profit" />,
    dataIndex: "profit",
    key: "profit",
    responsive: ["xs", "sm"],
    onHeaderCell: (column) => {
      return {
        onClick: () => onFilter(column),
      };
    },
  },
  {
    title: () => <TitleColumn title="multiplier" />,
    dataIndex: "multiplier",
    key: "multiplier",
    responsive: ["xs", "sm"],
    onHeaderCell: (column) => {
      return {
        onClick: () => onFilter(column),
      };
    },
  },
  {
    title: () => <TitleColumn title="roll" isSort={false} />,
    dataIndex: "roll",
    key: "roll",
    responsive: ["xs", "sm"],
  },
  {
    title: () => <TitleColumn title="Target" isSort={false} />,
    dataIndex: "target",
    key: "target",
    responsive: ["xs", "sm"],
  },
  {
    title: () => <TitleColumn title="WinChance" isSort={false} />,
    dataIndex: "winChance",
    key: "winChance",
    responsive: ["xs", "sm"],
  },
  {
    title: () => <TitleColumn title="Roll By" isSort={false} />,
    dataIndex: "isRollOver",
    key: "isRollOver",
    responsive: ["xs", "sm"],
    render: (item) => (
      <Tag color={item ? "green" : "magenta"}>
        {item ? "Roll Over" : "Roll Under"}
      </Tag>
    ),
  },
  {
    title: () => <TitleColumn title="Win/Lose" isSort={false} />,
    dataIndex: "isWin",
    key: "isWin",
    responsive: ["xs", "sm"],
    render: (item) => (
      <Tag color={item ? "geekblue" : "orange"}>{item ? "Win" : "Lose"}</Tag>
    ),
  },
];
