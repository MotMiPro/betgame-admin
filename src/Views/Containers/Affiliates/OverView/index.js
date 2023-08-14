import React from "react";
import { connect } from "react-redux";
import { Aview } from "../../../Presentations/UIs";
import TotalMember from "./TotalMembers";
import TotalUsersCommission from "./TotalUserCommissions";

function AffiliatePages(props) {
  const { userLoginInfos } = props;
  const { authHeader } = userLoginInfos;

  return (
    <Aview title="affiliate overview">
      <TotalUsersCommission auth={authHeader} />
      <TotalMember auth={authHeader} />
    </Aview>
  );
}

const mapStateToProps = (state) => ({
  userLoginInfos: state.authentication,
});

export default connect(mapStateToProps, null)(React.memo(AffiliatePages));
