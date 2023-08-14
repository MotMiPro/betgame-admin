import { Form } from "antd";
import React, { useState } from "react";
import { appColor } from "../../../configs/settings";
import {
  ButtonWrapper,
  FormItemWrapper,
  FormWrapper,
  InputWrapper,
  RangePickerWrapper,
  SelectWrapper,
} from "../../Presentations/UIs/UiModifies";

function WithEditable(props) {
  const [form] = Form.useForm();
  const [checkIsExistValue, setCheckIsExistValue] = useState(null);
  const { handleSearch, loading, handleClearSearch, handleExport } = props;

  const handleChange = (e) => {
    setCheckIsExistValue(e);
  };

  return (
    <FormWrapper form={form} onFinish={handleSearch} layout="horizontal">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-end",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              marginRight: 15,
            }}
          >
            <FormItemWrapper
              style={{ ...styledExtend }}
              name="email"
              label="Email"
            >
              <InputWrapper onChange={handleChange} />
            </FormItemWrapper>
          </div>
          <div>
            <FormItemWrapper
              style={{ ...styledExtend }}
              name="createdAt"
              label="Date"
            >
              <RangePickerWrapper onChange={handleChange} />
            </FormItemWrapper>
          </div>
          <div>
            <FormItemWrapper
              style={{ ...styledExtend, marginLeft: 10 }}
              label="Status"
              name="state"
            >
              <SelectWrapper
                onChange={handleChange}
                allowClear
                placeholder="Select an option"
              >
                {status.map((option, idx) => (
                  <SelectWrapper.Option key={idx} value={option}>
                    <span
                      style={{
                        textTransform: "capitalize",
                      }}
                    >
                      {option}
                    </span>
                  </SelectWrapper.Option>
                ))}
              </SelectWrapper>
            </FormItemWrapper>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginLeft: 15,
          }}
        >
          <FormItemWrapper style={{ ...styledExtend }}>
            <ButtonWrapper
              disabled={loading}
              style={{
                width: 125,
                borderRadius: 5,
                backgroundColor: appColor.textPrimaryColorGreen,
                border: `1px solid ${appColor.textPrimaryColorGreen}`,
                color: appColor.white,
              }}
              htmlType="submit"
            >
              Search
            </ButtonWrapper>
          </FormItemWrapper>
          <FormItemWrapper style={{ ...styledExtend }}>
            <ButtonWrapper
              disabled={!checkIsExistValue}
              style={{
                width: 125,
                borderRadius: 5,
                marginLeft: 15,
                color: appColor.textPrimaryColorGreen,
                border: `1px solid ${appColor.textPrimaryColorGreen}`,
              }}
              onClick={() => {
                handleClearSearch();
                form.resetFields();
                setCheckIsExistValue(null);
              }}
            >
              Clear
            </ButtonWrapper>
          </FormItemWrapper>
          <FormItemWrapper style={{ ...styledExtend }}>
            <ButtonWrapper
              style={{
                width: 100,
                borderRadius: 5,
                marginLeft: 15,
                color: appColor.white,
                backgroundColor: appColor.orange,
                border: `1px solid ${appColor.orange}`,
              }}
              onClick={handleExport}
            >
              Export
            </ButtonWrapper>
          </FormItemWrapper>
        </div>
      </div>
    </FormWrapper>
  );
}

export default WithEditable;

const status = ["active", "inactive", "block"];

const styledExtend = {
  marginBottom: 15,
};
