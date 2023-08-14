import AmountUI from "../../../Presentations/UIs/AmountUI";
import { Tag } from "antd";
import React from "react";
import { parseTimer } from "../../../../ultils/helpers/parseTimer";
import { TitleColumn } from "../../../Presentations/UIs/UiModifies";
import EmailComponent from "../../../Presentations/UIs/EmailComponent";

export const turnMoonMygame = (list) => {
  if (list?.length === 0) return;
  return list.map((item, index) => {
    return {
      createdAt: parseTimer(item.createdAt),
      amount: item,
      gameId: item?.gameId,
      multiplier: item?.multiplier,
      profit: item?.profit,
      state: item?.state,
      key: `_${index}`,
      email: item?.userId,
    };
  });
};

export const withMyMoonColumns = (onFilter) => [
  {
    title: () => <TitleColumn title="Date" />,
    dataIndex: "createdAt",
    key: "createdAt",
    responsive: ["xs", "sm"],
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
    title: () => <TitleColumn title="amount" />,
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
    title: () => <TitleColumn title="profit" />,
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
    title: () => <TitleColumn title="state" isSort={false} />,
    dataIndex: "state",
    key: "state",
    responsive: ["xs", "sm"],
    render: (item) => (
      <Tag color={item === "CASHOUT" ? "yellow" : "green"}>{item}</Tag>
    ),
  },
];
