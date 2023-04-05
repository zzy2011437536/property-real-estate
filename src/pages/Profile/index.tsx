import React from 'react';
import { Layout, Menu, Avatar, Dropdown } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;

const menu = (
  <Menu>
    <Menu.Item key="1">
      <SettingOutlined />
      个人设置
    </Menu.Item>
    <Menu.Item key="2">
      <LogoutOutlined />
      退出登录
    </Menu.Item>
  </Menu>
);

const ProfilePage = () => {
  return (
    <Layout>
      <Content style={{ padding: '50px' }}>
        <div style={{ marginBottom: '20px' }}>
          <Avatar size={128} icon={<UserOutlined />} />
          <div style={{ marginTop: '20px', fontSize: 24 }}>
            用户名
          </div>
        </div>
        <div>
          这里是个人主页的内容
        </div>
      </Content>
    </Layout>
  );
};

export default ProfilePage;
