import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'
import { AccountBookOutlined, CarOutlined, EnvironmentOutlined, FileDoneOutlined, HomeOutlined, LaptopOutlined, LogoutOutlined, MenuOutlined, NotificationOutlined, StarOutlined, ToolOutlined, UserOutlined } from '@ant-design/icons';
import { message, Modal } from 'antd';
import { Layout, Menu, theme, } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getUserInfo, Member } from "../services/member";
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
  const [personalInfo, setPersonalInfo] = useState<Member>({} as Member);
  const [visible, setVisible] = useState(false);
  const [ticket, changeTicket] = useState('')

  const showModal = () => {
    setVisible(true);
  };
  const handleClick = (e: any) => {
    navigate(e.key);
  };
  const { children } = props
  const init = async () => {
    if (location.pathname !== '/loginRegister') {
      const ticket = getLocalStorage('userToken')
      if (!ticket) {
        navigate('/loginRegister')
      } else {
        changeTicket(ticket)
        const data = await getUserInfo()
        setPersonalInfo(data.data)
      }
    }
  };

  useEffect(() => {
    init()
  }, [ticket])
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
    init()
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
            selectedKeys={[`${location.pathname}`]}
            style={{ height: '100%' }}
          >

            <Menu.Item icon={<HomeOutlined />} key='/' onClick={handleClick} >万和嘉园物业系统</Menu.Item>
            <SubMenu title="个人信息" icon={<UserOutlined />} >
              <Menu.Item icon={<UserOutlined />} key={`/profile/${personalInfo.ticket}`} onClick={handleClick}>个人主页</Menu.Item>
              <Menu.Item icon={<LogoutOutlined />} onClick={showModal} >退出登录</Menu.Item>
            </SubMenu>
            {personalInfo.role === 4 ? <Menu.Item icon={<UserOutlined />} key='/member'  onClick={handleClick} >成员管理</Menu.Item> : null}
            <Menu.Item icon={<HomeOutlined />} key='/room' onClick={handleClick} >房产资料管理</Menu.Item >
            <SubMenu title="室内维修管理" icon={<ToolOutlined />}>
              <Menu.Item icon={<ToolOutlined />} key={`/tool/create`} onClick={handleClick} >维修申请</Menu.Item>
              <Menu.Item icon={<FileDoneOutlined />} key={`/tool/list`} onClick={handleClick} >维修工单管理</Menu.Item>
            </SubMenu>
            <SubMenu title="保洁清理管理" icon={<EnvironmentOutlined />} >
              <Menu.Item icon={<EnvironmentOutlined />} key={`/env/create`} onClick={handleClick}>清理申请</Menu.Item>
              <Menu.Item icon={<FileDoneOutlined />} key={`/env/list`} onClick={handleClick} >保洁工单管理</Menu.Item>
            </SubMenu>
            <Menu.Item icon={<CarOutlined />} key='/parkingCharge' onClick={handleClick} >车位收费管理</Menu.Item>
            <Menu.Item icon={<StarOutlined />} key='/evaluation' onClick={handleClick} >评价信息管理</Menu.Item>
            <Menu.Item icon={<FileDoneOutlined />} key='/bill' onClick={handleClick} >工单管理</Menu.Item>
            <Menu.Item icon={<AccountBookOutlined />} key='/finance' onClick={handleClick} >财务管理</Menu.Item>
            <Menu.Item icon={<NotificationOutlined />} key='/notice' onClick={handleClick} >公告管理</Menu.Item>
          </Menu>
        </Sider>
        <CustomModal onConfirm={() => { removeLocalStorage('userToken'); changeTicket(''); navigate('/') }} />
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