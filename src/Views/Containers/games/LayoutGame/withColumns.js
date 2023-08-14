import React from "react";
import { appColor } from "../../../../configs/settings";
import EmailComponent from "../../../Presentations/UIs/EmailComponent";

export const withdata = (arr) => {
  return arr.map((item, idx) => ({
    amount: item.amount,
    email: item.userId,
    key: idx,
  }));
};

export function withGainerColumns() {
  return [
    {
      title: "Email",
      dataIndex: "email",
      responsive: ["xs", "sm"],
      key: "email",
      render: (items) => {
        return (
          <div>
            {items.map((item, idx) => (
              <EmailComponent
                key={idx}
                item={{ email: item?.email, id: item?._id }}
              />
            ))}
          </div>
        );
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      responsive: ["xs", "sm"],
      key: "amount",
    },
  ];
}
