import React, { useState } from 'react';
import { Modal, Button, message } from 'antd';

interface SuccessModalProps {
  visible: boolean;
  onClose: () => void;
  message: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ visible, onClose, message }) => {
  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>关闭</Button>
      ]}
    >
      <h3>成功！</h3>
      <p>{message}</p>
    </Modal>
  );
}
export default SuccessModal
