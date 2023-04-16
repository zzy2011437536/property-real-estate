import { useCallback, useEffect, useState } from "react";
import { Form, Input, Button, message, Card, Radio, Modal, Select } from "antd";
import { EyeInvisibleOutlined, EyeOutlined, EyeTwoTone } from "@ant-design/icons";
import { ButtonMap, ChangeStatusMap, changeUserStatus, getUserInfo, Member, RoleMap, ruleList, saveUserInfo, StatusMap } from "../../services/member";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getLocalStorage } from "../../tools/storage";

interface Props {
  onConfirm: () => void;
}

const PersonalPage = () => {
  const params = useParams()
  const navigate = useNavigate();
  const [personalInfo, setPersonalInfo] = useState<Member>({} as Member);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [role, changeRole] = useState(1);
  const [form] = Form.useForm();
  const location = useLocation()
  const [visible, setVisible] = useState(false);
  const init = async () => {
      const data = await getUserInfo(params?.id!==getLocalStorage('userToken')?params?.id:'')
      const roleData = await getUserInfo(getLocalStorage('userToken'))
      if (data.code&&roleData.code !== 200) {
        message.error(data.message)
      } else {
        const roomList = data.data.rooms.map((item: { zone: string; name: string; })=>`${item.zone}-${item.name}`)
        setPersonalInfo({
          ...data.data,
          roomList
        })
        changeRole(roleData.data.role)
      }}
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
  if(params?.id!==personalInfo.ticket&&role!==4){
    navigate('/noauth')
  }

  const changePassword = async (values: any) => {
    console.log('values',values);
    if (values.newPassword !== values.confirmPassword) {
      message.error("两次密码输入不一致");
      return;
    }

    setPersonalInfo({
      ...personalInfo,
      password: values.newPassword,
    });;
    const data = await saveUserInfo({
      ...personalInfo,
      password: values.newPassword,
    })
    if(data.code!==200){
      message.error('出错了!!')
    }else{
      setIsEditingPassword(false);
      message.success("密码修改成功");
    }
  }
  const changeStatus = async (values:any)=>{
    const data = await changeUserStatus({
      ticket:personalInfo.ticket,
      statusType:!isNaN(values)?values:ChangeStatusMap.get(personalInfo.status)
    })
    if(data.code!==200){
      message.error(data.message)
    }else{
      setPersonalInfo(data.data)
      message.success('操作成功!')
    }
  }
  return (
    <>
        <Card size="small" title="个人信息" style={{ width: '100%' }}>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        initialValues={personalInfo}
        onFinish={changePassword}
      >
        <Form.Item  label="用户名" >
          <Input disabled value={personalInfo.userName} />
        </Form.Item>
        <Form.Item label="联系方式">
          <Input value={personalInfo.contactInformation} disabled />
        </Form.Item>
        <Form.Item label="密码">
          {!isEditingPassword ? (
            <>
              <Input
                type="password"
                placeholder="请输入密码"
                value={personalInfo.password}
                addonAfter={
                  <EyeOutlined
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      const input = document.getElementById('password-input') as HTMLInputElement;
                      if (input.type === 'password') {
                        input.type = 'text';
                      } else {
                        input.type = 'password';
                      }
                    }}
                  />
                }
                id="password-input"
                disabled={true}
              />
              <Button onClick={() => setIsEditingPassword(true)}>修改密码</Button>
            </>
          ) : (
            <>
              <Form.Item
                name="newPassword"
                label="新密码"
                rules={[
                  { required: true, message: "请输入新密码" },
                  { min: 6, message: "密码长度不能小于6位" },
                ]}
                hasFeedback

              >
                <Input.Password
                  visibilityToggle={true}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  allowClear={true}
                />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                label="确认密码"
                rules={[
                  { required: true, message: "请确认新密码" },
                  { min: 6, message: "密码长度不能小于6位" },
                ]}
                hasFeedback
              >
                <Input.Password
                  visibilityToggle={true}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }

                  allowClear={true}
                />
              </Form.Item>
              <Button onClick={() => setIsEditingPassword(false)}>取消修改</Button>
              <Button type="primary" htmlType="submit">
                确认修改
              </Button>
            </>
          )}

        </Form.Item>
        <Form.Item label="用户角色" >
          <Radio.Group options={ruleList} value={personalInfo.role} disabled />
        </Form.Item>

        <Form.Item label="账号状态">
          <Input disabled value={StatusMap.get(personalInfo.status)} />
        </Form.Item>
        {
      role===4&&personalInfo.ticket!==getLocalStorage('userToken')? <Form.Item label="操作">
                  {
            personalInfo.status===1?<Button onClick={()=>changeStatus(-1)}>审批拒绝</Button>:null
          }
          <Button onClick={changeStatus}>{ButtonMap.get(personalInfo.status)}</Button>

      </Form.Item>:null
    }        <Form.Item label="拥有房间">
                <Select
                    mode="multiple"
                    disabled
                    style={{ width: '100%' }}
                    allowClear
                    value={personalInfo.roomList}
                />
    </Form.Item>

        <Form.Item label="创建时间">
          <Input disabled value={personalInfo.createdAt} />
        </Form.Item>
      </Form>
    </Card>
    </>

  );
};

export default PersonalPage;