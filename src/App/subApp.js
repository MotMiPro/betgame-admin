import MainLayout from "./Layout";
import { adminRoute } from "./Routes";
import { connect } from "react-redux";
import Login from "../Views/Containers/Login";
import { ContextProvider } from "../ContextApp";
import { Route, Switch } from "react-router-dom";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { getDataApis } from "../services/middlewares/apiMiddleWare";
import * as userActions from "../states/login/actions";
import { bindActionCreators } from "redux";

function SubApp(props) {
  const { userLoginInfos = {}, userAction } = props;
  const { userLoggedOut } = userAction;
  const { isLoggedIn, authHeader } = userLoginInfos;

  const [allow, setAllow] = useState(true);
  const [gamesList, setGamesList] = useState(null);
  const [currencyList, setCurrencyList] = useState(null);

  const handleGetData = useCallback(async (token) => {
    const { data: currencies } = await getDataApis(token);
    if (currencies?.success) {
      setCurrencyList(currencies?.data?.listCurrencies);
    }

    const { data: games } = await getDataApis(token, "game-config");
    if (games?.success) {
      setGamesList(games?.data?.gameConfig);
      setAllow(false);
    }
    if (!games?.success) {
      const code = "USER022";
      if (games?.error?.code === code) {
        setAllow(false);
        userLoggedOut();
      }
    }
  }, []);

  useEffect(() => {
    allow && isLoggedIn && !!authHeader && handleGetData(authHeader);
  }, [allow, authHeader, isLoggedIn]);

  return (
    <Fragment>
      {isLoggedIn ? (
        <ContextProvider
          gamesList={gamesList?.length && gamesList}
          currencyList={currencyList?.length && currencyList}
          userLoginInfos={userLoginInfos}
          setCurrencyList={setCurrencyList}
        >
          <MainLayout>
            <Switch>
              {adminRoute.map(({ path, component }, idx) => (
                <Route key={idx} path={path} exact component={component} />
              ))}
            </Switch>
          </MainLayout>
        </ContextProvider>
      ) : (
        <Login />
      )}
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  userLoginInfos: state.authentication,
});

const mapDispatchToProps = (dispatch) => ({
  userAction: bindActionCreators(userActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(SubApp));
