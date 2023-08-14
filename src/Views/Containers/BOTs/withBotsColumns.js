import { Button } from "antd";
import { appColor } from "../../../configs/settings";

export const withBotDatas = (arr) => {
  return arr.map((item, idx) => {
    return {
      key: idx,
      stt: idx + 1,
      betFromAmount: item?.betFromAmount,
      betToAmount: item?.betToAmount,
      cashOutFromAmount: item?.cashOutFromAmount,
      cashOutToAmount: item?.cashOutToAmount,
      userName: item?.userName,
      isRandomUserName: item?.isRandomUserName,
      isActive: item?.isActive,
      action: item,
    };
  });
};

export const withBotColumns = ({ editTable, deleteBots }) => {
  return [
    {
      title: "#",
      dataIndex: "stt",
      key: "stt",
      responsive: ["xs", "sm"],
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
      responsive: ["xs", "sm"],
    },
    {
      title: "Bet From",
      dataIndex: "betFromAmount",
      key: "betFromAmount",
      responsive: ["xs", "sm"],
    },
    {
      title: "Bet To",
      dataIndex: "betToAmount",
      key: "betToAmount",
      responsive: ["xs", "sm"],
    },
    {
      title: "Multiplier From",
      dataIndex: "cashOutFromAmount",
      key: "cashOutFromAmount",
      responsive: ["xs", "sm"],
    },
    {
      title: "Multiplier To",
      dataIndex: "cashOutToAmount",
      key: "cashOutToAmount",
      responsive: ["xs", "sm"],
    },
    {
      title: "Random Name",
      dataIndex: "isRandomUserName",
      key: "isRandomUserName",
      responsive: ["xs", "sm"],
      render: (item) => <BooleanComponent item={item} />,
    },
    {
      title: "Active",
      dataIndex: "isActive",
      key: "isActive",
      responsive: ["xs", "sm"],
      render: (item) => <BooleanComponent item={item} />,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      responsive: ["xs", "sm"],
      render: (item) => (
        <div style={{ display: "flex", gap: 5 }}>
          <span
            style={{
              cursor: "pointer",
              backgroundColor: appColor.textPrimaryColorGreen,
              padding: "4px 12px",
              color: appColor.white,
              borderRadius: 5,
            }}
            onClick={() => editTable(item)}
          >
            <i className="far fa-edit" />
          </span>
          <div>
            <Button
              style={{ borderRadius: 5 }}
              danger
              type="primary"
              onClick={() => deleteBots(item?.id)}
            >
              <i className="fas fa-trash-alt"></i>
            </Button>
          </div>
        </div>
      ),
    },
  ];
};

const BooleanComponent = (props) => {
  const { item } = props;
  return (
    <span>
      <i
        style={{
          color: item
            ? appColor.textPrimaryColorGreen
            : appColor.textSecondaryColorGray,
        }}
        className="fas fa-check-circle"
      />
    </span>
  );
};
