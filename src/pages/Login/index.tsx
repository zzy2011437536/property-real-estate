import React, { useState } from "react";
import { Form, Input, Button, Checkbox ,Radio} from "antd";
import type { RadioChangeEvent } from 'antd';

const LoginPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);


  const handleLogin = (values:any) => {
    setLoading(true);
    console.log(123123,values);
    // 执行登录逻辑
    // ...
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Form form={form} onFinish={handleLogin} layout="vertical">
        <Form.Item label="用户名" name="username" rules={[{ required: true, message: "请输入用户名" }]}>
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item label="密码" name="password" rules={[{ required: true, message: "请输入密码" }]}>
          <Input.Password placeholder="请输入密码" />
        </Form.Item>

        <Form.Item>
            <a href="/register">
                没有账号,去注册
            </a>
          <a href="/" style={{ float: "right" }}>忘记密码</a>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;