import { parseTimer } from "../../../../ultils/helpers/parseTimer";
import { TitleColumn } from "../../../Presentations/UIs/UiModifies";
import { Tag } from "antd";
import AmountUI from "../../../Presentations/UIs/AmountUI";
import NumbersIcons from "../../../Presentations/UIs/NumbersIcons";
import { formatView } from "../../UserDetails/withFundColumns";
import { appColor } from "../../../../configs/settings";
import EmailComponent from "../../../Presentations/UIs/EmailComponent";

export const turnSlotMyGame = (list) => {
  if (list?.length === 0) return;
  return list.map((item, index) => {
    return {
      createdAt: parseTimer(item.createdAt),
      amount: item,
      isWin: item?.isWin,
      profit: item?.profit,
      numbers: item?.numbers,
      multipliers: item?.multipliers,
      key: `__${index}`,
      email: item?.userId,
    };
  });
};

export const withSlotMygameColumns = (onFilter) => [
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
    title: () => <TitleColumn title="Win" isSort={false} />,
    dataIndex: "isWin",
    key: "isWin",
    responsive: ["xs", "sm"],
    render: (item) => (
      <Tag color={item ? "green" : "red"}>{`${item ? "Win" : "Lose"}`}</Tag>
    ),
  },
  {
    title: () => <TitleColumn title="Amount" />,
    dataIndex: "amount",
    key: "amount",
    responsive: ["xs", "sm"],
    render: (item) => <AmountUI data={item} />,
  },
  {
    title: () => <TitleColumn title="Profit" />,
    dataIndex: "profit",
    key: "profit",
    responsive: ["xs", "sm"],
    render: (item) => (
      <span
        style={{
          color:
            item > 0
              ? appColor.textPrimaryColor
              : item === 0
              ? appColor.red
              : appColor.textSecondaryColor,
        }}
      >
        {item}
      </span>
    ),
  },
  {
    title: () => <TitleColumn title="multipliers" />,
    dataIndex: "multipliers",
    key: "multipliers",
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
    title: () => <TitleColumn title="Games" isSort={false} />,
    dataIndex: "numbers",
    key: "numbers",
    responsive: ["xs", "sm"],
    render: (item) => <NumbersIcons item={item} />,
    width: "15%",
  },
];
