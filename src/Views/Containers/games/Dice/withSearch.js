import { useForm } from "antd/lib/form/Form";
// import moment from "moment";
import React, { useState } from "react";
import { appColor } from "../../../../configs/settings";
import { dateFormat } from "../../../../ultils/helpers/parseTimer";
import {
  ButtonWrapper,
  FormItemWrapper,
  FormWrapper,
  InputWrapper,
  RangePickerWrapper,
} from "../../../Presentations/UIs/UiModifies";

export const WithSearch = (props) => {
  const [form] = useForm();
  const [checkIsExistValue, setCheckIsExistValue] = useState(null);
  const { handleSearch, loading, handleClearFeilds } = props;
  //   const currencies = useMemo(() => {
  //     const list =
  //       currencyList?.length &&
  //       currencyList.map((item) => ({
  //         label: item.currency,
  //         value: item.currency,
  //       }));
  //     return list;
  //   }, [currencyList]);

  const handleChange = (e) => {
    setCheckIsExistValue(e);
  };

  return (
    <FormWrapper onFinish={handleSearch} layout="vertical" form={form}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        <div>
          <FormItemWrapper
            style={{ ...styledExtend, width: "100%" }}
            name="createdAt"
            label="Date"
          >
            <RangePickerWrapper
              allowClear={false}
              format={dateFormat}
              onChange={handleChange}
            />
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
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            alignItems: "flex-end",
            gap: 10,
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
        </div>
      </div>
    </FormWrapper>
  );
};

const styledExtend = {
  marginBottom: 10,
};
