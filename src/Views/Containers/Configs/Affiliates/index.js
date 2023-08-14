import React, { useCallback, useContext, useEffect, useState } from "react";
import { pagingSample } from "../../../../configs/configs";
import { Aview } from "../../../Presentations/UIs";
import AdminTables from "../../../Presentations/UIs/Tables";
import {
  getDataApis,
  updateDataApis,
} from "../../../../services/middlewares/apiMiddleWare";
import {
  CreateNewConfig,
  withConfigColumn,
  WithEditRewardConfig,
} from "./withColumn";
import { RootContext } from "../../../../ContextApp";
import { connect } from "react-redux";

function AffiliateConfig(props) {
  const { userLoginInfos } = props;
  const { authHeader } = userLoginInfos;
  const { setModalState } = useContext(RootContext);
  const [loading, setLoading] = useState([]);
  const [pagination, setPagination] = useState(pagingSample);

  const editTable = (item) => {
    setModalState((state) => ({
      ...state,
      isVisible: true,
      title: "Edit reward commission",
      content: (
        <WithEditRewardConfig
          data={item}
          handleConfirm={handleConfirm}
          setModalState={setModalState}
        />
      ),
    }));
  };

  const handleConfirm = async (item) => {
    try {
      const { data } = await updateDataApis(
        authHeader,
        item,
        "reward-commission",
        "put"
      );
      if (data?.success) {
        handleGetdata();
        setModalState((state) => ({
          ...state,
          isVisible: false,
          content: null,
        }));
      }
    } catch (error) {
      console.log("err", error);
    }
  };

  const handleGetdata = useCallback(async () => {
    setLoading(true);
    const { data } = await getDataApis(authHeader, "reward-commission");
    if (data?.success) {
      const resull =
        data?.data?.commissions?.length &&
        data?.data?.commissions.map((item, index) => ({
          ...item,
          key: index,
          action: item,
        }));
      setPagination((pagin) => ({
        ...pagin,
        column: withConfigColumn({ editTable }),
        data: resull,
        pagination: false,
      }));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    handleGetdata();
  }, []);

  const handleCreated = async ({ commision }) => {
    const { data } = await updateDataApis(
      authHeader,
      commision[0],
      "reward-commission"
    );
    if (data?.success) {
      handleGetdata();
      setModalState((state) => ({ ...state, isVisible: false, content: null }));
    }
  };

  const extendTask = () => {
    setModalState((state) => ({
      ...state,
      isVisible: true,
      title: "Create new reward commission",
      content: (
        <CreateNewConfig
          handleConFirm={handleCreated}
          setModalState={() => {
            setModalState((state) => ({
              ...state,
              isVisible: false,
              content: null,
            }));
          }}
        />
      ),
    }));
  };

  return (
    <Aview
      title="reward commission"
      extendTask={extendTask}
      style={{
        width: "max-content",
      }}
    >
      <AdminTables scrollX={350} loading={loading} tableRender={pagination} />
    </Aview>
  );
}

const mapStateToProps = (state) => ({
  userLoginInfos: state.authentication,
});

export default connect(mapStateToProps, null)(React.memo(AffiliateConfig));
