import WithFilter from "./withFilter";
import { useParams } from "react-router-dom";
import { Aview } from "../../Presentations/UIs";
import { handleGetDataApis } from "./withGetApis";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import AdminTabsTable from "../../Presentations/UIs/AdminTabsTable";
import { tabKeys, userDetailsTabs } from "../../../configs/settings";
import { useForm } from "antd/lib/form/Form";
import { errorValues } from "../../../configs/configs";
import WithUserInfos from "./withUserInfos";
import { getUserDetails } from "../../../services/middlewares/apiMiddleWare";
import { parseUrlToQuery } from "../../../ultils/helpers/parseQuery";
import { connect } from "react-redux";

function UserDetailsPage(props) {
  const { userLoginInfos } = props;
  const { authHeader: auth } = userLoginInfos;
  const param = useParams();
  const { userId } = param;
  const [form] = useForm();

  const [bodyFilter, setBodyFilter] = useState({
    limit: 10,
    page: 1,
    filterBy: {
      userId,
    },
  });
  const [loading, setLoading] = useState(false);
  const [dataTabs, setDataTabs] = useState(userDetailsTabs);
  const [filterState, setFilterState] = useState(tabKeys._FUND);

  const [dataView, setDataView] = useState(null);

  const handleTableChanges = (data) => {
    const { current, pageSize } = data;
    const sendData = {
      ...bodyFilter,
      page: current,
      limit: pageSize,
    };
    handleCallApi(filterState, sendData);
    setBodyFilter(sendData);
  };
  const handleCallApi = async (tabKey, body) => {
    setLoading(true);
    const { dataSuccess, columnSuccess, keyword, state, pagination } =
      await handleGetDataApis(tabKey, { userId }, auth, body);

    if (state) {
      const result = [...dataTabs].map((item) => {
        if (item.keyword === keyword) {
          return {
            ...item,
            data: dataSuccess,
            column: columnSuccess,
            keyword,
            pagin: pagination,
          };
        }
        return item;
      });
      setDataTabs(result);
    }
    setLoading(false);
  };

  const handleTabsChange = (key) => {
    form.resetFields();
    setFilterState(key);
    handleCallApi(key, bodyFilter);
  };

  const handleFilter = useCallback((data) => {
    const visibleValue = { ...data };
    Object.keys(visibleValue).forEach((key) =>
      errorValues.includes(visibleValue[key]) ? delete visibleValue[key] : {}
    );
    if (Object.keys(visibleValue).length > 0) {
      const sendData = {
        ...bodyFilter,
        filterBy: {
          userId,
          ...visibleValue,
        },
      };
      handleCallApi(filterState, sendData);
      setBodyFilter(sendData);
    }
  });
  const handleGetUserInfos = async () => {
    const { data } = await getUserDetails(auth, parseUrlToQuery({ userId }));
    if (data?.success) {
      setDataView(data?.data?.user);
    }
  };

  useEffect(() => {
    handleTabsChange(tabKeys._FUND);
    handleGetUserInfos();
  }, []);

  return (
    <Aview title="user details">
      {dataTabs?.length > 0 && (
        <Fragment>
          {!!dataView && <WithUserInfos dataView={dataView} />}
          <WithFilter
            form={form}
            handleFilter={handleFilter}
            filterState={filterState && filterState}
          />
          <AdminTabsTable
            scrollX={996}
            loading={loading}
            stateTabletabs={dataTabs}
            handleTabsChange={handleTabsChange}
            handleTableChanges={handleTableChanges}
          />
        </Fragment>
      )}
    </Aview>
  );
}

const mapStateToProps = (state) => ({
  userLoginInfos: state.authentication,
});

export default connect(mapStateToProps, null)(React.memo(UserDetailsPage));
