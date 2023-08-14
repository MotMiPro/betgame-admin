import React, { useCallback, useEffect, useState } from "react";
import WithEditable from "./withEditable";
import { withColumn, withData } from "./withColumn";
import { errorValues, pagingSample } from "../../../configs/configs";
import AdminTables from "../../Presentations/UIs/Tables";
import { Aview } from "../../Presentations/UIs";
import {
  exportData,
  getUserList,
  userUpdateStatus,
} from "../../../services/middlewares/apiMiddleWare";
// import { RootContext } from "../../../ContextApp";
// import CreateNewUser from "./CreateNewUser";
import { useRef } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import FileDownload from "js-file-download";
import { fileDownload } from "../../../ultils/helpers/fileDownload";
import TotalSum from "../../Presentations/UIs/TotalSum";

function UserList(props) {
  const { userLoginInfos } = props;
  const { authHeader: auth } = userLoginInfos;
  const history = useHistory();
  const sortRef = useRef(-1);
  const [loading, setLoading] = useState(false);

  const [totalSum, setTotalSum] = useState(null);

  const [dataSort, setDataSort] = useState({
    limit: 10,
    page: 1,
    sortBy: {
      createdAt: -1,
    },
  });

  const [pagination, setPagination] = useState(pagingSample);
  // const { setModalState } = useContext(RootContext);

  const handleDirectToUserDetails = (item) => {
    history.push(`user-details/${item._id}`, { item });
  };

  const onFilter = ({ dataIndex }) => {
    const sort = {
      [dataIndex]: sortRef.current * -1,
    };
    sortRef.current = sortRef.current * -1;
    if (dataIndex) {
      handleGetUserList({ ...dataSort, sortBy: sort });
      setDataSort((state) => ({ ...state, sortBy: sort }));
    }
  };

  const handleGetUserList = useCallback(
    async (dataSort) => {
      try {
        setLoading(true);
        const { data: userList } = await getUserList(dataSort, auth);
        console.log({ userList });
        if (userList?.success) {
          const {
            data: resultData,
            limit,
            total,
            page,
            sumAmount,
          } = userList?.data;
          const columns = withColumn({
            handleTableUpdateUserStatus,
            onFilter,
            handleDirectToUserDetails,
          });
          const dataUI = withData(resultData);
          console.log({ dataUI });

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
    [auth]
  );

  useEffect(() => {
    handleGetUserList({ ...dataSort });
  }, []);

  const handleTableUpdateUserStatus = async (e, item, type) => {
    let isUpdate = false;
    if (type) {
      const dataSend = {
        email: item.email,
        state: e ? "active" : "block",
      };
      const { data } = await userUpdateStatus(dataSend, auth);
      if (data?.success) {
        isUpdate = true;
      }
    } else {
      console.log(item.email);
      const { data } = await userUpdateStatus(false, auth, {
        email: item?.email,
      });
      if (data?.success) {
        isUpdate = true;
      }
    }
    isUpdate && handleGetUserList({ ...dataSort });
  };

  const handleTableChanges = ({ current }) => {
    handleGetUserList({ ...dataSort, page: current });
    setDataSort((state) => ({ ...state, page: current }));
  };

  // const handleConFirm = (values) => {
  //   console.log({ values });
  // };

  // const extendTask = () => {
  //   setModalState((state) => ({
  //     ...state,
  //     isVisible: true,
  //     title: "Create new user",
  //     content: (
  //       <CreateNewUser
  //         handleConFirm={handleConFirm}
  //         setModalState={() => {
  //           setModalState((state) => ({
  //             ...state,
  //             isVisible: false,
  //             content: null,
  //           }));
  //         }}
  //       />
  //     ),
  //   }));
  // };

  let timeout = null;
  const handleSearch = (fieldsValue) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      const rangeValue = fieldsValue["createdAt"];
      const state = fieldsValue["state"];
      const email = fieldsValue["email"];
      let dateSearch = null;
      if (rangeValue) {
        dateSearch = {
          fromDate: rangeValue[0].format("YYYY-MM-DD"),
          toDate: rangeValue[1].format("YYYY-MM-DD"),
        };
      }
      const resolver = { ...dateSearch, state, email };
      Object.keys(resolver).forEach((key) =>
        errorValues.includes(resolver[key]) ? delete resolver[key] : {}
      );
      if (Object.keys(resolver).length) {
        handleGetUserList({
          ...dataSort,
          filterBy: resolver,
        });
      }
    }, 1000);
  };

  const handleClearSearch = () => {
    handleGetUserList({
      ...dataSort,
    });
  };

  const handleExport = () => {
    const attachFile = { ...auth, responseType: "blob" };
    exportData(attachFile)
      .then((response) => {
        console.log({ response });
        FileDownload(response.data, fileDownload("user"));
      })
      .catch((err) => console.log({ err }));
  };

  return (
    <div>
      <Aview
        style={{
          borderRadius: 5,
        }}
        title="All users"
        // extendTask={extendTask}
        viewSum={<TotalSum title="Total User Amount" totalSum={totalSum} />}
      >
        <div
          style={{
            padding: "10px",
          }}
        >
          <WithEditable
            loading={loading}
            handleSearch={handleSearch}
            handleExport={handleExport}
            handleClearSearch={handleClearSearch}
          />
        </div>
      </Aview>
      <Aview
        style={{
          borderRadius: 5,
          marginTop: 10,
        }}
      >
        <AdminTables
          scrollX={996}
          loading={loading}
          onFilter={onFilter}
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

export default connect(mapStateToProps, null)(React.memo(UserList));
