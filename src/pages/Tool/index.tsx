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

        const roomList = personalInfoData.data.rooms.map((item:any)=>{
            return {
                ...item,
                roomName:`${item.zone}-${item.name}`
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
        const handleOk = () => {
          onConfirm();
          setVisible(false);
          message.success('下单成功')
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
              <p>确认下单吗？</p>
            </Modal>
          </div>
        );
      };
      const createToolMethod = async (data:any)=>{
        await createTool(req)
      }
    return (
        <>
            <Card size="small" title="个人信息" style={{ width: '100%' }}>
                <Form
                    form={form}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={(e) => { console.log(123123123,e); setReq(e) }}
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
                        <Select placeholder="请选择维修类型" allowClear={true}>
                            <Option value={1}>水电维修——50元起</Option>
                            <Option value={2}>家电维修——100元起</Option>
                            <Option value={3}>室内维修——100元起</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="tollGathererId" label="维修人" >
                        <Select placeholder="请选择维修工人" allowClear={true}>
                            {userList}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" onClick={showModal} >
                            下单
                        </Button>
                    </Form.Item>
                </Form>
                <CustomModal onConfirm={createToolMethod} />
            </Card>
        </>

    );
};

export default ToolPage;