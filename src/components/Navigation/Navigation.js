import { Layout, Menu, Switch, theme } from 'antd';
import Link from 'next/link';
import React, { useState } from 'react';
const { Header, Content, Footer, Sider } = Layout;
import Icon, { MenuOutlined, UserOutlined, DashboardOutlined } from '@ant-design/icons';

import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import styles from '@/components/Navigation/Navigation.module.css';

import MoonSvg from '@/assets/svg/moon-icon.svg'
import SunSvg from '@/assets/svg/sun-icon.svg'
import JoystickSVG from '@/assets/svg/joystick-icon.svg'
import useWindowSize from '@/hooks/useResize';

const MoonIcon = (props) => <Icon component={MoonSvg} {...props} />;
const SunIcon = (props) => <Icon component={SunSvg} {...props} />;
const JoystickIcon = (props) => <Icon component={JoystickSVG} {...props} />;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    label,
    children
  };
}

const Navigation = ({ children, handleClick }) => {
  const [selectedKey, setSelectedKey] = useState("0");
  const [menuOpen, setMenuOpen] = useState(false);
  const size = useWindowSize();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const changeSelectedKey = (event) => {
    const key = event.key;
    setSelectedKey(key);

    if (size.width <= 991) {
      setMenuOpen(true)
    }
  };


  const menuItems = [
    getItem(
      <Link key='1' className={styles.labelMenu} href='/'>Dashboard</Link>,
      '1',
      <DashboardOutlined />,
    ),
    getItem(
      <Link key='2' className={styles.labelMenu} href='/games'>Games</Link>,
      '2',
      <JoystickIcon />,
    ),
    getItem(
      <Link className={styles.labelMenu} href='/users'>Users</Link>,
      'Users',
      <UserOutlined />,

    ),
  ];

  const handleMenuClick = () => {
    // if (size.width > 991) { // Alterado para maior que 991 pixels
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
    // }
  };

  return (
    <Layout style={{ minHeight: "100vh" }} className={styles.layout}>
      <Sider
        style={{
          background: colorBgContainer,
        }}

        defaultCollapsed={true}
        // collapsed={menuOpen}
        breakpoint="lg"
        collapsedWidth="0"

        trigger={
          <MenuOutlined style={{ zIndex: '999999' }} onClick={handleMenuClick}></MenuOutlined>
        }
      >
        <Menu
          style={{
            background: colorBgContainer,
          }}
          onClick={changeSelectedKey}
          items={menuItems}
          selectedKeys={[selectedKey]}
          mode="inline"
        >
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <div className={styles.switchButton}>
            <Switch onClick={handleClick} checkedChildren={<SunIcon />}
              unCheckedChildren={<MoonIcon />}>
              Change Theme
            </Switch >
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px 0',
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Breadcrumbs />
            {children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Navigation;