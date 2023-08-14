import React from "react";
import styled, { css, keyframes } from "styled-components";
import { appColor } from "../../../configs/settings";

export const TurnDiceFace = ({ number }) => {
  switch (number) {
    case 1:
      return <OnePoint />;
    case 2:
      return <TwoPoint />;
    case 3:
      return <ThreePoint />;
    case 4:
      return <FourPoint />;
    case 5:
      return <FivePoint />;
    case 6:
      return <SixPoint />;

    default:
      break;
  }
};

const SixPoint = () => {
  return (
    <FaceWrapp>
      <div className="flex-child">
        <div className="child">
          <DotStyle />
          <DotStyle />
          <DotStyle />
        </div>
        <div className="child">
          <DotStyle />
          <DotStyle />
          <DotStyle />
        </div>
      </div>
    </FaceWrapp>
  );
};
const FivePoint = () => {
  return (
    <FaceWrapp>
      <div className="flex-child">
        <div className="child">
          <DotStyle />
          <DotStyle />
        </div>
        <div className="child five">
          <DotStyle />
        </div>
        <div className="child">
          <DotStyle />
          <DotStyle />
        </div>
      </div>
    </FaceWrapp>
  );
};
const FourPoint = () => {
  return (
    <FaceWrapp>
      <div className="flex-child">
        <div className="child">
          <DotStyle />
          <DotStyle />
        </div>

        <div className="child">
          <DotStyle />
          <DotStyle />
        </div>
      </div>
    </FaceWrapp>
  );
};
const ThreePoint = () => {
  return (
    <FaceWrapp>
      <div className="flex-child">
        <div className="child end">
          <DotStyle />
        </div>
        <div className="child center">
          <DotStyle />
        </div>
        <div className="child start">
          <DotStyle />
        </div>
      </div>
    </FaceWrapp>
  );
};
const OnePoint = () => {
  return (
    <FaceWrapp>
      <div className="flex-child" style={{ justifyContent: "center" }}>
        <div className="center">
          <DotStyle />
        </div>
      </div>
    </FaceWrapp>
  );
};
const TwoPoint = () => {
  return (
    <FaceWrapp>
      <div className="flex-child">
        <div className="child start">
          <DotStyle />
        </div>
        <div className="child end">
          <DotStyle />
        </div>
      </div>
    </FaceWrapp>
  );
};

const FaceWrapp = styled.div`
  position: relative;
  transition: all.3s ease-in-out;
  width: 25px;
  overflow: hidden;
  .flex-child {
    display: flex;
    justify-content: space-between;
    background-color: ${appColor.textPrimaryColorGreen};
    width: 25px;
    height: 25px;
    padding: 5px;
    border-radius: 5px;
    position: relative;
    animation: ${() =>
      css`
        ${animatebott} .5s
      `};
    animation-fill-mode: forwards;
    .child {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .five,
    .center {
      align-self: center;
    }
    .end {
      align-self: flex-end;
    }
    .start {
      align-self: flex-start;
    }
  }
`;

const animatebott = keyframes`
  from {
      left: -50px;
      opacity: 0;
      transform: rotate(0deg);
    }
  to {
      left: 0;
      opacity: 1;
      transform: rotate(360deg);
    }
  `;

const DotStyle = styled.div`
  align-self: center;
  background-color: white;
  border-radius: 50%;
  height: 3px;
  justify-self: center;
  width: 3px;
`;
