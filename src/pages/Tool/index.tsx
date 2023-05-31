import { useCallback, useEffect, useState } from "react";
import { Form, Input, Button, message, Card, Radio, Modal, Select } from "antd";
import { EyeInvisibleOutlined, EyeOutlined, EyeTwoTone } from "@ant-design/icons";
import { ButtonMap, ChangeStatusMap, changeUserStatus, getUserInfo, getUserList, Member, Role, RoleMap, ruleList, saveUserInfo, StatusMap, StatusType } from "../../services/member";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getLocalStorage } from "../../tools/storage";
import { createTool } from "../../services/tool";
const { Option } = Select;

const ToolPage = () => {
    const navigate = useNavigate();
    const [personalInfo, setPersonalInfo] = useState<Member>({} as Member)
    const [userList, setUserList] = useState([])
    const [req, setReq] = useState({})
    const [visible, setVisible] = useState(false);
    const [roomList, setRoomList] = useState([])
    const [form] = Form.useForm();
    const location = useLocation()
    const [totalAmount, setTotalAmount] = useState(0); // 保存计算后的总金额



    const handleServiceChange = (value: number) => {
        let amount = 0;
        // 根据选择的服务值进行不同的金额计算和打折逻辑
        switch (value) {
            case 1:
                amount = 100; // 假设电器维修的金额是100元
                break;
            case 2:
                amount = 120; // 假设管道维修的金额是120元
                break;
            case 3:
                amount = 50; // 假设管道维修的金额是120元
                break;
            case 4:
                amount = 100; // 假设管道维修的金额是120元
                break;
            case 5:
                amount = 50; // 假设管道维修的金额是120元
                break;
            case 6:
                amount = 100; // 假设管道维修的金额是120元
                break;
            // 其他服务的金额计算和打折逻辑
            default:
                break;
        }
        // 在这里可以根据需要进行打折操作或其他金额调整
        // ...

        setTotalAmount(amount);
    };

    const showModal = () => {
        setVisible(true);
    };

    const init = async () => {
        const userListData = await getUserList({
            role: Role.maintenance,
            status: StatusType.success
        })
        const personalInfoData = await getUserInfo()

        setPersonalInfo(personalInfoData.data)

        const roomList = personalInfoData.data.rooms.map((item: any) => {
            return {
                ...item,
                roomName: `${item.zone}-${item.name}`
            }
        })

        const roomOptions = roomList.map((item: any) => (
            <Option key={item.id} value={item.id}>{item.roomName}</Option>
        ));
        const userOptions = userListData.data.map((item: Member) => (
            <Option key={item.id} value={item.id}>{item.userName}</Option>
        ))
        setUserList(userOptions)
        setRoomList(roomOptions)
    }

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

    const CustomModal: React.FC<any> = ({ onConfirm }) => {
        const handleOk = async () => {
            await onConfirm();
            setVisible(false);
            message.success('下单成功')
        };

        const handleCancel = () => {
            setVisible(false);
        };
        // 根据会员等级获取对应的折扣率
  const getDiscountRate = (vipLevel:string) => {
    switch (vipLevel) {
      case "v1":
        return 1; // 不打折
      case "v2":
        return 0.9; // 9折
      case "v3":
        return 0.8; // 8折
      // 其他会员等级折扣率
      default:
        return 1; // 默认不打折
    }
  };

  // 根据会员等级和总金额计算折后价格
  const getDiscountedPrice = (vipLevel:string, amount:number) => {
    const discountRate = getDiscountRate(vipLevel);
    return amount * discountRate;
  };
  const discountedPrice = getDiscountedPrice(personalInfo.vipLevel, totalAmount);

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
                    <p>{`尊贵的${personalInfo.vipLevel}会员，折后价格${discountedPrice}，确认下单吗？`}</p>
                </Modal>
            </div>
        );
    };
    const createToolMethod = async (data: any) => {
        await createTool(req)
    }
    return (
        <>
            <Card size="small" title="维修申请" style={{ width: '100%' }}>
                <Form
                    form={form}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={(e) => { console.log(123123123, e); setReq(e) }}
                >
                    <Form.Item label="用户名" >
                        <Input disabled value={personalInfo.userName} />
                    </Form.Item>
                    <Form.Item name="roomId" label="房间" >
                        <Select placeholder="请选择维修房屋" allowClear={true}>
                            {roomList}
                        </Select>
                    </Form.Item>
                    <Form.Item name="type" label="维修类型" >
                        <Select placeholder="请选择维修类型" allowClear={true} onChange={handleServiceChange}>
                            <Option value={1}>电器维修——100元起</Option>
                            <Option value={2}>管道维修——120元起</Option>
                            <Option value={3}>木工维修——50元起</Option>
                            <Option value={4}>油漆维修——100元起</Option>
                            <Option value={5}>家具维修——50元起</Option>
                            <Option value={6}>灯具维修——100元起</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="tollGathererId" label="维修人" >
                        <Select placeholder="请选择维修工人" allowClear={true}>
                            {userList}
                        </Select>
                    </Form.Item>
                    <Form.Item name="description" label="问题描述" >
                        <Input placeholder="请输入维修问题描述" allowClear={true}>
                            
                        </Input>
                    </Form.Item>
                    <Form.Item>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button type="primary" htmlType="submit" onClick={showModal}>
                                下单
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
                <CustomModal onConfirm={createToolMethod} />
            </Card>
        </>

    );
};

export default ToolPage;