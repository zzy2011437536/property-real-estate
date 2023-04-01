import React, { useState } from "react";
import { Form, Input, Button ,Radio} from "antd";
import { UserOutlined, LockOutlined ,PhoneOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import type { RadioChangeEvent } from 'antd';

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

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [rule, setRule] = useState(1);
  const handleRegister = (values: any) => {
    setLoading(true);
    // 执行注册逻辑
    // ...
console.log(123123,values);
    // 注册成功后跳转到首页
    navigate("/");
  };

  const onChangeRule = ({ target: { value } }: RadioChangeEvent) => {
    console.log('radio2 checked', value);
    setRule(value);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Form form={form} onFinish={handleRegister} layout="vertical">
        <Form.Item
          name="username"
          label="用户名"
          rules={[{ required: true, message: "请输入用户名" }, { min: 3, message: "用户名至少需要3个字符" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item name="phone" label="手机号码" rules={[{ validator: phoneValidator }]}>
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
          <Button type="primary" htmlType="submit" block loading={loading}>
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterPage;