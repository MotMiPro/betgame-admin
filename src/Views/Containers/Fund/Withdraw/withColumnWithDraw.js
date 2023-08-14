import { Popover, Tag } from "antd";
import { parseTimer } from "../../../../ultils/helpers/parseTimer";
import EmailComponent from "../../../Presentations/UIs/EmailComponent";
import { TitleColumn } from "../../../Presentations/UIs/UiModifies";

export const withData = (arr) => {
  return arr.map((item, idx) => ({
    date: parseTimer(item?.createdAt, true),
    id: item?.id,
    address: item?.address,
    amount: item,
    fee: item,
    status: item?.status,
    transactionHash: item?.transactionHash,
    type: item?.type,
    key: `${item._id}_${idx}`,
    email: item?.userId,
    action: item,
  }));
};

export const withColumn = ({ editTable, onFilter }) => {
  return [
    {
      title: () => <TitleColumn title="Date" />,
      dataIndex: "date",
      key: "date",
      responsive: ["xs", "sm"],
      width: 150,
      fixed: "left",
      onHeaderCell: (column) => {
        return {
          onClick: () => onFilter(column),
        };
      },
    },
    {
      title: () => <TitleColumn title="Email" />,
      dataIndex: "email",
      key: "email",
      responsive: ["xs", "sm"],
      onHeaderCell: (column) => {
        return {
          onClick: () => onFilter(column),
        };
      },
      render: (item) => (
        <EmailComponent item={{ email: item?.email, id: item?._id }} />
      ),
    },
    {
      title: () => <TitleColumn title="Amount" />,
      dataIndex: "amount",
      key: "amount",
      responsive: ["xs", "sm"],
      render: (item) => (
        <div>
          <span> {`${item.amount} ${item.currency}`} </span>
        </div>
      ),
      onHeaderCell: (column) => {
        return {
          onClick: () => onFilter(column),
        };
      },
    },
    {
      title: () => <TitleColumn title="Fee" />,
      dataIndex: "fee",
      key: "fee",
      responsive: ["xs", "sm"],
      render: (item) => (
        <div>
          <span> {`${item.fee} ${item.currency}`} </span>
        </div>
      ),
      onHeaderCell: (column) => {
        return {
          onClick: () => onFilter(column),
        };
      },
    },
    {
      title: () => <TitleColumn title="Status" />,
      dataIndex: "status",
      key: "status",
      responsive: ["xs", "sm"],
      render: (item) => (
        <Tag color={item === "success" ? "green" : "orange"}>{item}</Tag>
      ),
      onHeaderCell: (column) => {
        return {
          onClick: () => onFilter(column),
        };
      },
    },
    {
      title: () => <TitleColumn title="Type" />,
      dataIndex: "type",
      key: "type",
      responsive: ["xs", "sm"],
      render: (item) => (
        <Tag color={item === "internal" ? "blue" : "cyan"}>{item}</Tag>
      ),
      onHeaderCell: (column) => {
        return {
          onClick: () => onFilter(column),
        };
      },
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
    // {
    //   title: "Action",
    //   dataIndex: "action",
    //   key: "action",
    //   responsive: ["xs", "sm"],
    //   render: (item) => (
    //     <div>
    //       <span
    //         style={{
    //           cursor: "pointer",
    //           backgroundColor: appColor.textPrimaryColorGreen,
    //           padding: "4px 12px",
    //           color: appColor.white,
    //           borderRadius: 5,
    //         }}
    //         onClick={() => editTable(item)}
    //       >
    //         <i className="far fa-edit" />
    //       </span>
    //     </div>
    //   ),
    //   width: 100,
    //   fixed: "right",
    // },
  ];
};
