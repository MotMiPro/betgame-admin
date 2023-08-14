import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { pagingSample } from "../../../../configs/configs";
import { RootContext } from "../../../../ContextApp";
import { gameDataApis } from "../../../../services/middlewares/apiMiddleWare";
import { Aview, AWrapper } from "../../../Presentations/UIs";
import AdminTables from "../../../Presentations/UIs/Tables";
import {
  ColWrapper,
  RowWrapper,
  SelectComponent,
} from "../../../Presentations/UIs/UiModifies";
import { withdata, withGainerColumns } from "./withColumns";

const handleGetdataGames = async (gainerQuery, auth, endPoint) => {
  try {
    const { data } = await gameDataApis(gainerQuery, auth, endPoint);
    if (data?.success) {
      return data?.data;
    }
  } catch (error) {}
};

function TableGames({
  title,
  loser,
  gainer,
  player,
  currencyInit,
  string,
  userLoginInfos,
}) {
  const { authHeader: auth } = userLoginInfos;
  const { currencyList } = useContext(RootContext);
  const [initCurrency, setinitCurrency] = useState(currencyInit);

  const [loading, setLoading] = useState([]);
  const [initTopPlayerQuery, setinitTopPlayerQuery] = useState(player);
  const [initTopGainerQuery, setinitTopGainerQuery] = useState(gainer);
  const [initTopLoserQuery, setinitTopLoserQuery] = useState(loser);
  const [paginationGainer, setPaginationGainer] = useState(pagingSample);
  const [paginationLoser, setPaginationLoser] = useState(pagingSample);
  const [paginationTopPlay, setPaginationTopPlay] = useState(pagingSample);

  const handleGetTopGainer = async (dataQuery) => {
    const result = await handleGetdataGames(dataQuery, auth);
    const { data: list, limit, total, page } = result;
    setPaginationGainer((state) => ({
      ...state,
      column: withGainerColumns(),
      data: withdata(list),
      pagination: {
        total: total,
        current: page,
        pageSize: limit,
      },
    }));
    setLoading(false);
  };
  const handleGetToploser = async (dataQuery) => {
    const result = await handleGetdataGames(dataQuery, auth);
    const { data: list, limit, total, page } = result;
    setPaginationLoser((state) => ({
      ...state,
      column: withGainerColumns(),
      data: withdata(list),
      pagination: {
        total: total,
        current: page,
        pageSize: limit,
      },
    }));
    setLoading(false);
  };
  const handleGetTopPlay = async (dataQuery) => {
    const result = await handleGetdataGames(dataQuery, auth, "top-play");
    const { data: list, limit, total, page } = result;
    setPaginationTopPlay((state) => ({
      ...state,
      column: withGainerColumns(),
      data: withdata(list),
      pagination: {
        total: total,
        current: page,
        pageSize: limit,
      },
    }));
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    handleGetTopGainer(initTopGainerQuery);
    handleGetToploser(initTopLoserQuery);
    handleGetTopPlay(initTopPlayerQuery);
  }, []);

  const handleTableGainerChanges = ({ current }) => {
    handleGetTopGainer({
      ...initTopGainerQuery,
      page: current,
    });
    setinitTopGainerQuery((state) => ({ ...state, page: current }));
  };

  const handleTableLoserChanges = ({ current }) => {
    handleGetToploser({
      ...initTopGainerQuery,
      page: current,
    });
    setinitTopLoserQuery((state) => ({ ...state, page: current }));
  };
  const handleTableTopPlayerChanges = ({ current }) => {
    handleGetTopPlay({
      ...initTopGainerQuery,
      page: current,
    });
    setinitTopPlayerQuery((state) => ({ ...state, page: current }));
  };

  const handleSelectCurrency = (value) => {
    setinitCurrency(value);
    handleGetTopGainer({
      ...initTopGainerQuery,
      filterBy: {
        game: string,
        currency: value,
      },
    });
    handleGetToploser({
      ...initTopLoserQuery,
      filterBy: {
        game: string,
        currency: value,
      },
    });
    handleGetTopPlay({
      ...initTopPlayerQuery,
      filterBy: {
        game: string,
        currency: value,
      },
    });
  };
  const currencies =
    (currencyList?.length &&
      currencyList.map((item) => ({
        label: item.currency,
        value: item.currency,
      }))) ||
    [];

  return (
    <Aview
      title={title}
      style={{
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 10,
        }}
      >
        <SelectComponent
          list={currencies}
          handleChange={handleSelectCurrency}
          defaultSelect={initCurrency}
        />
      </div>
      <RowWrapper
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        style={{
          padding: 5,
        }}
      >
        <ColWrapper span={8}>
          <Aview>
            <AWrapper
              label={
                <span
                  style={{
                    fontSize: 15,
                  }}
                >
                  top gainer
                </span>
              }
            >
              <AdminTables
                scrollX={350}
                loading={loading}
                tableRender={paginationGainer}
                handleTableChanges={handleTableGainerChanges}
              />
            </AWrapper>
          </Aview>
        </ColWrapper>
        <ColWrapper span={8}>
          <Aview>
            <AWrapper
              label={
                <span
                  style={{
                    fontSize: 15,
                  }}
                >
                  top loser
                </span>
              }
            >
              <AdminTables
                scrollX={350}
                loading={loading}
                tableRender={paginationLoser}
                handleTableChanges={handleTableLoserChanges}
              />
            </AWrapper>
          </Aview>
        </ColWrapper>
        <ColWrapper span={8}>
          <Aview>
            <AWrapper
              label={
                <span
                  style={{
                    fontSize: 15,
                  }}
                >
                  top player
                </span>
              }
            >
              <AdminTables
                scrollX={350}
                loading={loading}
                tableRender={paginationTopPlay}
                handleTableChanges={handleTableTopPlayerChanges}
              />
            </AWrapper>
          </Aview>
        </ColWrapper>
      </RowWrapper>
    </Aview>
  );
}

const mapStateToProps = (state) => ({
  userLoginInfos: state.authentication,
});

export default connect(mapStateToProps, null)(React.memo(TableGames));
