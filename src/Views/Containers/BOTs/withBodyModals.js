import { useForm } from "antd/lib/form/Form";
import React, { useEffect } from "react";
import {
  ButtonWrapper,
  FormItemWrapper,
  FormWrapper,
  InputNumberWrapper,
  InputWrapper,
  SwitchWrapper,
} from "../../Presentations/UIs/UiModifies";
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export default function WithBodyModals(props) {
  const { data, handleConfirm, setModalState } = props;
  const [form] = useForm();
  const {
    betFromAmount,
    betToAmount,
    cashOutFromAmount,
    cashOutToAmount,
    isActive,
    isRandomUserName,
    userName,
  } = !!data && data;

  useEffect(() => form.resetFields(), [props]);

  return (
    <FormWrapper
      {...layout}
      form={form}
      initialValues={{
        betFromAmount,
        betToAmount,
        cashOutFromAmount,
        cashOutToAmount,
        isActive,
        isRandomUserName,
        userName,
      }}
      onFinish={handleConfirm}
    >
      <div>
        <FormItemWrapper
          name="userName"
          label="UserName"
          rules={[
            {
              required: true,
              message: "Please input user name!",
            },
          ]}
        >
          <InputWrapper />
        </FormItemWrapper>
        <FormItemWrapper
          name="betFromAmount"
          label="Bet From"
          rules={[
            {
              required: true,
              message: "Please input Bet From!",
            },
          ]}
        >
          <InputNumberWrapper style={{ width: "100%" }} />
        </FormItemWrapper>
        <FormItemWrapper
          name="betToAmount"
          label="Bet To"
          rules={[
            {
              required: true,
              message: "Please input Bet To!",
            },
          ]}
        >
          <InputNumberWrapper style={{ width: "100%" }} />
        </FormItemWrapper>
        <FormItemWrapper
          name="cashOutFromAmount"
          label="Multiplier From"
          rules={[
            {
              required: true,
              message: "Please input Multiplier From!",
            },
          ]}
        >
          <InputNumberWrapper style={{ width: "100%" }} />
        </FormItemWrapper>
        <FormItemWrapper
          name="cashOutToAmount"
          label="Multiplier To"
          rules={[
            {
              required: true,
              message: "Please input Multiplier To!",
            },
          ]}
        >
          <InputNumberWrapper style={{ width: "100%" }} />
        </FormItemWrapper>

        <FormItemWrapper name="isActive" label="Active" valuePropName="checked">
          <SwitchWrapper defaultChecked={isActive} />
        </FormItemWrapper>
        <FormItemWrapper
          name="isRandomUserName"
          label="Random Name"
          valuePropName="checked"
        >
          <SwitchWrapper defaultChecked={isRandomUserName} />
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
