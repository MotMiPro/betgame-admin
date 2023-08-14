import React, { useCallback, useEffect, useState } from "react";
import { pagingSample } from "../../../../../configs/configs";
import { userAffiliates } from "../../../../../services/middlewares/apiMiddleWare";
import { AWrapper } from "../../../../Presentations/UIs";
import AdminTables from "../../../../Presentations/UIs/Tables";

import { withColumn, withData } from "./withColumn";

export default function TotalMember(props) {
  const { auth } = props;
  const [loading, setLoading] = useState(false);
  const [bodySort, setBodySort] = useState({
    limit: 10,
    page: 1,
    sortBy: {
      totalReferral: -1,
    },
  });
  const [pagination, setPagination] = useState(pagingSample);

  const editTable = () => {
    console.log("editTable");
  };

  const handleFetchApi = useCallback(async (body) => {
    try {
      setLoading(true);
      const { data } = await userAffiliates(body, auth, "get-members");
      if (data?.success) {
        const { members, total, limit, page } = data?.data;
        const columns = withColumn({ editTable });
        const dataUI = withData(members);
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
      }
      setLoading(false);
    } catch (error) {
      console.log("err", error);
    }
  }, []);

  const handleTableChanges = ({ current }) => {
    handleFetchApi({ ...bodySort, page: current });
    setBodySort((state) => ({ ...state, page: current }));
  };

  useEffect(() => {
    handleFetchApi(bodySort);
  }, []);

  return (
    <AWrapper
      style={{
        marginTop: 15,
      }}
      label="total member"
    >
      <AdminTables
        loading={loading}
        tableRender={pagination}
        handleTableChanges={handleTableChanges}
      />
    </AWrapper>
  );
}
