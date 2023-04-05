import { Button, Modal } from "antd";
import { useState } from "react";

interface Props {
    onConfirm: () => void;
  }

const CustomModal: React.FC<Props> = ({ onConfirm }) => {
    const [visible, setVisible] = useState(false);
  
    const handleOk = () => {
      console.log('执行确认操作');
      onConfirm();
      setVisible(false);
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
  export default CustomModal