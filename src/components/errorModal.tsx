import { Modal, Button } from 'antd';
interface ErrorModalProps {
    visible: boolean;
    onClose: () => void;
    error: string|null;
  }
  
  const ErrorModal: React.FC<ErrorModalProps> = ({ visible, onClose, error }) => {
    return (
      <Modal
        visible={visible}
        onCancel={onClose}
        footer={[
          <Button key="close" onClick={onClose}>关闭</Button>
        ]}
      >
        <h3>出错啦！</h3>
        <p>{error}</p>
      </Modal>
    );
  }
export default ErrorModal
