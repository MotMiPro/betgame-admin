import React, { useState } from "react";
import { connect } from "react-redux";
import { Form, Input, Button } from "antd";
import { bindActionCreators } from "redux";
import { LOGO } from "../../../configs/configs";
import { Aview, AWrapper } from "../../Presentations/UIs";
import * as loginActions from "../../../states/login/actions";
import { userLogin } from "../../../services/middlewares/apiMiddleWare";
import { openNotification } from "../../Presentations/UIs/Notifications";

function Login(props) {
  const { loginAction } = props;
  const { userLoggedIn } = loginAction;
  const [isSubmmited, setIsSubmmited] = useState(false);
  const [isRequired2Fa, setIsRequired2Fa] = useState(false);

  const onLoggedIn = async (values) => {
    try {
      setIsSubmmited(true);
      const { data: userResponse } = await userLogin({
        email: values?.email,
        password: values?.password,
        token2fa: values?.token2fa,
      });
      setIsSubmmited(false);
      if (userResponse?.success) {
        const { accessToken, user } = userResponse?.data;
        const { email, userName } = user;
        const saving = {
          _user: userName,
          _token: accessToken,
          _email: email,
        };

        userLoggedIn(saving);
      }
      if (!userResponse?.success) {
        const code = "USER009";
        if (userResponse?.error?.code === code) {
          setIsRequired2Fa(true);
        } else {
          openNotification({
            title: "Bitwin",
            description: userResponse?.error?.message,
          });
        }
      }
    } catch (error) {
      console.log("err", error);
    }
  };

  return (
    <Aview
      title="admin login"
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        height: "100vh",
        alignItems: "center",
      }}
    >
      <AWrapper style={{ padding: "25px 50px 0 50px", borderRadius: 5 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              maxWidth: 200,
              width: "100%",
              padding: 10,
            }}
          >
            <img
              style={{
                width: "100%",
              }}
              src={LOGO}
              alt="logo"
            />
          </div>
          <div
            style={{
              padding: 10,
            }}
          >
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onLoggedIn}
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              {isRequired2Fa && (
                <Form.Item label="Authen code" name="token2fa">
                  <Input />
                </Form.Item>
              )}

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button disabled={isSubmmited} type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </AWrapper>
    </Aview>
  );
}

const mapDispatchToProps = (dispatch) => ({
  loginAction: bindActionCreators(loginActions, dispatch),
});

export default connect(null, mapDispatchToProps)(React.memo(Login));
