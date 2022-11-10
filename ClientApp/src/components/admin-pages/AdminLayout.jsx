import { LogoutOutlined, UserOutlined, SwapOutlined } from "@ant-design/icons";
import { Layout as Ants_Layout, Menu, Avatar, ConfigProvider } from "antd";
import React, { useState } from "react";
import "moment/locale/tr";
import tr_TR from "antd/lib/locale/tr_TR";
import { adminBaseUrl } from "../../helper/constant/route-constant";
import { Outlet, Link } from "react-router-dom";
import  "../../style/AdminLayout.css";
import {connect} from "react-redux";
import { logout } from "../../redux/actions/authAction";

const { Header, Sider, Content, Footer } = Ants_Layout;
const { SubMenu } = Menu;

  function AdminLayout(props) {
    const { dispatchLogout } = props;

  return (
    <ConfigProvider locale={tr_TR}>
      <Ants_Layout className="" style={{ minHeight: "100%" }}>
        <Sider
          // className="backoffice-menu"
          theme="dark"
          trigger={null}
          collapsible
          // collapsed={collapsed}
        >
          <div
            className="logo"
            style={{
              height: "32px",
              margin: "16px",
              background: " rgba(255, 255, 255, 0.3)",
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontSize: "1.5rem",
                color: "white",
                marginTop: "4px",
                // display: collapsed ? "none" : "inline-block",
                transition: "all 0.2s",
              }}
            >
              BLOG
            </span>
          </div>

          <Menu
            theme="dark"
            mode="inline"
            style={{ border: "none" }}
            // defaultOpenKeys={openKeys}
            // defaultSelectedKeys={selectedKeys}
          >
            <SubMenu
              key={"Operation"}
              icon={<SwapOutlined />}
              title={"İŞLEMLER"}
            >
               <Menu.Item key={"user"}>
                <Link to={adminBaseUrl + "/admin-user"} title="user">
                  {" "}
                  KULLANICI-PROFİL
                </Link>
              </Menu.Item>
              <Menu.Item key={"article"}>
                <Link to={adminBaseUrl + "/admin-article"} title="article">
                  {" "}
                  MAKALE
                </Link>
              </Menu.Item>
              <Menu.Item key={"category"}>
                <Link to={adminBaseUrl + "/admin-category"} title="category">
                  KATEGORİLER
                </Link>
              </Menu.Item>
              <Menu.Item key={"tag"}>
                <Link to={adminBaseUrl + "/admin-tag"} title="tag">
                  ETİKET
                </Link>
              </Menu.Item>
              <Menu.Item key={"subscribe"}>
                <Link to={adminBaseUrl + "/admin-subscribe"} title="subscribe">
                  ABONELER
                </Link>
              </Menu.Item>
              <Menu.Item key={"socialmedia"}>
                <Link to={adminBaseUrl + "/admin-socialmedia"} title="socialmedia">
                  SOSYAL MEDYA
                </Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item icon={<LogoutOutlined />} 
            onClick={()=>{
              dispatchLogout()
            }}
            key={"Menu.Logout"}>
              {/* <Link to={'/BackOffice/Logout'}> */}
              ÇIKIŞ
              {/* </Link> */}
            </Menu.Item>
          </Menu>
        </Sider>
        <Ants_Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              lineHeight: 0,
              padding: 3,
              backgroundColor: "",
              color: "white",
            }}
          >
            <div
              style={{ position: "relative", float: "right", height: "100%" }}
            >
              <div className="header_avatar_pozisiyon">
                <div style={{ flex: "0 0 50%" }}>
                  {/* <Dropdown overlay={null} arrow>
                                <div className="langs">
                                    <div className="lang">
                                    </div>
                                </div>
                            </Dropdown> */}
                </div>
                <div style={{ flex: "1 1 50%" }}>
                  {/* <Dropdown overlay={null} className="header_avatar" arrow> */}
                  <Avatar
                    size={35}
                    icon={
                      <UserOutlined
                        style={{ fontSize: "25px", verticalAlign: "middle" }}
                      />
                    }
                  />
                  {/* </Dropdown> */}
                </div>
              </div>
            </div>
            <span className="triger_box1">
              {/* {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        // onClick: toggle,
                    })} */}
              {/* <span style={{
                        position: "absolute",
                        textShadow: "2px 2px 5px #cf2327",
                        fontSize: "2rem",
                        color: "white",
                        top: "34px"
                    }}>
                        Resmak
                    </span> */}
            </span>
          </Header>
          <Content>
            <Outlet />
          </Content>
          <Footer></Footer>
        </Ants_Layout>
      </Ants_Layout>
    </ConfigProvider>
  );
}

const mapDispatchToProps = {
  dispatchLogout :logout
}

export default connect(null, mapDispatchToProps)(AdminLayout)
