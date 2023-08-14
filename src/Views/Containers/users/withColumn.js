import { getColor } from "../../../ultils/turnColor";
import { appColor } from "../../../configs/settings";
import React from "react";
import { parseTimer } from "../../../ultils/helpers/parseTimer";
import { Popover, Switch, Tooltip } from "antd";
import { TitleColumn } from "../../Presentations/UIs/UiModifies";
import EmailComponent from "../../Presentations/UIs/EmailComponent";

export const withData = (arr) => {
  return arr.map((item, index) => ({
    email: item,
    createdAt: item?.createdAt && parseTimer(item?.createdAt, true),
    gg: item.gaEnabled,
    id: item?.id,
    status: item?.state,
    userName: item?.userName,
    balance: item?.balance?.list,
    deposit: item?.deposit?.list,
    withdrawal: item?.withdrawal?.list,
    action: item,
    key: `${index}_${Date.now()}`,
  }));
};

export const withColumn = (actions) => {
  const { handleTableUpdateUserStatus, onFilter, handleDirectToUserDetails } =
    actions;

  return [
    {
      title: () => <TitleColumn title="Date" />,
      dataIndex: "createdAt",
      key: "createdAt",
      responsive: ["xs", "sm"],
      width: "10%",
      onHeaderCell: (column) => {
        return {
          onClick: () => onFilter(column),
        };
      },
    },
    {
      title: () => <TitleColumn title="ID" />,
      dataIndex: "id",
      key: "id",
      responsive: ["xs", "sm"],
      width: "6%",
      onHeaderCell: (column) => {
        return {
          onClick: () => onFilter(column),
        };
      },
    },
    {
      title: () => <TitleColumn title="User Name" />,
      dataIndex: "userName",
      key: "userName",
      responsive: ["xs", "sm"],
      width: "15%",
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
      width: "25%",
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
      title: () => <TitleColumn title="Balance" />,
      dataIndex: "balance",
      key: "balance",
      responsive: ["xs", "sm"],
      width: "25%",
      onHeaderCell: (column) => {
        return {
          onClick: () => onFilter(column),
        };
      },
      render: (item) => <AMountRender item={item} />,
    },
    {
      title: () => <TitleColumn title="Withdraw" />,
      dataIndex: "withdrawal",
      key: "withdrawal",
      responsive: ["xs", "sm"],
      width: "25%",
      onHeaderCell: (column) => {
        return {
          onClick: () => onFilter(column),
        };
      },
      render: (item) => <AMountRender item={item} />,
    },
    {
      title: () => <TitleColumn title="Deposit" />,
      dataIndex: "deposit",
      key: "deposit",
      responsive: ["xs", "sm"],
      width: "25%",
      onHeaderCell: (column) => {
        return {
          onClick: () => onFilter(column),
        };
      },
      render: (item) => <AMountRender item={item} />,
    },
    {
      title: "2FA",
      dataIndex: "gg",
      key: "gg",
      responsive: ["xs", "sm"],
      render: (item) => {
        return (
          <span
            style={{
              color: item
                ? appColor.textPrimaryColorGreen
                : appColor.textSecondaryColorGray,
              textTransform: "capitalize",
            }}
          >
            <i className="fas fa-check-circle"></i>
          </span>
        );
      },
      width: "10%",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      responsive: ["xs", "sm"],
      render: (item) => {
        const itemColor = getColor(item);
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "100%",
                background: itemColor,
                marginRight: 5,
              }}
            />
            <span>{item}</span>
          </div>
        );
      },
      width: "12%",
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
      responsive: ["xs", "sm"],
      render: (item) => (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          {btnListActions.map((btn, idx) => (
            <div key={idx}>
              {idx === 1 && (
                <Tooltip title={btn.title}>
                  <span
                    style={{
                      borderRadius: 3,
                      margin: "2px 5px",
                      cursor: "pointer",
                      padding: "3px 15px",
                      fontSize: 18,
                      color: appColor.textPrimaryColorGreen,
                    }}
                    onClick={() => handleDirectToUserDetails(item)}
                  >
                    <i className={btn.icon} />
                  </span>
                </Tooltip>
              )}
              {idx === 0 && (
                <Tooltip title="User status">
                  <span
                    style={{
                      borderRadius: 3,
                      margin: "2px 5px",
                      cursor: "pointer",
                    }}
                  >
                    <Switch
                      disabled={item?.state === "inactive"}
                      checkedChildren="active"
                      unCheckedChildren="block"
                      onChange={(e) =>
                        handleTableUpdateUserStatus(e, item, true)
                      }
                      defaultChecked={item?.state === "active" ? true : false}
                    />
                  </span>
                </Tooltip>
              )}
              {idx === 2 && (
                <Popover
                  title="2FA Status"
                  content={
                    <Content
                      handleConfirm={(e) =>
                        handleTableUpdateUserStatus(e, item, false)
                      }
                    />
                  }
                >
                  <span
                    style={{
                      borderRadius: 3,
                      margin: "2px 5px",
                      cursor: "pointer",
                      fontSize: 18,
                      fontWeight: 600,
                      color: appColor.gray3,
                    }}
                  >
                    <i className={btn.icon} />
                  </span>
                </Popover>
              )}
            </div>
          ))}
        </div>
      ),
      width: 210,
      fixed: "right",
    },
  ];
};

const AMountRender = ({ item }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {item?.length > 0 ? (
        item.map(({ amount, currency }, idx) => (
          <span
            style={{ padding: "2px 5px", whiteSpace: "nowrap" }}
            key={idx}
          >{`${amount.toFixed(2)} ${currency}`}</span>
        ))
      ) : (
        <span>{`0 USDT`}</span>
      )}
    </div>
  );
};

const btnListActions = [
  {
    title: "Status",
    color: null,
    icon: null,
  },
  {
    title: "User details",
    color: appColor.orange,
    icon: "fas fa-external-link-alt",
  },
  {
    title: "delete",
    color: appColor.red,
    icon: "far fa-trash-alt",
  },
];

const Content = (props) => {
  const { handleConfirm } = props;
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <span
          onClick={handleConfirm}
          style={{
            ...style,
            backgroundColor: appColor.textPrimaryColorGreen,
          }}
        >
          Confirm
        </span>
      </div>
    </div>
  );
};

const style = {
  backgroundColor: appColor.orange,
  padding: "3px 8px",
  color: appColor.white,
  borderRadius: 5,
  cursor: "pointer",
  textTransform: "uppercase",
  fontSize: 10,
};
