import React, { useCallback, useEffect, useState } from "react";
import { getAffiliateOverview } from "../../../../../services/middlewares/apiMiddleWare";
import { AWrapper } from "../../../../Presentations/UIs";
import { AdminPieCharts } from "../../../../Presentations/UIs/Charts";

export default function TotalUsersCommission(props) {
  const { auth } = props;
  const [dataChart, setDataChart] = useState([]);

  const handleFetchApi = useCallback(async () => {
    const { data } = await getAffiliateOverview(auth);
    if (data?.success) {
      const result = data?.data?.totalUserCommission?.map((item) => ({
        type: item.currency,
        value: item.totalCommission,
      }));
      if (result) {
        setDataChart(result);
      }
    }
    if (!data?.success) {
      console.log("failed");
    }
  }, []);

  useEffect(() => {
    handleFetchApi();
  }, []);

  return (
    <AWrapper label="total User Commissions">
      {dataChart && <AdminPieCharts dataChart={dataChart} />}
    </AWrapper>
  );
}
