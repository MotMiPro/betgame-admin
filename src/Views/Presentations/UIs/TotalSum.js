import React from "react";
import styled from "styled-components";
import { appColor } from "../../../configs/settings";

function TotalSum({ title, totalSum }) {
  // const totalSum = [
  //   { amount: 3077, currency: "USDT" },
  //   { amount: 43, currency: "USDT" },
  //   { amount: 2423432, currency: "USDT" },
  // ];
  return (
    <Wrapper>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontWeight: 500,
          backgroundColor: appColor.orange,
          color: appColor.white,
          borderRadius: 5,
          padding: "2px 5px",
          fontSize: 14,
        }}
      >
        <div>{`${title} : `}</div>
        {!!totalSum && totalSum.length > 0 ? (
          totalSum.map(({ amount, currency }, idx) => (
            <ItemWrapp key={idx}>
              <span>{`${amount.toFixed(2)} ${currency}`}</span>
            </ItemWrapp>
          ))
        ) : (
          <ItemWrapp>0</ItemWrapp>
        )}
      </div>
    </Wrapper>
  );
}

export default React.memo(TotalSum);

const Wrapper = styled.div`
  position: relative;
  padding: 5px 10px;
  font-size: 20px;
  &::before {
    content: "";
    position: absolute;
    height: 35%;
    width: 2px;
    inset: 0;
    margin: auto 0;
    background-color: ${appColor.textPrimaryColorGreen};
  }
`;

const ItemWrapp = styled.div`
  position: relative;
  padding: 2px 10px;
  &:not(&:last-child) {
    &::after {
      content: "";
      position: absolute;
      height: 35%;
      width: 2px;
      margin: auto 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: ${appColor.lightgray};
    }
  }
`;
