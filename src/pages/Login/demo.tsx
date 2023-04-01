import './demo.css'
import { useState } from "react";
import { Button, Form, Input, Radio } from 'antd';
import { useNavigate } from "react-router-dom";
import { LockOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import type { RadioChangeEvent } from 'antd';
function DemoPage(){
    const [form] = Form.useForm();
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
    const [rule, setRule] = useState(1);
    const handleClick = () => {
        setIsLogin(!isLogin);
    };


    const ruleList = [
        { label: '业主', value: 1 },
        { label: '工作人员', value: 2 },
        { label: '管理员', value: 3 },
      ];
    
      const phoneValidator = (_: any, value:any) => {
        if (!value) {
          return Promise.reject(new Error("请输入手机号码"));
        } else if (!/^1[3456789]\d{9}$/.test(value)) {
          return Promise.reject(new Error("请输入正确的手机号码"));
        }
        return Promise.resolve();
      };
      const handleRegister = (values: any) => {
        // setLoading(true);
        // 执行注册逻辑
        // ...
    console.log(123123,values);
        // 注册成功后跳转到首页
        navigate("/");
      };
      const handleLogin = (values:any) => {
        console.log(123123,values);
        // 执行登录逻辑
        // ...
      };

      const onChangeRule = ({ target: { value } }: RadioChangeEvent) => {
        console.log('radio2 checked', value);
        setRule(value);
      };
    return(
        <div className={isLogin ?  'container':'container penal-right-active'} id="container">

        <div className="form-container sign-up-container">
        <Form form={form} onFinish={handleRegister} layout="vertical" style={{height:'100%'}}>
        <Form.Item
          name="username"
          label="用户名"
          rules={[{ required: true, message: "请输入用户名" }, { min: 3, message: "用户名至少需要3个字符" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item name="phone" label="手机号码" rules={[{ required: true  },{ validator: phoneValidator }]}>
          <Input prefix={<PhoneOutlined />} placeholder="请输入手机号码" />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          rules={[{ required: true, message: "请输入密码" }, { min: 8, message: "密码至少需要8个字符" }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="请输入密码" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="确认密码"
          rules={[
            { required: true, message: "请再次输入密码" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("两次输入的密码不一致"));
              },
            }),
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="请再次输入密码" />
        </Form.Item>
        
        <Form.Item label="角色" name="rule" rules={[{ required: true, message: "请选择角色" }]} initialValue={rule}>
        <Radio.Group options={ruleList} onChange={onChangeRule} value={rule} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            注册
          </Button>
        </Form.Item>
      </Form>
        </div>

        <div className="form-container sign-in-container">

            <Form form = {form} onFinish={handleLogin} layout="vertical">
            <Form.Item label="用户名" name="username" rules={[{ required: true, message: "请输入用户名" }]}>
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item label="密码" name="password" rules={[{ required: true, message: "请输入密码" }]}>
          <Input.Password placeholder="请输入密码" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            登录
          </Button>
        </Form.Item>
            </Form>
        </div>

        <div className="overlay-container">
            <div className="overlay">

                <div className="overlay-penal overlay-left-container">
                    <h1>welcome back!</h1>
                    <p>
                        To keep connected with us please login with your personal info
                    </p>
                    <button className="ghost" id="signIn" onClick={handleClick}>sign in</button>
                </div>

                <div className="overlay-penal overlay-right-container">
                    <h1>Hello Friend!</h1>
                    <p>
                        Enter your personal details and start journey with us
                    </p>
                    <button className="ghost" id="signUp" onClick={handleClick}>sign up</button>
                </div>
            </div>
        </div>
    </div>
    )
}
export default DemoPage