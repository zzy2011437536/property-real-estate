import React, {useCallback, useEffect, useState} from "react";
import { useLocation } from 'react-router-dom'
import { LaptopOutlined, MenuOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Button, MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme ,} from 'antd';
import { useNavigate } from 'react-router-dom';
import logo from '../logo.svg'
const { SubMenu } = Menu;
interface mainLayoutProps {
    children: React.ReactNode
}


const { Header, Content, Footer, Sider } = Layout;



const items1: MenuProps['items'] = ['首页', '个人信息', '头像'].map((key) => ({
  key,
  label: key,
}));

function MainLayout(props: mainLayoutProps) {
    const navigate = useNavigate();
    const handleClick = (e:any) => {
        navigate(e.key);
      };
    const {
        token: { colorBgContainer },
      } = theme.useToken();
      const [collapsed, setCollapsed] = useState(false);
    const location = useLocation()
    const { children } = props
console.log(123123,location);
    const onRouteChange = useCallback(() => {
        if (document.body.scrollTop || document.documentElement.scrollTop > 0) {
            window.scrollTo(0,0)
        }
    }, [])
    useEffect(() => {
        onRouteChange()
        return () => onRouteChange()
    }, [location])
    if(['/login','/register'].includes(location.pathname)){
        return (
            <Layout >
            <Content             style={{
                display:'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 0,
                minHeight: 280,
                background: colorBgContainer,
                height:'100vh'
              }}>{children}</Content>
        {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer> */}
        </Layout>
        )
    }
    return (
        <Layout>
      <Header className="header">
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }} collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
              
            >
      <SubMenu title="成员管理" icon={<UserOutlined/>} key='/user' onTitleClick={handleClick}>
        <Menu.Item>子菜单项1</Menu.Item>
        <Menu.Item>子菜单项2</Menu.Item>
      </SubMenu>

             <Menu.Item icon={<LaptopOutlined/>}></Menu.Item>  
             <Menu.Item icon={<NotificationOutlined/>}></Menu.Item>     
            {/* <Menu.Item key="3" icon={<MenuOutlined />} style={{position:'absolute',right:'0'}} onClick={toggleCollapsed}></Menu.Item> */}
            </Menu>
        </Sider>
        <Layout >
          <Content             style={{
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