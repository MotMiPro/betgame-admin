import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { pagingSample } from "../../../../configs/configs";
import { userAffiliates } from "../../../../services/middlewares/apiMiddleWare";
import { Aview, AWrapper } from "../../../Presentations/UIs";
import AdminTables from "../../../Presentations/UIs/Tables";
import { ColWrapper, RowWrapper } from "../../../Presentations/UIs/UiModifies";
import { withColumn, withData } from "./withAfColumns";

function TopReferral(props) {
  const { userLoginInfos } = props;
  const { authHeader: auth } = userLoginInfos;
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

  const handleGettopreferalUsers = useCallback(async (body) => {
    try {
      setLoading(true);
      const { data } = await userAffiliates(body, auth);
      if (data?.success) {
        const { topReferral, total, limit, page } = data?.data;
        const columns = withColumn({ editTable });
        const dataUI = withData(topReferral);
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
    handleGettopreferalUsers({ ...bodySort, page: current });
    setBodySort((state) => ({ ...state, page: current }));
  };

  useEffect(() => {
    handleGettopreferalUsers(bodySort);
  }, []);

  return (
    <Aview
      title="Top referral user"
      style={{
        width: "max-content",
      }}
    >
      <AWrapper>
        <RowWrapper
          style={{
            padding: 10,
          }}
        >
          <ColWrapper>
            <AdminTables
              scrollX={996}
              loading={loading}
              tableRender={pagination}
              handleTableChanges={handleTableChanges}
            />
          </ColWrapper>
        </RowWrapper>
      </AWrapper>
    </Aview>
  );
}

const mapStateToProps = (state) => ({
  userLoginInfos: state.authentication,
});

export default connect(mapStateToProps, null)(React.memo(TopReferral));
