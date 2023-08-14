import { useForm } from "antd/lib/form/Form";
import React, { useState } from "react";
import { appColor } from "../../../../configs/settings";
import {
  ButtonWrapper,
  FormItemWrapper,
  FormWrapper,
  SelectWrapper,
} from "../../../Presentations/UIs/UiModifies";

const daySearchSelect = [
  { label: "Week", value: "week" },
  { label: "Month", value: "month" },
];

export default function WithFilter({
  handleFilter,
  handleFetchApi,
  currencies,
  games,
}) {
  const [form] = useForm();

  const [isCleared, setIsCleared] = useState(null);

  const handleClearFilter = () => {
    let query = {
      days: 15,
      game: "Dice",
      currency: "USDT",
    };
    handleFetchApi(query);
    form.resetFields();
    setIsCleared(null);
  };

  const handleChange = (value) => {
    setIsCleared(value);
  };

  return (
    <FormWrapper form={form} layout="vertical" onFinish={handleFilter}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-end",
          flexWrap: "wrap",
          transition: "all .5s ease",
          position: "relative",
        }}
      >
        <div
          style={{
            transition: "all .5s ease",
            position: "relative",
          }}
        >
          <FormItemWrapper label="Days" name="days">
            <SelectWrapper
              onChange={handleChange}
              allowClear
              placeholder="Select days"
            >
              {daySearchSelect.map((option, idx) => (
                <SelectWrapper.Option key={idx} value={option.value}>
                  <span>{option.label}</span>
                </SelectWrapper.Option>
              ))}
            </SelectWrapper>
          </FormItemWrapper>
        </div>
        <div
          style={{
            padding: "0 15px",
            transition: "all .5s ease",
            position: "relative",
          }}
        >
          <FormItemWrapper label="Game" name="game">
            <SelectWrapper
              onChange={handleChange}
              allowClear
              placeholder="Select a game"
            >
              {games?.length &&
                games.map((option, idx) => (
                  <SelectWrapper.Option key={idx} value={option?.label}>
                    <span>{option?.label}</span>
                  </SelectWrapper.Option>
                ))}
            </SelectWrapper>
          </FormItemWrapper>
        </div>
        <div
          style={{
            transition: "all .5s ease",
            position: "relative",
          }}
        >
          <FormItemWrapper
            label="Coin"
            name="currency"
            rules={[
              {
                required: true,
                message: "Please select a coin",
              },
            ]}
          >
            <SelectWrapper
              onChange={handleChange}
              allowClear
              placeholder="Select a coin"
            >
              {currencies?.length &&
                currencies.map((option, idx) => (
                  <SelectWrapper.Option key={idx} value={option.value}>
                    <span>{option.label}</span>
                  </SelectWrapper.Option>
                ))}
            </SelectWrapper>
          </FormItemWrapper>
        </div>
        <div
          style={{
            marginLeft: 15,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            transition: "all .5s ease",
            position: "relative",
          }}
        >
          <FormItemWrapper>
            <ButtonWrapper
              style={{
                width: 100,
                backgroundColor: appColor.textPrimaryColorGreen,
                color: appColor.white,
                borderRadius: 5,
              }}
              htmlType="submit"
            >
              Filter
            </ButtonWrapper>
          </FormItemWrapper>
          <FormItemWrapper
            style={{
              marginLeft: 15,
            }}
          >
            <ButtonWrapper
              disabled={!isCleared}
              style={{
                width: 100,
                color: appColor.textPrimaryColorGreen,
                borderRadius: 5,
                border: `1px solid ${appColor.textPrimaryColorGreen}`,
              }}
              onClick={handleClearFilter}
            >
              Clear
            </ButtonWrapper>
          </FormItemWrapper>
        </div>
      </div>
    </FormWrapper>
  );
}
