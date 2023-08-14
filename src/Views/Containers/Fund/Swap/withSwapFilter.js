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

function WithSwapFilter(props) {
  const [form] = useForm();
  const [checkIsExistValue, setCheckIsExistValue] = useState(null);
  const { handleSearch, loading, handleClearFields, currencies } = props;

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
        }}
      >
        <div>
          <FormItemWrapper
            style={{ ...styledExtend, marginLeft: 10, width: "100%" }}
            name="createdAt"
            label="Date"
          >
            <RangePickerWrapper format={dateFormat} onChange={handleChange} />
          </FormItemWrapper>
        </div>
        <div>
          <FormItemWrapper
            style={{ ...styledExtend, marginLeft: 10 }}
            label="Email"
            name="email"
          >
            <InputWrapper onChange={handleChange} placeholder="Type here" />
          </FormItemWrapper>
        </div>
        <div>
          <FormItemWrapper
            style={{ ...styledExtend, marginLeft: 10 }}
            label="From coin"
            name="from"
          >
            <SelectWrapper
              onChange={handleChange}
              allowClear
              placeholder="Select an option"
              style={{ width: 175 }}
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
        <div>
          <FormItemWrapper
            style={{ ...styledExtend, marginLeft: 10 }}
            label="To coin"
            name="to"
          >
            <SelectWrapper
              onChange={handleChange}
              allowClear
              placeholder="Select an option"
              style={{ width: 175 }}
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
            marginLeft: 10,
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
                marginLeft: 10,
                color: appColor.textPrimaryColorGreen,
                border: `1px solid ${appColor.textPrimaryColorGreen}`,
              }}
              onClick={() => {
                form.resetFields();
                handleClearFields();
                setCheckIsExistValue(null);
              }}
            >
              Clear
            </ButtonWrapper>
          </FormItemWrapper>
        </div>
      </div>
    </FormWrapper>
  );
}

export default React.memo(WithSwapFilter);

const styledExtend = {
  marginBottom: 10,
};
