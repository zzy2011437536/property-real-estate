import { Result, Button } from 'antd';

function NoAuthPage() {
  return (
    <Result
      status="403"
      title="403"
      subTitle="抱歉，您没有访问此页面的权限。"
      extra={<Button type="primary" href="/">返回首页</Button>}
    />
  );
}

export default NoAuthPage;