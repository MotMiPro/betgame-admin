import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import { connect } from "react-redux";
import {
  errorValues,
  pagingSample,
  timeFilterBy,
} from "../../../../configs/configs";
import { RootContext } from "../../../../ContextApp";
import {
  exportData,
  getFundHistory,
} from "../../../../services/middlewares/apiMiddleWare";
import { fileDownload } from "../../../../ultils/helpers/fileDownload";
import { Aview } from "../../../Presentations/UIs";
import AdminTables from "../../../Presentations/UIs/Tables";

import { withColumn, withData } from "./withColumn";
import { WithEditable } from "./withEditAble";
import FileDownload from "js-file-download";
import TotalSum from "../../../Presentations/UIs/TotalSum";
import moment from "moment";

const tempData = {
  limit: 10,
  page: 1,
  sortBy: {
    createdAt: -1,
  },
};

function DepositFund(props) {
  const { userLoginInfos } = props;
  const { authHeader: auth } = userLoginInfos;
  const [loading, setLoading] = useState(false);
  const [dataSort, setDataSort] = useState(tempData);
  const sortRef = useRef(-1);
  const [pagination, setPagination] = useState(pagingSample);

  const [totalSum, setTotalSum] = useState(null);
  const { currencyList } = useContext(RootContext);

  const currencies = useMemo(() => {
    const list =
      currencyList?.length &&
      currencyList.map((item) => ({
        label: item.currency,
        value: item.currency,
      }));
    return list;
  }, [currencyList]);

  const editTable = (item) => {
    console.log({ item });
  };

  const onFilter = ({ dataIndex }) => {
    const sort = {
      [dataIndex]: sortRef.current * -1,
    };
    sortRef.current = sortRef.current * -1;
    if (dataIndex) {
      handleGetDepositHistory({ ...dataSort, sortBy: sort });
      setDataSort((state) => ({ ...state, sortBy: sort }));
    }
  };

  const handleGetDepositHistory = useCallback(
    async (dataSort) => {
      try {
        setLoading(true);
        const { data: userList } = await getFundHistory(dataSort, auth);
        if (userList?.success) {
          const {
            data: resultData,
            limit,
            total,
            page,
            sumAmount,
          } = userList?.data;
          const columns = withColumn({ editTable, onFilter });
          const dataUI = withData(resultData);
          setPagination((pagin) => ({
            ...pagin,
            column: columns,
            data: dataUI,
            pagination: {
              total: total,
              current: page,
              pageSize: limit,
            },
          }));
          setTotalSum(sumAmount);
        }
        setLoading(false);
      } catch (error) {
        console.log({ error });
      }
    },
    [auth, editTable]
  );

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
    handleGetDepositHistory({ ...dataSort, ...currentDate });
  }, []);

  const handleTableChanges = ({ current }) => {
    handleGetDepositHistory({ ...dataSort, page: current });
    setDataSort((state) => ({ ...state, page: current }));
  };

  const handleSearch = (fieldsValue) => {
    const visibleValue = { ...fieldsValue };
    const datePicker = fieldsValue.createdAt;
    if (!!datePicker && !datePicker.some((item) => item === ` `)) {
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
    setDataSort({
      ...dataSort,
      filterBy: visibleValue,
    });
    if (Object.keys(visibleValue).length) {
      handleGetDepositHistory({
        ...dataSort,
        filterBy: visibleValue,
      });
    } else {
      handleGetDepositHistory({ ...tempData });
    }
  };

  const handleClearFeilds = () => {
    handleGetDepositHistory({
      ...tempData,
    });
  };

  const handleExport = () => {
    const attachFile = { ...auth, responseType: "blob" };
    exportData(attachFile, "fund/download-deposit")
      .then((response) => {
        FileDownload(response.data, fileDownload("Deposit"));
      })
      .catch((err) => console.log({ err }));
  };

  return (
    <div>
      <Aview
        style={{
          borderRadius: 5,
          marginBottom: 10,
        }}
        title="deposite history"
        viewSum={<TotalSum title="Total Deposit" totalSum={totalSum} />}
      >
        <div
          style={{
            padding: "10px",
          }}
        >
          <WithEditable
            loading={loading}
            currencies={currencies}
            handleSearch={handleSearch}
            handleExport={handleExport}
            handleClearFeilds={handleClearFeilds}
          />
        </div>
      </Aview>
      <Aview>
        <AdminTables
          loading={loading}
          tableRender={pagination}
          handleTableChanges={handleTableChanges}
        />
      </Aview>
    </div>
  );
}

const mapStateToProps = (state) => ({
  userLoginInfos: state.authentication,
});

export default connect(mapStateToProps, null)(React.memo(DepositFund));
