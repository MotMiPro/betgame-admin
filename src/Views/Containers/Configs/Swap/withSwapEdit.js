import { useForm } from "antd/lib/form/Form";
import React, { useEffect } from "react";
import {
  ButtonWrapper,
  FormItemWrapper,
  FormWrapper,
  InputNumberWrapper,
  InputWrapper,
  SwitchWrapper,
} from "../../../Presentations/UIs/UiModifies";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export default function WithSwapEditable(props) {
  const { data, setModalState, handleConfirm } = props;
  const [form] = useForm();
  const {
    base,
    quote,
    price,
    minAmount,
    fee,
    isInSystem,
    isActive,
    pair,
    isInversePair,
  } = data;

  useEffect(() => form.resetFields(), [props]);
  return (
    <FormWrapper
      {...layout}
      form={form}
      initialValues={{
        base,
        price,
        minAmount,
        fee,
        isInSystem,
        isActive,
        pair,
        isInversePair,
        quote,
      }}
      onFinish={handleConfirm}
    >
      <div>
        <FormItemWrapper
          name="price"
          label="Price"
          rules={[
            {
              required: true,
              message: "Please input price!",
            },
          ]}
        >
          <InputNumberWrapper
            style={{ width: "100%" }}
            // placeholder="Input Price here"
          />
        </FormItemWrapper>
        <FormItemWrapper
          name="quote"
          label="Quote"
          rules={[
            {
              required: true,
              message: "Please input quote!",
            },
          ]}
        >
          <InputWrapper />
        </FormItemWrapper>
        <FormItemWrapper
          name="base"
          label="Base"
          rules={[
            {
              required: true,
              message: "Please input base!",
            },
          ]}
        >
          <InputWrapper />
        </FormItemWrapper>
        <FormItemWrapper
          name="minAmount"
          label="Min Amount"
          rules={[
            {
              required: true,
              message: "Please input minimum amount!",
            },
          ]}
        >
          <InputNumberWrapper style={{ width: "100%" }} />
        </FormItemWrapper>
        <FormItemWrapper
          name="fee"
          label="Fee"
          rules={[
            {
              required: true,
              message: "Please input fee!",
            },
          ]}
        >
          <InputNumberWrapper style={{ width: "100%" }} />
        </FormItemWrapper>
        <FormItemWrapper name="pair" label="Pair">
          <InputWrapper />
        </FormItemWrapper>

        <FormItemWrapper
          name="isInversePair"
          label="InversePair"
          valuePropName="checked"
        >
          <SwitchWrapper defaultChecked={isInversePair} />
        </FormItemWrapper>
        <FormItemWrapper name="isActive" label="Active" valuePropName="checked">
          <SwitchWrapper defaultChecked={isActive} />
        </FormItemWrapper>
        <FormItemWrapper
          name="isInSystem"
          label="InSystem"
          valuePropName="checked"
        >
          <SwitchWrapper defaultChecked={isInSystem} />
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
