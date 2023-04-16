import React, { useState } from "react";
import { Modal, Input, Button } from "antd";

interface InputModalProps {
  visible: boolean;
  onClose: () => void;
}

const InputModal: React.FC<InputModalProps> = ({ visible, onClose }) => {
  const [value, setValue] = useState("");

  const handleOk = () => {
    console.log(value); // 在这里可以处理用户输入的值
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal visible={visible} onOk={handleOk} onCancel={handleCancel}>
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
    </Modal>
  );
};

export default InputModal;