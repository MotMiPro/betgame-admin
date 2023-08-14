import React, { Fragment, useContext } from "react";
import { connect } from "react-redux";
import { RootContext } from "../../../../ContextApp";
import { Aview } from "../../../Presentations/UIs";
import GameDaily from "./GameDaily";

function OverViewGames({ userLoginInfos }) {
  const { authHeader: auth } = userLoginInfos;

  const { currencyList, gamesList } = useContext(RootContext);

  return (
    <Fragment>
      <Aview
        style={{
          borderRadius: 5,
        }}
        title="game overview"
      ></Aview>
      <GameDaily
        currencyList={currencyList}
        gamesList={gamesList}
        auth={auth}
      />
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  userLoginInfos: state.authentication,
});

export default connect(mapStateToProps, null)(React.memo(OverViewGames));
