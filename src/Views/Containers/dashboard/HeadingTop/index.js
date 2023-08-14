import React, { useContext } from "react";
import { connect } from "react-redux";
import { RootContext } from "../../../../ContextApp";
import GameDaily from "../../games/Overview/GameDaily";

function HeadingDashboard(props) {
  const { currencyList, gamesList } = useContext(RootContext);
  const { userLoginInfos } = props;
  const { authHeader } = userLoginInfos;
  return (
    <GameDaily
      currencyList={currencyList}
      gamesList={gamesList}
      auth={authHeader}
    />
  );
}
const mapStateToProps = (state) => ({
  userLoginInfos: state.authentication,
});

export default connect(mapStateToProps, null)(React.memo(HeadingDashboard));
