import React from "react";
import { appColor } from "../../../configs/settings";
import { parseTimer } from "../../../ultils/helpers/parseTimer";

export default function WithUserInfos(props) {
  const { dataView } = props;
  const { role, emailVerified, state, gaEnabled, userName, email, createdAt } =
    dataView;
  return (
    <div
      style={{
        padding: "0 10px 10px 10px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <div
          style={{
            padding: 5,
          }}
        >
          <span
            style={{
              width: 55,
              height: 55,
              overflow: "hidden",
              borderRadius: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "25px",
              border: `5px solid ${appColor.textPrimaryColorGreen} `,
              textTransform: "uppercase",
              color: appColor.textPrimaryColorGreen,
              fontWeight: 700,
            }}
          >
            <span>{userName.charAt(0)}</span>
          </span>
        </div>
        <div
          style={{
            padding: 5,
          }}
        >
          <div
            style={{
              display: "flex",
              flexFlow: "wrap column",
            }}
          >
            <span style={{ padding: 5 }}>
              <span style={titleStyle}>Role:</span> <span>{role}</span>
            </span>
            <span style={{ padding: 5 }}>
              <span style={titleStyle}> Status:</span>
              <span
                style={{
                  color:
                    state === "active"
                      ? appColor.textPrimaryColorGreen
                      : appColor.orange,
                }}
              >
                {state}
              </span>
            </span>
            <span style={{ padding: 5 }}>
              <span style={titleStyle}>Email:</span>
              <span>{email}</span>
            </span>
          </div>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              flexFlow: "wrap column",
            }}
          >
            <span style={{ padding: 5 }}>
              <span style={titleStyle}>Verify:</span>
              <span>
                <i
                  style={{
                    color: emailVerified
                      ? appColor.textPrimaryColorGreen
                      : appColor.gray,
                  }}
                  className="fas fa-check-circle"
                />
              </span>
            </span>
            <span style={{ padding: 5 }}>
              <span style={titleStyle}>GG authenticator:</span>
              <span>
                <i
                  style={{
                    color: gaEnabled
                      ? appColor.textPrimaryColorGreen
                      : appColor.textSecondaryColorGray,
                  }}
                  className="fas fa-check-circle"
                />
              </span>
            </span>
            <span style={{ padding: 5 }}>
              <span style={titleStyle}>Onboard:</span>{" "}
              <span>{parseTimer(createdAt)}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const titleStyle = {
  fontWeight: "bold",
  marginRight: 10,
};
