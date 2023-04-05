import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'
import { AccountBookOutlined, CarOutlined, EnvironmentOutlined, FileDoneOutlined, HomeOutlined, LaptopOutlined, LogoutOutlined, MenuOutlined, NotificationOutlined, StarOutlined, ToolOutlined, UserOutlined } from '@ant-design/icons';
import { message, Modal } from 'antd';
import { Layout, Menu, theme, } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getRole } from "../services/member";
import { getLocalStorage, removeLocalStorage } from '../tools/storage';
const { SubMenu } = Menu;
interface mainLayoutProps {
  children: React.ReactNode
}
interface Props {
  onConfirm: () => void;
}

const { Content, Sider } = Layout;



function MainLayout(props: mainLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation()
  const [role, changeRole] = useState<1 | 2 | 3|4>(1)
  const [visible, setVisible] = useState(false);
  
  const showModal = () => {
    setVisible(true);
  };
  const handleClick = (e: any) => {
    navigate(e.key);
  };
  const { children } = props
  const init = async () => {
  if(location.pathname!=='/loginRegister') {
      const ticket = getLocalStorage('userToken')
      if (!ticket) {
        navigate('/loginRegister')
      } else {
        const data = await getRole(ticket)
        changeRole(data.data.role)
      }
    }
  };

  useEffect(() => {
    init()
  }, [])
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);
  const onRouteChange = useCallback(() => {
    if (document.body.scrollTop || document.documentElement.scrollTop > 0) {
      window.scrollTo(0, 0)
    }
  }, [])
  useEffect(() => {
    onRouteChange()
    return () => onRouteChange()
  }, [location])

  if (['/loginRegister'].includes(location.pathname)) {
    return (
      <Layout >
        <Content style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 0,
          minHeight: 280,
          background: colorBgContainer,
          height: '100vh'
        }}>{children}</Content>
      </Layout>
    )
  } 

  const CustomModal: React.FC<Props> = ({ onConfirm }) => {
    const handleOk = () => {
      onConfirm();
      setVisible(false);
      message.success('操作成功')
      navigate('/loginRegister')
    };
  
    const handleCancel = () => {
      setVisible(false);
    };
  
    return (
      <div>
        <Modal
          title="确认弹窗"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="确认"
          cancelText="取消"
          okButtonProps={{ danger: true }}
        >
          <p>确认执行操作吗？</p>
        </Modal>
      </div>
    );
  };
  return (
    <Layout>
      {/* <AppHeader></AppHeader> */}
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }} collapsible collapsed={collapsed} onCollapse={setCollapsed}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['/']}
            style={{ height: '100%' }}
          >

            <Menu.Item icon={<HomeOutlined />} key='/' onClick={handleClick} style={{height:'60px'}}>万和嘉园物业系统</Menu.Item>
            <SubMenu title="个人信息" icon={<UserOutlined/>} >
        <Menu.Item icon={<UserOutlined/>} key='/profile'  onClick={handleClick}>个人主页</Menu.Item>
        <Menu.Item icon={<LogoutOutlined/>} onClick={showModal} >退出登录</Menu.Item>
      </SubMenu>
            <Menu.Item icon={<UserOutlined />} key='/member' style={{ display: role!==4?'none':'',height:'60px'}} onClick={handleClick} >成员管理</Menu.Item>
            <Menu.Item icon={<HomeOutlined />} key='/room' onClick={handleClick} style={{height:'60px'}}>房产资料管理</Menu.Item >
            <Menu.Item icon={<ToolOutlined />} key='/tool' onClick={handleClick} style={{height:'60px'}}>室内维修管理</Menu.Item >
            <Menu.Item icon={<EnvironmentOutlined />} key='/env' onClick={handleClick} style={{height:'60px'}}>保洁清理管理</Menu.Item >
            <Menu.Item icon={<CarOutlined />} key='/car' style={{height:'60px'}}>车位收费管理</Menu.Item>
            <Menu.Item icon={<StarOutlined />} key='/car' style={{height:'60px'}}>评价信息管理</Menu.Item>
            <Menu.Item icon={<FileDoneOutlined />} key='/car' style={{height:'60px'}}>工单管理</Menu.Item>
            <Menu.Item icon={<AccountBookOutlined />} key='/car' style={{height:'60px'}}>财务管理</Menu.Item>
            
            <Menu.Item icon={<NotificationOutlined />} key='/car' style={{height:'60px'}}>公告管理</Menu.Item>
          </Menu>
        </Sider>
        <CustomModal onConfirm={()=>{removeLocalStorage('userToken')}}/>
        <Layout >
          <Content style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: colorBgContainer,
            //   height:'100%'
          }}>{children}</Content>
          {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer> */}
        </Layout>
      </Layout>
    </Layout>
  )
}

export default MainLayout