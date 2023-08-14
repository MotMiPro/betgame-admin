import {
  Input,
  Select,
  Form,
  Button,
  DatePicker,
  Col,
  Row,
  Card,
  InputNumber,
  Switch,
} from "antd";
import styled, { css } from "styled-components";
import { appColor } from "../../../configs/settings";

export const SelectWrapper = styled(Select)`
  .ant-select-selector {
    border-radius: 5px !important;
  }
`;
export const InputWrapper = styled(Input)`
  border-radius: 5px;
`;
export const InputNumberWrapper = styled(InputNumber)`
  border-radius: 5px;
`;
export const RangePickerWrapper = styled(DatePicker.RangePicker)`
  border-radius: 5px;
`;
export const FormWrapper = styled(Form)``;
export const FormItemWrapper = styled(Form.Item)``;
export const FormListWrapper = styled(Form.List)``;
export const ButtonWrapper = styled(Button)`
  border-radius: 5px;
  min-width: 150px;
  width: 100%;
  height: 35px;
  ${(props) => {
    let cBorder = "none",
      cBackgroundColor = appColor.lightgray,
      cColor = appColor.white;
    if (!props.disabled) {
      switch (props.type) {
        case "primary":
          cBorder = `none`;
          cBackgroundColor = `${appColor.textPrimaryColorGreen}`;
          cColor = appColor.white;
          break;
        case "reverse-primary":
          cBorder = `1px solid ${appColor.textPrimaryColorGreen}`;
          cBackgroundColor = `transparent`;
          cColor = appColor.textPrimaryColorGreen;
          break;
        case "sos":
          if (props.ghost) {
            cBorder = `solid 1px ${appColor.red}`;
            cBackgroundColor = `${appColor.white}`;
            cColor = appColor.red;
          } else {
            cBackgroundColor = appColor.red;
          }
          break;
        case "secondary":
          if (props.ghost) {
            cBorder = `solid 1px ${appColor.blue}`;
            cBackgroundColor = `${appColor.white}`;
            cColor = appColor.blue;
          } else {
            cBackgroundColor = appColor.blue;
          }
          break;
        case "thirdary":
          if (props.ghost) {
            cBorder = `solid 1px ${appColor.blue2}`;
            cBackgroundColor = `${appColor.white}`;
            cColor = appColor.blue2;
          } else {
            cBackgroundColor = appColor.blue2;
          }
          break;
        case "dashed":
          cBorder = `1px dotted ${appColor.textPrimaryColorGreen}`;
          cBackgroundColor = `transparent`;
          cColor = appColor.textPrimaryColorGreen;
          break;

        default:
          cBorder = `1px solid ${appColor.textPrimaryColorGreen}`;
          cBackgroundColor = `transparent`;
          cColor = appColor.textPrimaryColorGreen;
          break;
      }
    }
    return css`
      && {
        background-color: ${cBackgroundColor};
        color: ${cColor};
        border: ${cBorder};
        &:hover {
          border: ${cBorder};
          background-color: ${cBackgroundColor};
          color: ${cColor};
        }
      }
    `;
  }};
`;
export const ColWrapper = styled(Col)``;
export const RowWrapper = styled(Row)``;
export const CardWrapper = styled(Card)``;
export const SwitchWrapper = styled(Switch)``;
export const TitleColumn = ({ title, isSort = true }) => (
  <span
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      cursor: "pointer",
    }}
  >
    <span style={{ textTransform: "capitalize" }}>{title}</span>{" "}
    {isSort && <i className="fas fa-sort" />}
  </span>
);

export const SelectComponent = (props) => {
  const { handleChange, list, defaultSelect } = props;
  return (
    <div
      style={{
        width: 200,
      }}
    >
      <SelectWrapper
        defaultValue={defaultSelect}
        style={{
          width: "100%",
        }}
        onChange={handleChange}
      >
        {list?.length &&
          list.map(({ label, value }, idx) => (
            <SelectWrapper.Option key={idx} value={value}>
              <span
                style={{
                  textTransform: "capitalize",
                }}
              >
                {label}
              </span>
            </SelectWrapper.Option>
          ))}
      </SelectWrapper>
    </div>
  );
};
