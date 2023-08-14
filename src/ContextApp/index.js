import { Modal, Spin } from "antd";
import React, { createContext, useState } from "react";

export const RootContext = createContext();

const tempModal = {
  isVisible: false,
  title: "bitwin",
  content: null,
  confirmBtn: null,
  cancelBtn: null,
  style: {},
};

export const ContextProvider = (props) => {
  const { userLoginInfos, gamesList, currencyList, setCurrencyList } = props;
  const { infos } = userLoginInfos;

  const [userName, setUsername] = useState(infos ?? null);
  const [isloading, setIsloading] = useState(false);
  const [modalState, setModalState] = useState(tempModal);

  return (
    <RootContext.Provider
      value={{
        isloading,
        userName,
        setIsloading,
        setUsername,
        setModalState,
        modalState,
        currencyList,
        gamesList,
        setCurrencyList,
      }}
    >
      <Spin
        tip="Loading..."
        spinning={isloading}
        style={{ maxHeight: "unset" }}
      >
        {props.children}
        <Modal
          maskClosable={false}
          closable={false}
          style={modalState?.style}
          title={modalState?.title}
          visible={modalState?.isVisible}
          onCancel={
            modalState?.cancelBtn
              ? modalState?.cancelBtn
              : () => setModalState(tempModal)
          }
          footer={false}
        >
          {modalState?.content}
        </Modal>
      </Spin>
    </RootContext.Provider>
  );
};
