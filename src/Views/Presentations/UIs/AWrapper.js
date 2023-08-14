import React from "react";
import { useRef } from "react";
import { Color } from "../../../configs/configs";

function AWrapper(props) {
  const { style, label } = props;
  const awrapper = useRef(null);
  return (
    <div ref={awrapper} style={{ backgroundColor: Color.gray, ...style }}>
      {label && (
        <div
          style={{
            padding: 10,
            fontSize: 12,
            cursor: "pointer",
            textTransform: "uppercase",
          }}
        >
          <h1
            style={{
              letterSpacing: 0.5,
              fontWeight: 700,
            }}
          >
            {label}
          </h1>
        </div>
      )}
      {props.children}
    </div>
  );
}

export default AWrapper;
