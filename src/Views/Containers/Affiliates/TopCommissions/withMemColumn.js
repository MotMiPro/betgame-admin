import { parseTimer } from "../../../../ultils/helpers/parseTimer";
import EmailComponent from "../../../Presentations/UIs/EmailComponent";

export const withData = (arr) => {
  return arr.map((item, idx) => ({
    date: parseTimer(item?.createdAt),
    userId: item?.userId,
    childId: item?.childId,
    level: item?.level,
    amount: item,
    key: idx,
    action: item,
  }));
};

export const withColumn = () => {
  return [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      responsive: ["xs", "sm"],
    },
    {
      title: "UserID",
      dataIndex: "userId",
      key: "userId",
      responsive: ["xs", "sm"],
      render: (item) => (
        <EmailComponent item={{ email: item?.email, id: item?._id }} />
      ),
    },
    {
      title: "Children",
      dataIndex: "childId",
      key: "childId",
      responsive: ["xs", "sm"],
      render: (item) => (
        <EmailComponent item={{ email: item?.email, id: item?._id }} />
      ),
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
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
      title: "Action",
      dataIndex: "action",
      key: "action",
      responsive: ["xs", "sm"],
    },
  ];
};
