import React from "react";
import { iconCollection } from "../../../configs/configs";
import { ColWrapper, RowWrapper } from "./UiModifies";

function NumbersIcons({ item }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
      }}
    >
      <RowWrapper>
        {!!item &&
          item.flat().map((item, index) => {
            return (
              <ColWrapper span={8} key={index}>
                <img
                  style={{ width: 20, height: "auto", padding: 3 }}
                  src={iconCollection[item]}
                  alt={`img_${index}`}
                />
              </ColWrapper>
            );
          })}
      </RowWrapper>
    </div>
  );
}

export default NumbersIcons;
