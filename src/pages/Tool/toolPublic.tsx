import { useCallback, useEffect, useState } from "react";
import { Form, Input, Button, message, Card, Radio, Modal, Select } from "antd";
import { EyeInvisibleOutlined, EyeOutlined, EyeTwoTone } from "@ant-design/icons";
import { ButtonMap, ChangeStatusMap, changeUserStatus, getUserInfo, getUserList, Member, Role, RoleMap, ruleList, saveUserInfo, StatusMap, StatusType } from "../../services/member";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getLocalStorage } from "../../tools/storage";
import { createTool } from "../../services/tool";
const { Option } = Select;

const ToolPublicPage = () => {
    const navigate = useNavigate();
    const [personalInfo, setPersonalInfo] = useState<Member>({} as Member)
    const [userList, setUserList] = useState([])
    const [req, setReq] = useState({})
    const [visible, setVisible] = useState(false);
    const [roomList, setRoomList] = useState([])
    const [form] = Form.useForm();
    const location = useLocation()
    const [totalAmount, setTotalAmount] = useState(0); // 保存计算后的总金额

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

    const CustomModal: React.FC<any> = () => {
        const handleOk = async () => {
            setVisible(false);
            message.success('报修成功,会尽快处理~')
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
                    <p>{`确认报修吗？`}</p>
                </Modal>
            </div>
        );
    };
    const createToolMethod = async (data: any) => {
        await createTool(req)
    }
    return (
        <>
            <Card size="small" title="公共区域报修申请" style={{ width: '100%' }}>
                <Form
                    form={form}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={(e) => { console.log(123123123, e) }}
                >
                    <Form.Item label="用户名" >
                        <Input disabled value={personalInfo.userName} />
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
                <CustomModal />
            </Card>
        </>

    );
};

export default ToolPublicPage;