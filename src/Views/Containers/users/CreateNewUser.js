import React from "react";
import {
  ButtonWrapper,
  FormItemWrapper,
  FormWrapper,
  InputWrapper,
} from "../../Presentations/UIs/UiModifies";
import { useForm } from "antd/lib/form/Form";

function CreateNewUser(props) {
  const { handleConFirm, setModalState } = props;
  const [form] = useForm();

  return (
    <div>
      <FormWrapper
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={handleConFirm}
      >
        <FormItemWrapper
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <InputWrapper />
        </FormItemWrapper>
        <FormItemWrapper
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <InputWrapper />
        </FormItemWrapper>

        <FormItemWrapper
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <InputWrapper.Password />
        </FormItemWrapper>
        <FormItemWrapper label="Invited code" name="referralId">
          <InputWrapper />
        </FormItemWrapper>

        <FormItemWrapper wrapperCol={{ offset: 8, span: 16 }}>
          <ButtonWrapper
            onClick={() => {
              setModalState();
              form.resetFields();
            }}
            style={{
              width: "100%",
            }}
          >
            Cancel
          </ButtonWrapper>
        </FormItemWrapper>
        <FormItemWrapper wrapperCol={{ offset: 8, span: 16 }}>
          <ButtonWrapper
            style={{
              width: "100%",
            }}
            type="primary"
            htmlType="submit"
          >
            Submit
          </ButtonWrapper>
        </FormItemWrapper>
      </FormWrapper>
    </div>
  );
}

export default CreateNewUser;
