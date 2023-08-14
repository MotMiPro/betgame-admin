import "antd/dist/antd.css";
import "../assets/index.scss";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands";
import "@fortawesome/fontawesome-free/js/fontawesome";
import { Router } from "react-router-dom";
import { PersistGate } from "redux-persist/lib/integration/react";
import React, { Suspense } from "react";
import SubApp from "./subApp";
import { Provider } from "react-redux";
import { persistor, store } from "../states/store";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

function App() {
  return (
    <Suspense fallback={<RenderLoader />}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router history={history}>
            <SubApp />
          </Router>
        </PersistGate>
      </Provider>
    </Suspense>
  );
}

export default App;

const RenderLoader = () => (
  <div
    style={{
      width: "100%",
      position: "relative",
      height: "calc(100vh)",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        fontSize: "102px",
        color: "#fff",
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: "4px",
        maxWidth: "200px",
        margin: "auto",
      }}
    >
      bitwin
    </div>
  </div>
);
