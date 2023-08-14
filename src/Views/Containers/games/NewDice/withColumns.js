import AmountUI from "../../../Presentations/UIs/AmountUI";
import { TitleColumn } from "../../../Presentations/UIs/UiModifies";
import { Tag } from "antd";
import { parseTimer } from "../../../../ultils/helpers/parseTimer";
import { TurnDiceFace } from "../../../Presentations/UIs/DiceUI";
import EmailComponent from "../../../Presentations/UIs/EmailComponent";

export const turnNewDiceMygame = (list) => {
  if (list?.length === 0) return;
  return list.map((item, index) => {
    return {
      createdAt: parseTimer(item.createdAt),
      amount: item,
      winEnd: item,
      multiplier: item?.multiplier,
      profit: item?.profit,
      numbers: item?.numbers,
      key: `$_${index}`,
      email: item?.userId,
    };
  });
};

export const withMyNewDiceColumns = (onFilter) => [
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
    title: () => <TitleColumn title="Win/End" isSort={false} />,
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
    title: () => <TitleColumn title="Result" isSort={false} />,
    dataIndex: "numbers",
    key: "numbers",
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
