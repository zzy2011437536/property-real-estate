import React from 'react';
import { Layout, Avatar, Dropdown, Menu, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const AppHeader = () => {
  const navigate = useNavigate();
  // 模拟一个用户信息
  const userInfo = {
    avatarUrl: 'data:image/png;base64,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',
  };

  // 点击退出登录时触发的回调函数
  const handleLogout = () => {
    // 处理退出登录的逻辑
    console.log('logout');
  };

  const handleClick = (e: any) => {
    navigate(e.key);
  };

  // 下拉菜单的内容
  const menu = (
    <Menu>
      <Menu.Item key="profile" onClick={handleClick}>个人信息</Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>退出登录</Menu.Item>
    </Menu>
  );

  return (
    <Layout.Header style={{height:'60px'}}>
      <div style={{ color:'white',lineHeight:'60px',position:'absolute',left:'100px',fontSize:'18px'}}>万和嘉园物业管理系统</div>
      <div style={{height:'60px',lineHeight:'60px', position:'absolute',right:"100px"}}>
        <Dropdown overlay={menu}>
          <Avatar src={userInfo.avatarUrl} size={50} icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </Layout.Header>
  );
};

export default AppHeader;