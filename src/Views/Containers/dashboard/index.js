import React, { Fragment } from "react";
import { Aview, AWrapper } from "../../Presentations/UIs";
import OverViewFund from "../Fund/OverViewFund";
import HeadingDashboard from "./HeadingTop";
import StatisticOverView from "./HeadingTop/Statistic";

function Dashboard() {
  return (
    <Fragment>
      <Aview title="Daily statistic">
        <StatisticOverView />
      </Aview>
      <HeadingDashboard />
      <AWrapper
        style={{
          marginTop: 15,
        }}
      >
        <Aview>
          <OverViewFund />
        </Aview>
      </AWrapper>
    </Fragment>
  );
}

export default Dashboard;
