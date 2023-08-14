import { useForm } from "antd/lib/form/Form";
import moment from "moment";
import React, { useState } from "react";
import { appColor } from "../../../../configs/settings";
import { dateFormat } from "../../../../ultils/helpers/parseTimer";
import {
  FormItemWrapper,
  FormWrapper,
  InputWrapper,
  SelectWrapper,
  ButtonWrapper,
  RangePickerWrapper,
} from "../../../Presentations/UIs/UiModifies";

export const WithEditable = (props) => {
  const [form] = useForm();
  const [checkIsExistValue, setCheckIsExistValue] = useState(null);
  const { handleSearch, loading, handleClearFeilds, currencies, handleExport } =
    props;

  const handleChange = (e) => {
    setCheckIsExistValue(e);
  };

  return (
    <FormWrapper
      onFinish={handleSearch}
      layout="vertical"
      form={form}
      initialValues={{
        createdAt: [
          moment(
            `${moment().subtract(0, "days").format("YYYY MM DD")}`,
            dateFormat
          ),
          moment(
            `${moment().subtract(0, "days").format("YYYY MM DD")}`,
            dateFormat
          ),
        ],
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: 15,
        }}
      >
        <div>
          <FormItemWrapper
            style={{ ...styledExtend, width: "100%" }}
            name="createdAt"
            label="Date"
          >
            <RangePickerWrapper format={dateFormat} onChange={handleChange} />
          </FormItemWrapper>
        </div>
        <div>
          <FormItemWrapper
            style={{ ...styledExtend }}
            label="Email"
            name="email"
          >
            <InputWrapper onChange={handleChange} placeholder="Type here" />
          </FormItemWrapper>
        </div>
        <div>
          <FormItemWrapper
            style={{ ...styledExtend }}
            label="Address"
            name="address"
          >
            <InputWrapper onChange={handleChange} placeholder="Type here" />
          </FormItemWrapper>
        </div>
        <div>
          <FormItemWrapper
            style={{ ...styledExtend }}
            label="Transaction hash"
            name="transactionHash"
          >
            <InputWrapper onChange={handleChange} placeholder="Type here" />
          </FormItemWrapper>
        </div>
        <div>
          <FormItemWrapper style={{ ...styledExtend }} label="Type" name="type">
            <SelectWrapper
              onChange={handleChange}
              allowClear
              placeholder="Select an option"
            >
              {["internal", "external"].map((option, idx) => (
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
        <div>
          <FormItemWrapper
            style={{ ...styledExtend }}
            label="Status"
            name="status"
          >
            <SelectWrapper
              onChange={handleChange}
              allowClear
              placeholder="Select an option"
            >
              {["success"].map((option, idx) => (
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
        <div>
          <FormItemWrapper
            style={{ ...styledExtend }}
            label="Coin"
            name="currency"
          >
            <SelectWrapper
              onChange={handleChange}
              allowClear
              placeholder="Select an option"
            >
              {currencies?.length &&
                currencies.map((option, idx) => (
                  <SelectWrapper.Option key={idx} value={option.value}>
                    <span
                      style={{
                        textTransform: "capitalize",
                      }}
                    >
                      {option.label}
                    </span>
                  </SelectWrapper.Option>
                ))}
            </SelectWrapper>
          </FormItemWrapper>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            alignItems: "flex-end",
            gap: 15,
          }}
        >
          <FormItemWrapper style={{ ...styledExtend }}>
            <ButtonWrapper
              disabled={loading}
              style={{
                width: 125,
                borderRadius: 5,
                backgroundColor: appColor.textPrimaryColorGreen,
                color: appColor.white,
                border: `1px solid ${appColor.textPrimaryColorGreen}`,
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
                color: appColor.textPrimaryColorGreen,
                border: `1px solid ${appColor.textPrimaryColorGreen}`,
              }}
              onClick={() => {
                form.resetFields();
                handleClearFeilds();
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
};

const styledExtend = {
  marginBottom: 10,
};
