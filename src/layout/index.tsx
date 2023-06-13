import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'
import { AccountBookOutlined, CarOutlined, EnvironmentOutlined, FileDoneOutlined, HomeOutlined, ScheduleOutlined,LaptopOutlined, CrownOutlined,LogoutOutlined, MenuOutlined, NotificationOutlined, StarOutlined, ToolOutlined, UserOutlined } from '@ant-design/icons';
import { message, Modal } from 'antd';
import { Layout, Menu, theme, } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getUserInfo, Member } from "../services/member";
import { getLocalStorage, removeLocalStorage } from '../tools/storage';
import { Footer } from "antd/es/layout/layout";
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
              <Menu.Item icon={<CrownOutlined />} key='/profileVip' onClick={handleClick} >会员中心</Menu.Item>
              <Menu.Item icon={<LogoutOutlined />} onClick={showModal} >退出登录</Menu.Item>
            </SubMenu>
            {personalInfo.role === 4 ? <Menu.Item icon={<UserOutlined />} key='/member' onClick={handleClick} >成员管理</Menu.Item> : null}
            {personalInfo.role === 4 ? <Menu.Item icon={<HomeOutlined />} key='/room' onClick={handleClick} >房屋资产管理</Menu.Item> : null}
            {personalInfo.role === 1 ? <Menu.Item icon={<AccountBookOutlined />} key={`/profile/room/${personalInfo.id}`} onClick={handleClick} >物业缴费管理</Menu.Item> : null}
            <SubMenu title="物业报修管理" icon={<ToolOutlined />}>
              {personalInfo.role === 1 ? <Menu.Item icon={<ToolOutlined />} key={`/tool/create`} onClick={handleClick} >室内维修申请</Menu.Item> : null}
              {personalInfo.role === 1 ? <Menu.Item icon={<ToolOutlined />} key={`/tool/createPublic`} onClick={handleClick} >公共区域报修</Menu.Item> : null}
              <Menu.Item icon={<FileDoneOutlined />} key={`/tool/list`} onClick={handleClick} >维修工单管理</Menu.Item>
            </SubMenu>
            {personalInfo.role === 4 ? <Menu.Item icon={<CarOutlined />} key='/parking' onClick={handleClick} >车位信息管理</Menu.Item> : null}
            {personalInfo.role === 1||personalInfo.role===4 ? <Menu.Item icon={<NotificationOutlined />} key={`complaint`} onClick={handleClick} >投诉管理</Menu.Item> : null}
            {personalInfo.role === 4||personalInfo.role===2 ? <Menu.Item icon={<ScheduleOutlined />} key='/scheduleTable' onClick={handleClick} >安保管理</Menu.Item> : null}
            

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
          <Footer style={{ textAlign: 'center' }}>万和嘉园物业系统 ©2023 Created by zhuzhiyuan</Footer>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default MainLayout