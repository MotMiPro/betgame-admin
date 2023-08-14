import { Aview } from "../../Presentations/UIs";
import { pagingSample, timeFilterBy } from "../../../configs/configs";
import AdminTables from "../../Presentations/UIs/Tables";
import React, { useCallback, useEffect, useState } from "react";
import { fundApis_edited } from "../../../services/middlewares/apiMiddleWare";
import {
  ColWrapper,
  FormItemWrapper,
  FormWrapper,
  RangePickerWrapper,
  RowWrapper,
} from "../../Presentations/UIs/UiModifies";
import { connect } from "react-redux";
import { useForm } from "antd/lib/form/Form";
import moment from "moment";
import { dateFormat } from "../../../ultils/helpers/parseTimer";

function OverViewFund(props) {
  const [form] = useForm();
  const { userLoginInfos } = props;
  const { authHeader: auth } = userLoginInfos;
  const [dataTable, setDataTable] = useState(pagingSample);
  const [loading, setLoading] = useState(false);

  const handleFetchApi = useCallback(async (date) => {
    setLoading(true);
    const { data } = await fundApis_edited(auth, date);
    if (data?.success) {
      const getDataConverted = convertDataToArr(data?.data);
      if (getDataConverted?.length) {
        const dataUI = await withData(getDataConverted);
        setDataTable((data) => ({
          ...data,
          column: withColumn,
          data: dataUI,
          pagination: false,
        }));
      }
    }
    if (!data?.success) {
      console.log("failed");
    }
    setLoading(false);
  }, []);

  const convertDataToArr = ({ data }) => {
    data.key = Math.random();
    return [data];
  };

  useEffect(() => {
    const currentDate = {
      filterBy: {
        fromDate: `${moment().subtract(0, "days").format("YYYY-MM-DD")} ${
          timeFilterBy.from
        }`,
        toDate: `${moment().subtract(0, "days").format("YYYY-MM-DD")} ${
          timeFilterBy.to
        }`,
      },
    };
    handleFetchApi(currentDate);
  }, []);

  const handleChange = (date, dateString) => {
    if (dateString?.length) {
      const selectDate = {
        filterBy: {
          fromDate: `${dateString[0]} ${timeFilterBy.from}`,
          toDate: `${dateString[1]} ${timeFilterBy.to}`,
        },
      };
      !!dateString && dateString[0]?.length > 0
        ? handleFetchApi(selectDate)
        : handleFetchApi();
    }
  };

  return (
    <Aview
      title="overview"
      style={{
        width: "100%",
      }}
    >
      <div
        style={{
          padding: "10px",
        }}
      >
        <WithEditable form={form} handleChange={handleChange} />
      </div>

      <AdminTables
        bordered
        tableRender={dataTable}
        scrollX="350"
        loading={loading}
      />
    </Aview>
  );
}

const mapStateToProps = (state) => ({
  userLoginInfos: state.authentication,
});

export default connect(mapStateToProps, null)(React.memo(OverViewFund));

const withData = (arr) => {
  return arr.map((item, idx) => {
    return {
      totalFee: item.totalFee,
      totalDeposit: item.totalDeposit,
      totalWithdrawal: item.totalWithdrawal,
      totalTransfer: item.totalTransfer,
      totalPending: item.totalPending,
      // totalBalance: item.totalBalance,
      totalDice: item.totalDice,
      totalMoon: item.totalMoon,
      totalNewDice: item.totalNewDice,
      totalSlot: item.totalSlot,
      totalSwap: item.totalSwap,
      totalGame: item.totalGame,
      key: idx,
    };
  });
};

const withColumn = [
  {
    title: "All Game",
    dataIndex: "totalGame",
    key: "totalGame",
    responsive: ["xs", "sm"],
    render: (item) => <RenderColumnItem items={item} />,
  },
  {
    title: "Dice",
    dataIndex: "totalDice",
    key: "totalDice",
    responsive: ["xs", "sm"],
    render: (item) => <RenderColumnItem items={item} />,
  },
  {
    title: "Moon",
    dataIndex: "totalMoon",
    key: "totalMoon",
    responsive: ["xs", "sm"],
    render: (item) => <RenderColumnItem items={item} />,
  },
  {
    title: "NewDice",
    dataIndex: "totalNewDice",
    key: "totalNewDice",
    responsive: ["xs", "sm"],
    render: (item) => <RenderColumnItem items={item} />,
  },
  {
    title: "Slot",
    dataIndex: "totalSlot",
    key: "totalSlot",
    responsive: ["xs", "sm"],
    render: (item) => <RenderColumnItem items={item} />,
  },
  {
    title: "Swap",
    dataIndex: "totalSwap",
    key: "totalSwap",
    responsive: ["xs", "sm"],
    render: (item) => <RenderColumnItem items={item} />,
  },
  {
    title: "Deposit",
    dataIndex: "totalDeposit",
    key: "totalDeposit",
    responsive: ["xs", "sm"],
    render: (item) => <RenderColumnItem items={item} />,
  },
  {
    title: "Withdrawal",
    dataIndex: "totalWithdrawal",
    key: "totalWithdrawal",
    responsive: ["xs", "sm"],
    render: (item) => <RenderColumnItem items={item} />,
  },
  {
    title: "Transfer",
    dataIndex: "totalTransfer",
    key: "totalTransfer",
    responsive: ["xs", "sm"],
    render: (item) => <RenderColumnItem items={item} />,
  },
  {
    title: " Pending",
    dataIndex: "totalPending",
    key: "totalPending",
    responsive: ["xs", "sm"],
    render: (item) => <RenderColumnItem items={item} />,
  },
  {
    title: "Fee",
    dataIndex: "totalFee",
    key: "totalFee",
    responsive: ["xs", "sm"],
    render: (item) => <RenderColumnItem items={item} />,
  },
  // {
  //   title: "Balance",
  //   dataIndex: "totalBalance",
  //   key: "totalBalance",
  //   responsive: ["xs", "sm"],
  //   render: (item) => <RenderColumnItem items={item} />,
  // },
];

export const RenderColumnItem = (props) => {
  const { items } = props;
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {!!items && items?.length > 0 ? (
        items.map((item, idx) => (
          <div style={{ padding: 3 }} key={idx}>
            <div style={{ display: "flex" }}>
              <span>{item?.amount.toFixed(2)}</span>
              <span style={{ width: "100%", maxWidth: 65, marginLeft: 8 }}>
                {item?.currency}
              </span>
            </div>
          </div>
        ))
      ) : (
        <span>{`0 USDT`}</span>
      )}
    </div>
  );
};

const WithEditable = ({ handleChange, form }) => {
  return (
    <FormWrapper
      form={form}
      initialValues={{
        createdAt: [
          moment(
            `${moment().subtract(0, "days").format("YYYY MM DD")}`,
            dateFormat
          ),
          moment(
            `${moment().subtract(0, "days").format("YYYY MM DD")}`,
            dateFormat
          ),
        ],
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-end",
        }}
      >
        <FormItemWrapper
          style={{ width: "100%" }}
          name="createdAt"
          label="Date"
        >
          <RangePickerWrapper onChange={handleChange} />
        </FormItemWrapper>
      </div>
    </FormWrapper>
  );
};
