import { appColor } from "../../../../configs/settings";
import { parseTimer } from "../../../../ultils/helpers/parseTimer";

export const withData = (arr) => {
  return arr.map((item, idx) => {
    return {
      key: idx,
      createdAt: parseTimer(item?.createdAt),
      currency: item?.currency,
      name: item?.name,
      network: item?.network,
      enabled: item?.enabled,
      feeInternal: item?.feeInternal,
      feeExternal: item?.feeExternal,
      minWithdraw: item?.minWithdraw,
      depositEnalbed: item?.depositEnalbed,
      withdrawEnabled: item?.withdrawEnabled,
      action: item,
    };
  });
};

export const withCurrencyColumn = ({ editTable }) => {
  return [
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      responsive: ["xs", "sm"],
    },
    {
      title: "Coin",
      dataIndex: "currency",
      key: "currency",
      responsive: ["xs", "sm"],
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      responsive: ["xs", "sm"],
    },
    {
      title: "Network",
      dataIndex: "network",
      key: "network",
      responsive: ["xs", "sm"],
    },
    {
      title: "Fee Internal",
      dataIndex: "feeInternal",
      key: "feeInternal",
      responsive: ["xs", "sm"],
    },
    {
      title: "Fee External",
      dataIndex: "feeExternal",
      key: "feeExternal",
      responsive: ["xs", "sm"],
    },
    {
      title: "Min Withdraw",
      dataIndex: "minWithdraw",
      key: "minWithdraw",
      responsive: ["xs", "sm"],
    },
    {
      title: "Deposit Enalbed",
      dataIndex: "depositEnalbed",
      key: "depositEnalbed",
      responsive: ["xs", "sm"],
      render: (item) => (
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
      ),
    },
    {
      title: "Withdraw Enabled",
      dataIndex: "withdrawEnabled",
      key: "withdrawEnabled",
      responsive: ["xs", "sm"],
      render: (item) => (
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
      ),
    },
    {
      title: "Enabled",
      dataIndex: "enabled",
      key: "enabled",
      responsive: ["xs", "sm"],
      render: (item) => (
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
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      responsive: ["xs", "sm"],
      render: (item) => (
        <div>
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
        </div>
      ),
    },
  ];
};
