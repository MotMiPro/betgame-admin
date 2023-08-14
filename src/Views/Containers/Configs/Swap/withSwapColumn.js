import { appColor } from "../../../../configs/settings";
import { parseTimer } from "../../../../ultils/helpers/parseTimer";

export const withSwapData = (arr) => {
  return arr.map((item, idx) => {
    return {
      key: idx,
      createdAt: parseTimer(item?.createdAt),
      price: item?.price,
      minAmount: item?.minAmount,
      fee: item?.fee,
      isActive: item?.isActive,
      isInSystem: item?.isInSystem,
      isInversePair: item?.isInversePair,
      base: item?.base,
      quote: item?.quote,
      pair: item?.pair,
      action: item,
    };
  });
};

export const withSwapColumn = ({ editTable }) => {
  return [
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      responsive: ["xs", "sm"],
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      responsive: ["xs", "sm"],
    },
    {
      title: "Min Amount",
      dataIndex: "minAmount",
      key: "minAmount",
      responsive: ["xs", "sm"],
    },
    {
      title: "Fee",
      dataIndex: "fee",
      key: "fee",
      responsive: ["xs", "sm"],
    },
    {
      title: "Base",
      dataIndex: "base",
      key: "base",
      responsive: ["xs", "sm"],
    },
    {
      title: "Quote",
      dataIndex: "quote",
      key: "quote",
      responsive: ["xs", "sm"],
    },
    {
      title: "Pair",
      dataIndex: "pair",
      key: "pair",
      responsive: ["xs", "sm"],
    },
    {
      title: "Active",
      dataIndex: "isActive",
      key: "isActive",
      responsive: ["xs", "sm"],
      render: (item) => <BooleanComponent item={item} />,
    },
    {
      title: "InSystem",
      dataIndex: "isInSystem",
      key: "isInSystem",
      responsive: ["xs", "sm"],
      render: (item) => <BooleanComponent item={item} />,
    },
    {
      title: "InversePair",
      dataIndex: "isInversePair",
      key: "isInversePair",
      responsive: ["xs", "sm"],
      render: (item) => <BooleanComponent item={item} />,
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
