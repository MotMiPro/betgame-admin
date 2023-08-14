import WithFilter from "./WithFilter";
import { Aview, AWrapper } from "../../../Presentations/UIs";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AdminLineCharts } from "../../../Presentations/UIs/Charts";
import { removeFailureValues } from "../../../../ultils/objectManager";
import { getGameDaily } from "../../../../services/middlewares/apiMiddleWare";

const daySearch = {
  month: 30,
  week: 7,
};

export default function GameDaily(props) {
  const { auth, currencyList, gamesList } = props;

  const currencies = useMemo(() => {
    const list =
      currencyList?.length &&
      currencyList.map((item) => ({
        label: item.currency,
        value: item.currency,
      }));
    return list;
  }, [currencyList]);

  const games = useMemo(() => {
    const list =
      gamesList?.length &&
      gamesList.map((item) => ({
        label: item.name,
        value: item.name,
      }));
    return list;
  }, [gamesList]);

  const [dataChart, setDataChart] = useState(null);
  let query = {
    days: 15,
    game: "Dice",
    currency: "USDT",
  };

  const handleFetchApi = useCallback(async (filter) => {
    const { data } = await getGameDaily(auth, filter);
    if (data?.success) {
      const overviewData = data?.data?.dailyRevenue.map((item) => ({
        date: item?.date && item?.date.substr(5),
        value: item?.revenue,
      }));
      if (overviewData) {
        setDataChart(overviewData);
      }
    }
  }, []);

  useEffect(() => {
    handleFetchApi(query);
  }, []);

  const handleFilter = (values) => {
    const getDataSend = removeFailureValues(values);
    if (Object.keys(getDataSend).length) {
      const finalData = {
        ...getDataSend,
        days: daySearch[getDataSend["days"]],
      };
      handleFetchApi(finalData);
    }
  };
  return (
    <Aview
      style={{
        marginTop: 15,
      }}
      title="Daily revenue"
    >
      <div
        style={{
          padding: 10,
        }}
      >
        <WithFilter
          games={games}
          currencies={currencies}
          handleFilter={handleFilter}
          handleFetchApi={handleFetchApi}
        />
      </div>
      <AWrapper>
        <AdminLineCharts dataChart={dataChart} />
      </AWrapper>
    </Aview>
  );
}
