import { useForm } from "antd/lib/form/Form";
import React, { useEffect } from "react";
import {
  ButtonWrapper,
  FormItemWrapper,
  FormWrapper,
  InputNumberWrapper,
  InputWrapper,
  SelectWrapper,
} from "../../../Presentations/UIs/UiModifies";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export default function WithEditable(props) {
  const { data, setModalState, handleConfirm } = props;
  const [form] = useForm();
  const { game, name, winRate, earnRate, maxMultiplier, isRun } = data;

  useEffect(() => form.resetFields(), [props]);

  return (
    <FormWrapper
      {...layout}
      form={form}
      initialValues={{
        game,
        name,
        winRate,
        earnRate,
        isRun,
        maxMultiplier,
      }}
      onFinish={handleConfirm}
    >
      <div>
        <FormItemWrapper name="game" label="Game">
          <InputNumberWrapper
            disabled={true}
            style={{
              width: "100%",
            }}
          />
        </FormItemWrapper>
        <FormItemWrapper name="name" label="Name">
          <InputWrapper disabled={true} />
        </FormItemWrapper>
        <FormItemWrapper name="winRate" label="Win Rate">
          <InputNumberWrapper
            style={{
              width: "100%",
            }}
          />
        </FormItemWrapper>
        <FormItemWrapper name="earnRate" label="Earn Rate">
          <InputNumberWrapper
            disabled={true}
            style={{
              width: "100%",
            }}
          />
        </FormItemWrapper>
        {name.toUpperCase() === "MOON" && (
          <FormItemWrapper name="maxMultiplier" label="Max Multi">
            <InputNumberWrapper
              style={{
                width: "100%",
              }}
            />
          </FormItemWrapper>
        )}
        <FormItemWrapper name="isRun" label="Run/Stop">
          <SelectWrapper>
            {[
              { label: "Running", value: true },
              { label: "Stopped", value: false },
            ].map((item, idx) => (
              <SelectWrapper.Option key={idx} value={item.value}>
                {item.label}
              </SelectWrapper.Option>
            ))}
          </SelectWrapper>
        </FormItemWrapper>
      </div>
      <div>
        <FormItemWrapper wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <ButtonWrapper
            type="reverse-primary"
            onClick={() => {
              setModalState();
              form.resetFields();
            }}
          >
            Cancel
          </ButtonWrapper>
        </FormItemWrapper>
        <FormItemWrapper wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <ButtonWrapper type="primary" htmlType="submit">
            Submit
          </ButtonWrapper>
        </FormItemWrapper>
      </div>
    </FormWrapper>
  );
}
