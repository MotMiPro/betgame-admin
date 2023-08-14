import { Button } from "antd";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { pagingSample } from "../../../configs/configs";
import { appColor } from "../../../configs/settings";
import { RootContext } from "../../../ContextApp";
import {
  getDataApis,
  updateDataApis,
} from "../../../services/middlewares/apiMiddleWare";
import { Aview } from "../../Presentations/UIs";
import { openNotification } from "../../Presentations/UIs/Notifications";
import AdminTables from "../../Presentations/UIs/Tables";
import WithBodyModals from "./withBodyModals";
import { withBotDatas, withBotColumns } from "./withBotsColumns";

function BotManager() {
  const { authHeader } = useSelector((state) => state.authentication);
  const { setModalState } = useContext(RootContext);
  const [loading, setLoading] = useState([]);
  const [pagination, setPagination] = useState(pagingSample);

  const [allBots, setAllBots] = useState(0);

  const editTable = (item) => {
    setModalState((state) => ({
      ...state,
      isVisible: true,
      title: "Edit Bot",
      content: (
        <WithBodyModals
          data={item}
          handleConfirm={(values) => handleConfirm(values, item?.id, "put")}
          setModalState={setModalState}
        />
      ),
    }));
  };

  const extendTask = () => {
    setModalState((state) => ({
      ...state,
      isVisible: true,
      title: "Create New Bot",
      content: (
        <WithBodyModals
          data={null}
          handleConfirm={(values) => handleConfirm(values, false, "post")}
          setModalState={setModalState}
        />
      ),
    }));
  };

  const handleConfirm = async (values, status, type) => {
    try {
      const body = {
        userName: values?.userName,
        betFromAmount: values?.betFromAmount,
        isRandomUserName: values.isRandomUserName ?? false,
        isActive: values.isActive ?? false,
        betToAmount: values?.betToAmount,
        cashOutFromAmount: values?.cashOutFromAmount,
        cashOutToAmount: values?.cashOutToAmount,
      };

      const { data } = await updateDataApis(
        authHeader,
        status ? { ...body, id: status } : body,
        "bot-moon",
        type
      );
      if (data?.success) {
        await handleGetdata();
        setModalState((state) => ({ ...state, isVisible: false }));
        openNotification({ description: "Successfully", title: "Bitwin" });
      }
      if (!data?.success) {
        const err = data?.error?.message;
        openNotification({ description: err, title: "Bitwin" });
      }
    } catch (error) {
      openNotification({ description: "Oops, Try again!", title: "Bitwin" });
    }
  };
  const deleteBots = (id) => {
    setModalState((state) => ({
      ...state,
      isVisible: true,
      content: (
        <ConfirmUI
          handleConfirm={() => handleDeleteApi(id)}
          handleCancel={() =>
            setModalState((state) => ({
              ...state,
              isVisible: false,
            }))
          }
        />
      ),
      title: "Are you sure to confirm delete this BOT ?",
    }));
  };

  const handleDeleteApi = async (id) => {
    const { data } = await updateDataApis(
      authHeader,
      { id },
      "bot-moon",
      "delete"
    );
    if (data?.success) {
      await handleGetdata();
      setModalState((state) => ({ ...state, isVisible: false }));
      openNotification({ description: "Successfully", title: "Bitwin" });
    }
    if (!data?.success) {
      openNotification({ description: "Oops, Try again!", title: "Bitwin" });
    }
  };

  const handleGetdata = useCallback(async () => {
    setLoading(true);
    const { data } = await getDataApis(authHeader, "bot-moon");
    if (data?.success) {
      const { data: bots } = data?.data;
      setPagination((pagin) => ({
        ...pagin,
        column: withBotColumns({ editTable, deleteBots }),
        data: withBotDatas(bots),
        pagination: false,
      }));
      setAllBots(bots?.length);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    handleGetdata();
  }, []);

  return (
    <Aview
      title={
        <span>
          <span> Moon Bots Manager</span>{" "}
          <span
            style={{
              padding: "0px 10px",
              backgroundColor: appColor.textPrimaryColorGreen,
              color: appColor.white,
              borderRadius: 5,
            }}
          >{`  ${allBots}`}</span>
        </span>
      }
      extendTask={extendTask}
    >
      <AdminTables scrollX={350} loading={loading} tableRender={pagination} />
    </Aview>
  );
}

export default React.memo(BotManager);

const ConfirmUI = (props) => {
  const { handleConfirm, handleCancel } = props;
  return (
    <section>
      <div style={{ display: "flex", justifyContent: "center", gap: 20 }}>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleConfirm} type="primary">
          Confirm
        </Button>
      </div>
    </section>
  );
};
