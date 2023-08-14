import { useForm } from "antd/lib/form/Form";
import React, { Fragment, useEffect } from "react";
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

export default function WithEditable(props) {
  const { data, setModalState, handleConfirm, isActive = true } = props;
  const [form] = useForm();
  const {
    currency,
    network,
    name,
    feeInternal,
    feeExternal,
    minWithdraw,
    depositEnalbed,
    withdrawEnabled,
    enabled,
  } = data;

  useEffect(() => form.resetFields(), [props]);
  return (
    <FormWrapper
      {...layout}
      form={form}
      initialValues={{
        name,
        feeInternal,
        feeExternal,
        minWithdraw,
        depositEnalbed,
        withdrawEnabled,
        enabled,
        currency,
        network,
      }}
      onFinish={handleConfirm}
    >
      <div>
        <FormItemWrapper
          name="currency"
          label="Currency"
          rules={[
            {
              required: true,
              message: "Please input currency!",
            },
          ]}
        >
          <InputWrapper disabled={isActive} />
        </FormItemWrapper>
        <FormItemWrapper
          name="network"
          label="Network"
          rules={[
            {
              required: true,
              message: "Please input network!",
            },
          ]}
        >
          <InputWrapper disabled={isActive} />
        </FormItemWrapper>
        <FormItemWrapper
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input coin name!",
            },
          ]}
        >
          <InputWrapper />
        </FormItemWrapper>
        <FormItemWrapper
          name="feeInternal"
          label="Fee Internal"
          rules={[
            {
              required: true,
              message: "Please input internal fee!",
            },
          ]}
        >
          <InputNumberWrapper style={{ width: "100%" }} />
        </FormItemWrapper>
        <FormItemWrapper
          name="feeExternal"
          label="Fee External"
          rules={[
            {
              required: true,
              message: "Please input external fee!",
            },
          ]}
        >
          <InputNumberWrapper style={{ width: "100%" }} />
        </FormItemWrapper>
        <FormItemWrapper
          name="minWithdraw"
          label="Min Withdraw"
          rules={[
            {
              required: true,
              message: "Please input minimum withdraw!",
            },
          ]}
        >
          <InputNumberWrapper style={{ width: "100%" }} />
        </FormItemWrapper>
        {isActive && (
          <Fragment>
            <FormItemWrapper
              name="depositEnalbed"
              label="Deposit Enabled"
              valuePropName="checked"
            >
              <SwitchWrapper defaultChecked={depositEnalbed} />
            </FormItemWrapper>
            <FormItemWrapper
              name="withdrawEnabled"
              label="Withdraw Enabled"
              valuePropName="checked"
            >
              <SwitchWrapper defaultChecked={withdrawEnabled} />
            </FormItemWrapper>
            <FormItemWrapper
              name="enabled"
              label="Enabled"
              valuePropName="checked"
            >
              <SwitchWrapper defaultChecked={enabled} />
            </FormItemWrapper>
          </Fragment>
        )}
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
