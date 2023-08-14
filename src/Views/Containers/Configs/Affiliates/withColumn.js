import { Space } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect } from "react";
import { appColor } from "../../../../configs/settings";
import {
  ButtonWrapper,
  FormItemWrapper,
  FormListWrapper,
  FormWrapper,
  InputNumberWrapper,
  InputWrapper,
} from "../../../Presentations/UIs/UiModifies";

export function CreateNewConfig(props) {
  const { handleConFirm, setModalState } = props;
  const [form] = useForm();

  return (
    <div>
      <FormWrapper
        autoComplete="off"
        form={form}
        initialValues={{ remember: true }}
        onFinish={handleConFirm}
      >
        <div>
          <FormListWrapper name="commision">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space
                    key={key}
                    style={{
                      display: "flex",
                      marginBottom: 8,
                      justifyContent: "center",
                    }}
                    align="baseline"
                  >
                    <FormItemWrapper
                      {...restField}
                      name={[name, "level"]}
                      fieldKey={[fieldKey, "level"]}
                      rules={[{ required: true, message: "Missing level" }]}
                    >
                      <InputNumberWrapper
                        style={{
                          width: "100%",
                        }}
                        placeholder="Level"
                      />
                    </FormItemWrapper>
                    <FormItemWrapper
                      {...restField}
                      name={[name, "commission"]}
                      fieldKey={[fieldKey, "commission"]}
                      rules={[
                        { required: true, message: "Missing commission" },
                      ]}
                    >
                      <InputNumberWrapper
                        style={{
                          width: "100%",
                        }}
                        placeholder="commission"
                      />
                    </FormItemWrapper>
                    <div
                      style={{
                        marginLeft: 10,
                      }}
                      onClick={() => remove(name)}
                    >
                      <i className="fas fa-minus" />
                    </div>
                  </Space>
                ))}
                <FormItemWrapper>
                  <ButtonWrapper
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<i className="fas fa-plus" />}
                  >
                    <span
                      style={{
                        marginLeft: 15,
                      }}
                    >
                      Add field
                    </span>
                  </ButtonWrapper>
                </FormItemWrapper>
              </>
            )}
          </FormListWrapper>
        </div>

        <FormItemWrapper>
          <ButtonWrapper
            onClick={() => {
              setModalState();
              form.resetFields();
            }}
            type="reverse-primary"
          >
            Cancel
          </ButtonWrapper>
        </FormItemWrapper>
        <FormItemWrapper>
          <ButtonWrapper type="primary" htmlType="submit">
            Submit
          </ButtonWrapper>
        </FormItemWrapper>
      </FormWrapper>
    </div>
  );
}

export function WithEditRewardConfig(props) {
  const [form] = useForm();
  const { handleConfirm, setModalState, data } = props;

  useEffect(() => form.resetFields(), [props]);

  return (
    <FormWrapper
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{
        level: data?.level,
        commission: data?.commission,
      }}
      onFinish={handleConfirm}
      name="form-name"
    >
      <FormItemWrapper label="Level" name="level">
        <InputWrapper />
      </FormItemWrapper>
      <FormItemWrapper label="Commission" name="commission">
        <InputWrapper />
      </FormItemWrapper>

      <FormItemWrapper wrapperCol={{ offset: 8, span: 16 }}>
        <ButtonWrapper
          onClick={() => {
            setModalState((state) => ({
              ...state,
              isVisible: false,
              content: null,
            }));
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

export const withConfigColumn = ({ editTable }) => {
  return [
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
      responsive: ["xs", "sm"],
    },
    {
      title: "Commission",
      dataIndex: "commission",
      key: "commission",
      responsive: ["xs", "sm"],
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      responsive: ["xs", "sm"],
      render: (item) => (
        <div>
          <span
            style={{
              cursor: "pointer",
              backgroundColor: appColor.textPrimaryColorGreen,
              padding: "4px 12px",
              color: appColor.white,
              borderRadius: 5,
            }}
            onClick={() => editTable(item)}
          >
            <i className="far fa-edit" />
          </span>
        </div>
      ),
    },
  ];
};
