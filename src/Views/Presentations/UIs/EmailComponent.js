import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { appColor, pathName } from "../../../configs/settings";

function EmailComponent(props) {
  const { item, color = appColor.blue2 } = props;
  const history = useHistory();
  return (
    <HoverElement
      color={color}
      colorHover={appColor.violet}
      style={{
        cursor: "pointer",
      }}
      onClick={() => history.push(`${pathName._USER_DETAILS_PATH}${item?.id}`)}
    >
      {item?.email}
    </HoverElement>
  );
}
export default React.memo(EmailComponent);

export const HoverElement = styled.div`
  transition: all 0.3s ease-in-out;
  color: ${(props) => props.color};
  &:hover {
    color: ${(props) =>
      props.colorHover ? props.colorHover : appColor.textPrimaryColorGreen};
  }
`;
