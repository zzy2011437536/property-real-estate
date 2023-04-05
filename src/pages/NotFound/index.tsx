import { Result, Button } from 'antd';

function NotFoundPage() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="对不起，您访问的页面不存在。"
      extra={<Button type="primary" href="/">返回首页</Button>}
    />
  );
}

export default NotFoundPage;