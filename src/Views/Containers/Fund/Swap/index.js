import moment from "moment";
import { useSelector } from "react-redux";
import React, { useEffect, useState, useMemo, useContext, useRef } from "react";
import { Aview } from "../../../Presentations/UIs";
import {
  errorValues,
  pagingSample,
  timeFilterBy,
} from "../../../../configs/configs";
import AdminTables from "../../../Presentations/UIs/Tables";
import { parseTimer } from "../../../../ultils/helpers/parseTimer";
import { getSwapDataApis } from "../../../../services/middlewares/apiMiddleWare";
import TotalSum from "../../../Presentations/UIs/TotalSum";
import WithSwapFilter from "./withSwapFilter";
import { RootContext } from "../../../../ContextApp";
import { TitleColumn } from "../../../Presentations/UIs/UiModifies";
import EmailComponent from "../../../Presentations/UIs/EmailComponent";

const tempData = {
  limit: 10,
  page: 1,
  sortBy: {
    createdAt: -1,
  },
};
function SwapHistory() {
  const { authHeader } = useSelector((state) => state.authentication);
  const [dataSort, setDataSort] = useState(tempData);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(pagingSample);
  const [totalSum, setTotalSum] = useState(null);
  const { currencyList } = useContext(RootContext);

  const sortRef = useRef(-1);

  const currencies = useMemo(() => {
    const list =
      currencyList?.length &&
      currencyList.map((item) => ({
        label: item.currency,
        value: item.currency,
      }));
    return list;
  }, [currencyList]);

  const onFilter = ({ dataIndex }) => {
    const sort = {
      [dataIndex]: sortRef.current * -1,
    };
    sortRef.current = sortRef.current * -1;
    if (dataIndex) {
      handleGetHistory({ ...dataSort, sortBy: sort });
      setDataSort((state) => ({ ...state, sortBy: sort }));
    }
  };

  const handleGetHistory = async (dataSort) => {
    try {
      setLoading(true);
      const { data: historyList } = await getSwapDataApis(authHeader, dataSort);
      const { data, limit, page, total, sumAmount } = historyList?.data;
      setPagination((pagin) => ({
        ...pagin,
        column: withColumn({ onFilter }),
        data: withData(data),
        pagination: {
          total,
          current: page,
          pageSize: limit,
        },
      }));
      setTotalSum(sumAmount);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleTableChanges = ({ current }) => {
    handleGetHistory({ ...dataSort, page: current });
    setDataSort((state) => ({ ...state, page: current }));
  };

  const handleSearch = (fieldsValue) => {
    const visibleValue = { ...fieldsValue };
    const datePicker = fieldsValue.createdAt;
    if (!!datePicker) {
      visibleValue.fromDate = `${datePicker[0].format("YYYY-MM-DD")} ${
        timeFilterBy.from
      }`;
      visibleValue.toDate = `${datePicker[1].format("YYYY-MM-DD")} ${
        timeFilterBy.to
      }`;
      delete visibleValue["createdAt"];
    }
    Object.keys(visibleValue).forEach((key) =>
      errorValues.includes(visibleValue[key]) ? delete visibleValue[key] : {}
    );
    if (!datePicker) {
      visibleValue.fromDate = "";
      visibleValue.toDate = "";
    }

    if (Object.keys(visibleValue).length) {
      handleGetHistory({
        ...dataSort,
        filterBy: visibleValue,
      });
    }
    setDataSort({
      ...dataSort,
      filterBy: visibleValue,
    });
  };
  const handleClearFields = () => {
    handleGetHistory({
      ...tempData,
    });
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
    handleGetHistory({ ...dataSort, ...currentDate });
  }, []);

  return (
    <div>
      <Aview
        title="Swap History"
        style={{ marginTop: 30 }}
        viewSum={<TotalSum title="Total" totalSum={totalSum} />}
      >
        <div
          style={{
            padding: "10px",
          }}
        >
          <WithSwapFilter
            loading={loading}
            currencies={currencies}
            handleSearch={handleSearch}
            handleClearFields={handleClearFields}
          />
        </div>
      </Aview>
      <Aview style={{ marginTop: 15 }}>
        <AdminTables
          scrollX={350}
          loading={loading}
          tableRender={pagination}
          handleTableChanges={handleTableChanges}
        />
      </Aview>
    </div>
  );
}

export default React.memo(SwapHistory);

export const withData = (arr) => {
  return arr.map((item, idx) => {
    return {
      key: idx,
      createdAt: parseTimer(item?.createdAt),
      atPrice: item?.atPrice,
      fee: item?.fee,
      from: item?.from,
      to: item?.to,
      fromAmount: item?.fromAmount,
      toAmount: item?.toAmount,
      email: item?.userId,
    };
  });
};

export const withColumn = ({ onFilter }) => [
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
    title: "Email",
    dataIndex: "email",
    key: "email",
    responsive: ["xs", "sm"],
    render: (item) => (
      <EmailComponent item={{ email: item?.email, id: item?._id }} />
    ),
  },
  {
    title: () => <TitleColumn title="At Price" />,
    dataIndex: "atPrice",
    key: "atPrice",
    responsive: ["xs", "sm"],
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
    onHeaderCell: (column) => {
      return {
        onClick: () => onFilter(column),
      };
    },
  },
  {
    title: () => <TitleColumn title="From" />,
    dataIndex: "from",
    key: "from",
    responsive: ["xs", "sm"],
    onHeaderCell: (column) => {
      return {
        onClick: () => onFilter(column),
      };
    },
  },
  {
    title: () => <TitleColumn title="To" />,
    dataIndex: "to",
    key: "to",
    responsive: ["xs", "sm"],
    onHeaderCell: (column) => {
      return {
        onClick: () => onFilter(column),
      };
    },
  },
  {
    title: () => <TitleColumn title="From Amount" />,
    dataIndex: "fromAmount",
    key: "fromAmount",
    responsive: ["xs", "sm"],
    onHeaderCell: (column) => {
      return {
        onClick: () => onFilter(column),
      };
    },
  },
  {
    title: () => <TitleColumn title="To Amount" />,
    dataIndex: "toAmount",
    key: "toAmount",
    responsive: ["xs", "sm"],
    onHeaderCell: (column) => {
      return {
        onClick: () => onFilter(column),
      };
    },
  },
];
