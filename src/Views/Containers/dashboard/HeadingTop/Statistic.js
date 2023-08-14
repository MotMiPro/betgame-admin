import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  CardWrapper,
  ColWrapper,
  RowWrapper,
} from "../../../Presentations/UIs/UiModifies";
import { connect } from "react-redux";
import { appColor } from "../../../../configs/settings";
import { RootContext } from "../../../../ContextApp";
import { getStatisticOverview } from "../../../../services/middlewares/apiMiddleWare";

function StatisticOverView(props) {
  const { userLoginInfos } = props;
  const { authHeader: auth } = userLoginInfos;
  const [cardList, setCardList] = useState({});
  const { setIsloading } = useContext(RootContext);

  const handleGetOverViewStatistic = useCallback(async (token) => {
    try {
      if (token) {
        setIsloading(true);
        const { data: statistic } = await getStatisticOverview(token);
        if (statistic?.success) {
          const { data } = statistic;
          setCardList(data);
        }
        setIsloading(false);
      }
    } catch (error) {
      console.log({ error });
    }
  }, []);

  useEffect(() => {
    handleGetOverViewStatistic(auth);
  }, []);

  return (
    <div
      style={{
        padding: "10px 15px",
      }}
    >
      {Object.keys(cardList).length > 0 && (
        <RowWrapper gutter={[16, { xs: 8, sm: 16, md: 20, lg: 32 }]}>
          <ColWrapper xs={24} md={6} xl={6}>
            <CardWrapper style={{ ...mutualCard }}>
              <div style={{ ...mutualStyle }}>
                <div
                  style={{
                    fontSize: 32,
                  }}
                >
                  {cardList?.totalUser}
                </div>
                <h2 style={{ ...h2Style }}>total users</h2>
              </div>
            </CardWrapper>
          </ColWrapper>
          <ColWrapper xs={24} md={6} xl={6}>
            <CardWrapper
              style={{ ...mutualCard, backgroundColor: appColor.orange }}
            >
              <div style={{ ...mutualStyle }}>
                <div
                  style={{
                    fontSize: 32,
                  }}
                >
                  {cardList?.totalActive}
                </div>
                <h2 style={{ ...h2Style }}>total Active</h2>
              </div>
            </CardWrapper>
          </ColWrapper>
          <ColWrapper xs={24} md={6} xl={6}>
            <CardWrapper
              style={{ ...mutualCard, backgroundColor: appColor.deepBrow }}
            >
              <div style={{ ...mutualStyle }}>
                <div>
                  <IconStatus
                    result={cardList?.totalUserPlay}
                    title="total users play"
                  />
                </div>
              </div>
            </CardWrapper>
          </ColWrapper>
          <ColWrapper xs={24} md={6} xl={6}>
            <CardWrapper
              style={{
                ...mutualCard,
                backgroundColor: "#34495e",
              }}
            >
              <div style={{ ...mutualStyle }}>
                <div>
                  <IconStatus result={cardList?.totalPlay} title="total play" />
                </div>
                {/* <h2 style={{ ...h2Style }}>total play</h2> */}
              </div>
            </CardWrapper>
          </ColWrapper>
        </RowWrapper>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  userLoginInfos: state.authentication,
});

export default connect(mapStateToProps, null)(React.memo(StatisticOverView));

const h2Style = {
  color: appColor.white,
};

const mutualStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  textTransform: "capitalize",
  textAlign: "center",
};
const mutualCard = {
  padding: 20,
  color: appColor.white,
  backgroundColor: appColor.textPrimaryColorGreen,
  width: "100%",
  borderRadius: 8,
  height: "100%",
};

const IconStatus = ({ result, title }) => {
  const number = useMemo(() => result?.today - result?.yesterday, []);

  const status = number < 0 ? false : true;

  return (
    <Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{ fontSize: 32, marginRight: 10 }}
        >{`${result?.today}`}</div>
        {status ? (
          <i
            style={{
              position: "relative",
              bottom: -7,
              color: appColor.textPrimaryColorGreen,
            }}
            className="fas fa-arrow-up"
          />
        ) : (
          <i
            style={{
              position: "relative",
              bottom: -7,
              color: "#e74c3c",
              transform: "rotate(180deg)",
            }}
            className="fas fa-arrow-up"
          />
        )}
      </div>

      <h2 style={{ ...h2Style, marginBottom: 0 }}>{title}</h2>
      <span
        style={{
          fontSize: 12,
          color: status ? appColor.textPrimaryColorGreen : "#e74c3c",
        }}
      >
        {`${status ? "+" : ""} ${number} from yesterday`}
      </span>
    </Fragment>
  );
};
