import React, { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  errorValues,
  pagingSample,
  timeFilterBy,
} from "../../../../configs/configs";
import { RootContext } from "../../../../ContextApp";
import { getMyGames } from "../../../../services/middlewares/apiMiddleWare";
import { Aview } from "../../../Presentations/UIs";
import AdminTable from "../../../Presentations/UIs/Tables";
import { turnNewDiceMygame, withMyNewDiceColumns } from "./withColumns";
import { WithSearch } from "./withSearch";

const tempFilter = {
  limit: 10,
  page: 1,
  sortBy: {
    createdAt: -1,
  },
};

function MyGames() {
  const sortRef = useRef(-1);
  const { currencyList } = useContext(RootContext);
  const { authHeader } = useSelector((state) => state.authentication);
  const [loading, setLoading] = useState(false);
  const [dataSort, setDataSort] = useState(tempFilter);
  const [tabledata, setTabledata] = useState(pagingSample);

  const handleSearch = async (fieldsValue) => {
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
    if (Object.keys(visibleValue).length) {
      handleGetGames({
        ...dataSort,
        filterBy: visibleValue,
      });
    }
    setDataSort({
      ...dataSort,
      filterBy: visibleValue,
    });
  };
  const handleClearFeilds = async () => {
    handleGetGames(tempFilter);
    setDataSort(tempFilter);
  };

  const handlePagin = ({ current, pageSize }) => {
    handleGetGames({ ...dataSort, page: current, limit: pageSize });
    setDataSort((state) => ({ ...state, page: current, limit: pageSize }));
  };

  const onFilter = ({ dataIndex }) => {
    const sort = {
      [dataIndex]: sortRef.current * -1,
    };
    sortRef.current = sortRef.current * -1;
    if (dataIndex) {
      handleGetGames({ ...dataSort, sortBy: sort });
      setDataSort((state) => ({ ...state, sortBy: sort }));
    }
  };

  const handleGetGames = async (query) => {
    try {
      setLoading(true);
      const { data } = await getMyGames(query, authHeader, "user-new-dice");
      if (data?.success) {
        const { data: list, limit, page, total } = data?.data;
        setTabledata((pagin) => ({
          ...pagin,
          column: withMyNewDiceColumns(onFilter),
          data: turnNewDiceMygame(list),
          pagination: {
            total: total,
            current: page,
            pageSize: limit,
          },
        }));
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetGames(dataSort);
  }, []);

  return (
    <Aview
      style={{
        position: "relative",
        top: 15,
      }}
    >
      <div
        style={{
          padding: "10px",
        }}
      >
        <WithSearch
          loading={loading}
          currencyList={currencyList}
          handleSearch={handleSearch}
          handleClearFeilds={handleClearFeilds}
        />
      </div>
      <AdminTable
        scrollX={350}
        loading={loading}
        tableRender={tabledata}
        handleTableChanges={handlePagin}
      />
    </Aview>
  );
}

export default React.memo(MyGames);
