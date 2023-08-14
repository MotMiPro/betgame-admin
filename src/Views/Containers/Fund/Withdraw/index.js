import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { RootContext } from "../../../../ContextApp";
import { appColor } from "../../../../configs/settings";
import {
  errorValues,
  pagingSample,
  timeFilterBy,
} from "../../../../configs/configs";
import {
  userWithdrawalManager,
  getFundHistory,
  exportData,
} from "../../../../services/middlewares/apiMiddleWare";
import { Aview } from "../../../Presentations/UIs";
import AdminTables from "../../../Presentations/UIs/Tables";
import { ButtonWrapper } from "../../../Presentations/UIs/UiModifies";

import { WithEditable } from "./withEditable";
import { withColumn, withData } from "./withColumnWithDraw";
import { connect } from "react-redux";
import FileDownload from "js-file-download";
import { fileDownload } from "../../../../ultils/helpers/fileDownload";
import TotalSum from "../../../Presentations/UIs/TotalSum";
import moment from "moment";

const tempFilter = {
  limit: 10,
  page: 1,
  sortBy: {
    createdAt: -1,
  },
};

function WithDrawFund(props) {
  const { isCustom, title, userLoginInfos } = props;
  const { authHeader: auth } = userLoginInfos;
  const sortRef = useRef(-1);
  const [loading, setLoading] = useState(false);
  const [dataSort, setDataSort] = useState(tempFilter);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [checkLoading, setCheckLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [pagination, setPagination] = useState(pagingSample);
  const [totalSum, setTotalSum] = useState(null);
  const { currencyList } = useContext(RootContext);

  const editTable = (item) => {
    console.log({ item });
  };

  const onFilter = ({ dataIndex }) => {
    const sort = {
      [dataIndex]: sortRef.current * -1,
    };
    sortRef.current = sortRef.current * -1;
    if (dataIndex) {
      handleGetWithDrawHistory({ ...dataSort, sortBy: sort });
      setDataSort((state) => ({ ...state, sortBy: sort }));
    }
  };

  const handleGetWithDrawHistory = useCallback(
    async (query) => {
      try {
        setLoading(true);
        const { data: userList } = await getFundHistory(
          query,
          auth,
          "withdraw"
        );
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
        return userList?.success;
      } catch (error) {
        console.log({ error });
        return false;
      }
    },
    [auth, editTable]
  );

  useEffect(() => {
    if (isCustom) {
      handleGetWithDrawHistory({
        ...dataSort,
        filterBy: {
          status: "approved",
        },
      });
    }
    if (!isCustom) {
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
      handleGetWithDrawHistory({ ...dataSort, ...currentDate });
    }
  }, []);

  const handleTableChanges = ({ current }) => {
    handleGetWithDrawHistory({ ...dataSort, page: current });
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
    setDataSort({
      ...dataSort,
      filterBy: visibleValue,
    });
    if (Object.keys(visibleValue).length) {
      handleGetWithDrawHistory({
        ...dataSort,
        filterBy: visibleValue,
      });
    } else {
      handleGetWithDrawHistory({ ...tempFilter });
    }
  };

  const handleClearFeilds = () => {
    handleGetWithDrawHistory({
      ...tempFilter,
    });
  };

  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: (record) => {
      return {
        disabled: record.status !== "approve",
      };
    },
  };

  const handleReload = (type) => {
    type ? setCheckLoading(true) : setCancelLoading(true);
    const getArr = { withdrawIds: selectedRowKeys };
    (type
      ? userWithdrawalManager(getArr, auth)
      : userWithdrawalManager(getArr, auth, "cancel-withdrawal")
    )
      .then(async ({ data }) => {
        if (data?.success) {
          const result = await handleGetWithDrawHistory({
            ...dataSort,
          });
          if (result) {
            setSelectedRowKeys([]);
            setCheckLoading(false);
            setCancelLoading(false);
          }
        }
        if (!data?.success) {
          setSelectedRowKeys([]);
          setCheckLoading(false);
          setCancelLoading(false);
        }
      })
      .catch(() => {
        setSelectedRowKeys([]);
        setCheckLoading(false);
        setCancelLoading(false);
      });
  };

  const handleExport = () => {
    const attachFile = { ...auth, responseType: "blob" };
    exportData(attachFile, "fund/download-withdrawal")
      .then((response) => {
        FileDownload(response.data, fileDownload("Withdraw"));
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
        title={title ? title : "withdraw history"}
        viewSum={<TotalSum title="Total withdraw" totalSum={totalSum} />}
      >
        <div
          style={{
            padding: "10px",
          }}
        >
          <WithEditable
            loading={loading}
            isCustom={isCustom}
            currencyList={currencyList}
            handleSearch={handleSearch}
            handleExport={handleExport}
            handleClearFeilds={handleClearFeilds}
          />
        </div>
      </Aview>
      <Aview>
        <div
          style={{
            padding: 20,
          }}
        >
          <ButtonWrapper
            style={{
              maxWidth: 150,
              backgroundColor:
                !selectedRowKeys.length > 0
                  ? appColor.lightgray
                  : appColor.textPrimaryColorGreen,
              color: appColor.white,
              borderRadius: 5,
              border: `1px solid ${
                !selectedRowKeys.length > 0
                  ? appColor.lightgray
                  : appColor.textPrimaryColorGreen
              }`,
            }}
            onClick={() => handleReload(true)}
            disabled={!selectedRowKeys.length > 0}
            loading={checkLoading}
          >
            Approve withdrawal
          </ButtonWrapper>
          <ButtonWrapper
            style={{
              marginLeft: 15,
              maxWidth: 150,
              color:
                !selectedRowKeys.length > 0
                  ? appColor.white
                  : appColor.textPrimaryColorGreen,
              borderRadius: 5,
              border: `1px solid ${
                !selectedRowKeys.length > 0
                  ? appColor.lightgray
                  : appColor.textPrimaryColorGreen
              }`,
            }}
            onClick={() => handleReload(false)}
            disabled={!selectedRowKeys.length > 0}
            loading={cancelLoading}
          >
            Cancel withdrawal
          </ButtonWrapper>
        </div>
        <AdminTables
          loading={loading}
          tableRender={pagination}
          rowSelection={rowSelection}
          handleTableChanges={handleTableChanges}
        />
      </Aview>
    </div>
  );
}

const mapStateToProps = (state) => ({
  userLoginInfos: state.authentication,
});

export default connect(mapStateToProps, null)(React.memo(WithDrawFund));
