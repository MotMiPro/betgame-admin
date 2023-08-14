import React, { Fragment, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Dropdown, Layout, Menu } from "antd";
import { appColor, leftRouteSide } from "../configs/settings";
import { Color, LOGO } from "../configs/configs";
import { RootContext } from "../ContextApp";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as logoutActions from "../states/login/actions";
import styled from "styled-components";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

function MainLayout(props) {
  const { logoutAction } = props;
  const { userLoggedOut } = logoutAction;
  const history = useHistory();
  const activeKey = sessionStorage.getItem("k") ?? 1;

  const { userName } = useContext(RootContext);

  // const [collapsed, setCollapsed] = useState(false);
  // const [theme, setTheme] = useState("dark");

  const handleRoute = (path, key) => {
    sessionStorage.setItem("k", key);
    history.push(path);
  };

  const handleLogOut = () => {
    userLoggedOut();
  };

  // const changeTheme = (value) => {
  //   setTheme(value ? "dark" : "light");
  // };

  return (
    <Layout>
      <Header
        className="header"
        style={{
          padding: "0 10px",
        }}
      >
        <div className="logo">
          <div
            style={{
              height: "auto",
              width: 50,
              margin: "0 auto",
            }}
          >
            <img
              style={{
                width: "100%",
                height: "100%",
              }}
              src={LOGO}
              alt="logo"
            />
          </div>
        </div>
        <div
          style={{
            color: Color.gray,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span
            style={{
              width: 35,
              height: 35,
              overflow: "hidden",
              borderRadius: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "25px",
              border: "1px solid gray",
              textTransform: "uppercase",
            }}
          >
            <span>{userName?._user.charAt(0)}</span>
          </span>
          <Dropdown
            overlay={userListSetting({ userName, handleLogOut })}
            placement="bottomLeft"
          >
            <span
              style={{
                padding: 5,
                cursor: "pointer",
              }}
            >
              {userName?._user}
            </span>
          </Dropdown>
        </div>
      </Header>
      <Layout>
        <Sider
          width={150}
          className="site-layout-background"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
          }}
        >
          <MenuWrapper
            // theme={theme}
            mode={["vertical"]}
            defaultSelectedKeys={[activeKey]}
            style={{
              height: "100%",
              backgroundColor: "#001528",
              color: appColor.white,
            }}
            defaultOpenKeys={[activeKey >= 4 ? 4 : 0]}
          >
            {/* <div
              style={{
                padding: 10,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                <SwitchWrapper
                  checked={theme === "dark"}
                  checkedChildren="Dark"
                  unCheckedChildren="Light"
                  onChange={changeTheme}
                />
              </div>
            </div> */}
            {leftRouteSide?.length > 0 &&
              leftRouteSide.map((item, idx) => {
                return (
                  <Fragment key={idx}>
                    {!item.subMenu ? (
                      <Menu.Item
                        style={{
                          textTransform: "capitalize",
                          fontWeight: 700,
                        }}
                        icon={<i className={item.icon} />}
                        key={idx}
                        onClick={() => handleRoute(item.route, idx)}
                      >
                        {item.display_name}
                      </Menu.Item>
                    ) : (
                      <Fragment>
                        <SubMenu
                          key={idx}
                          icon={<i className={item.icon} />}
                          title={item.display_name}
                          style={{
                            textTransform: "capitalize",
                            fontWeight: 700,
                          }}
                        >
                          {item.subMenu.map((sub, index) => (
                            <Menu.Item
                              key={`${index}_${sub.route}`}
                              style={{
                                textTransform: "capitalize",
                                fontWeight: 500,
                              }}
                              icon={<i className={sub.icon} />}
                              onClick={() =>
                                handleRoute(sub.route, index + 100)
                              }
                            >
                              {sub.display_name}
                            </Menu.Item>
                          ))}
                        </SubMenu>
                      </Fragment>
                    )}
                  </Fragment>
                );
              })}
          </MenuWrapper>
        </Sider>
        <Layout
          style={{ padding: "0 0 15px 5px", minHeight: "calc(100vh - 64px)" }}
        >
          <Content
            className="site-layout-background"
            style={{
              padding: 10,
              margin: 0,
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
const mapDispatchToProps = (dispatch) => ({
  logoutAction: bindActionCreators(logoutActions, dispatch),
});

export default connect(null, mapDispatchToProps)(React.memo(MainLayout));

const userListSetting = (props) => {
  const { handleLogOut, userName } = props;
  return (
    <Menu>
      <Menu.Item key={1}>{userName?._email}</Menu.Item>
      <Menu.Item key={2} onClick={handleLogOut}>
        Logout
      </Menu.Item>
    </Menu>
  );
};

const MenuWrapper = styled(Menu)`
  i.ant-menu-submenu-arrow {
    color: whitesmoke;
  }
`;
