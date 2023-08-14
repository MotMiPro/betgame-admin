import { Button } from "antd";
import React from "react";
import { useRef } from "react";
import { appColor } from "../../../configs/settings";

function Aview(props) {
  const { style, title, extendTask = null, viewSum = null } = props;

  const aview = useRef(null);
  return (
    <section
      style={{
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        borderRadius: 5,
        ...style,
      }}
      ref={aview}
    >
      <div
        style={
          extendTask && title
            ? {
                display: "flex ",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 10px",
              }
            : viewSum
            ? { display: "flex ", alignItems: "center", padding: "0 10px" }
            : {}
        }
      >
        {title && (
          <div
            style={{
              padding: 10,
              fontSize: 28,
              cursor: "pointer",
              textTransform: "capitalize",
            }}
          >
            <h1
              style={{
                fontWeight: 700,
                letterSpacing: 2,
                marginBottom: 0,
              }}
            >
              {title}
            </h1>
          </div>
        )}
        {viewSum}
        {extendTask && (
          <div>
            <Button
              onClick={extendTask}
              style={{
                width: 125,
                height: 35,
                borderRadius: 5,
                color: appColor.white,
                textTransform: "uppercase",
                fontWeight: 600,
                backgroundColor: appColor.textPrimaryColorGreen,
              }}
            >
              create new
            </Button>
          </div>
        )}
      </div>
      {props.children}
    </section>
  );
}

export default Aview;
