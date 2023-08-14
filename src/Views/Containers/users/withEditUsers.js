import { useForm } from "antd/lib/form/Form";
import React from "react";
import {
  ButtonWrapper,
  FormItemWrapper,
  FormWrapper,
  InputWrapper,
} from "../../Presentations/UIs/UiModifies";

function WithEditUsers(props) {
  const [form] = useForm();
  const { handleConfirmUpdateUsers, setModalState, data } = props;

  return (
    <FormWrapper
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ email: data?.email, userName: data?.userName }}
      onFinish={handleConfirmUpdateUsers}
    >
      <FormItemWrapper label="Email" name="email">
        <InputWrapper disabled />
      </FormItemWrapper>
      <FormItemWrapper label="Username" name="userName">
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
  );
}

export default WithEditUsers;
