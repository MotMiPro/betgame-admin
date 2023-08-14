import WithEditable from "./withEditable";
import { Aview } from "../../../Presentations/UIs";
import { RootContext } from "../../../../ContextApp";
import { pagingSample } from "../../../../configs/configs";
import AdminTables from "../../../Presentations/UIs/Tables";
import { withCurrencyColumn, withData } from "./withColumn";
import React, { useContext, useEffect, useState } from "react";
import {
  getDataApis,
  updateDataApis,
} from "../../../../services/middlewares/apiMiddleWare";
import { connect } from "react-redux";

function CoinConfig(props) {
  const { userLoginInfos } = props;
  const { authHeader: auth } = userLoginInfos;
  const { setModalState, currencyList, setCurrencyList } =
    useContext(RootContext);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(pagingSample);

  const editTable = (item) => {
    setModalState((state) => ({
      ...state,
      isVisible: true,
      title: "Edit reward commission",
      content: (
        <WithEditable
          data={item}
          handleConfirm={handleConfirm}
          setModalState={setModalState}
        />
      ),
    }));
  };

  const handleUpdateCoin = async () => {
    const { data: currencies } = await getDataApis(auth);
    if (currencies?.success) {
      setCurrencyList(currencies?.data?.listCurrencies);
    }
  };

  const handleConfirm = async (item) => {
    try {
      const { data } = await updateDataApis(auth, item, "currency", "put");
      if (data?.success) {
        handleUpdateCoin();
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

  const handleSetTableData = (list) => {
    setPagination((pagin) => ({
      ...pagin,
      column: withCurrencyColumn({ editTable }),
      data: withData(list),
      pagination: false,
    }));
  };

  useEffect(() => {
    setLoading(true);
    if (currencyList?.length) {
      handleSetTableData(currencyList);
      setLoading(false);
    }
  }, [currencyList]);

  const extendTask = () => {
    setModalState((state) => ({
      ...state,
      isVisible: true,
      title: "Create new coin",
      content: (
        <WithEditable
          data={{}}
          isActive={false}
          handleConfirm={handleCreate}
          setModalState={setModalState}
        />
      ),
    }));
  };

  const handleCreate = async (values) => {
    const { data } = await updateDataApis(auth, values, "currency", "post");
    if (data?.success) {
      handleUpdateCoin();
      setModalState((state) => ({
        ...state,
        isVisible: false,
        content: null,
      }));
    }
  };

  return (
    <Aview title="currencies list" extendTask={extendTask}>
      <AdminTables scrollX={350} loading={loading} tableRender={pagination} />
    </Aview>
  );
}

const mapStateToProps = (state) => ({
  userLoginInfos: state.authentication,
});

export default connect(mapStateToProps, null)(React.memo(CoinConfig));
