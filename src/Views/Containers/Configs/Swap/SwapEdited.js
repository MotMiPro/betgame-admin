import { Aview } from "../../../Presentations/UIs";
import { RootContext } from "../../../../ContextApp";
import { pagingSample } from "../../../../configs/configs";
import AdminTables from "../../../Presentations/UIs/Tables";
import { withSwapColumn, withSwapData } from "./withSwapColumn";
import React, { useContext, useEffect, useState } from "react";
import {
  getDataApis,
  updateDataApis,
} from "../../../../services/middlewares/apiMiddleWare";
import { useSelector } from "react-redux";
import WithSwapEditable from "./withSwapEdit";

function SwapEdited() {
  const { setModalState } = useContext(RootContext);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(pagingSample);
  const { authHeader: auth } = useSelector((state) => state.authentication);

  const editTable = (item) => {
    setModalState((state) => ({
      ...state,
      isVisible: true,
      title: "Edit Swap",
      content: (
        <WithSwapEditable
          data={item}
          handleConfirm={handleConfirm}
          setModalState={setModalState}
        />
      ),
    }));
  };

  const handleUpdateProduct = async () => {
    setLoading(true);
    const { data: products } = await getDataApis(auth, "product");
    if (products?.success) {
      const list = products?.data?.products;
      setPagination((pagin) => ({
        ...pagin,
        column: withSwapColumn({ editTable }),
        data: withSwapData(list),
        pagination: false,
      }));
    }
    setLoading(false);
  };

  const handleConfirm = async (values) => {
    try {
      console.log({ values });
      const body = {
        base: values?.base ?? "",
        fee: values?.fee ?? "",
        isActive: values?.isActive ?? false,
        isInSystem: values?.isInSystem ?? false,
        isInversePair: values?.isInversePair ?? false,
        minAmount: values?.minAmount ?? "",
        pair: values?.pair ?? "",
        price: values?.quote ?? 0,
        quote: values?.quote ?? "",
      };
      const { data } = await updateDataApis(auth, body, "product", "put");
      if (data?.success) {
        handleUpdateProduct();
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

  const extendTask = () => {
    setModalState((state) => ({
      ...state,
      isVisible: true,
      title: "Create new",
      content: (
        <WithSwapEditable
          data={{}}
          isActive={false}
          handleConfirm={handleCreate}
          setModalState={setModalState}
        />
      ),
    }));
  };

  const handleCreate = async (values) => {
    const body = {
      base: values?.base ?? "",
      fee: values?.fee ?? "",
      isActive: values?.isActive ?? false,
      isInSystem: values?.isInSystem ?? false,
      isInversePair: values?.isInversePair ?? false,
      minAmount: values?.minAmount ?? "",
      pair: values?.pair ?? "",
      price: values?.price ?? 0,
      quote: values?.quote ?? "",
    };
    const { data } = await updateDataApis(auth, body, "product", "post");
    if (data?.success) {
      handleUpdateProduct();
      setModalState((state) => ({
        ...state,
        isVisible: false,
        content: null,
      }));
    }
  };

  useEffect(() => {
    handleUpdateProduct();
  }, []);

  return (
    <Aview title="Swap" extendTask={extendTask}>
      <AdminTables scrollX={350} loading={loading} tableRender={pagination} />
    </Aview>
  );
}

export default React.memo(SwapEdited);
