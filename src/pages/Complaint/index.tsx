import { useEffect, useState } from "react";
import { Button, Card, Form, Input, Space, Table, Select, message, Modal } from "antd";
import { ColumnProps } from "antd/lib/table";
import { getLocalStorage } from "../../tools/storage";
import { useNavigate } from "react-router-dom";
import { getRoomList, Room, RoomStatus } from "../../services/room";
import { Member, getUserInfo, getUserList } from "../../services/member";
import InputModal from "../../components/InputModal";
import { Parking, bindUserInParking, getParkingInfo, getParkingList } from "../../services/parking";
import { create, getList } from "../../services/complaint";
const { Option } = Select;

const ComplaintPage: React.FC = () => {
    const columns: ColumnProps<any>[] = [
        { title: "投诉人", dataIndex: "userName", align: 'center' },
        { title: "投诉内容", dataIndex: "complaint", align: 'center' },
        { title: "投诉时间", dataIndex: "createdAt", align: 'center' },
        {
            title: "操作",
            render: () => (
                <Space size='large'>
                    <Button type="primary" danger>删除</Button>
                </Space>
            ),
            align: 'center'
        },
    ];
    const [form] = Form.useForm();
    const [role, changeRole] = useState(1);
    const [userInfo, setUserInfo] = useState<Member>({} as Member)
    const [bindUserModalVisible, setBindUserModalVisible] = useState(false); // 控制绑定用户弹窗的显示与隐藏
    const [complaintList, setFilteredComplaints] = useState<any[]>([]);

    const init = async () => {
        const data = await getUserInfo();
        if (data.code !== 200) {
            message.error(data.message);
        } else {
            changeRole(data.data.role);
        }
    };

    useEffect(() => {
        init();
    }, []);

    const showBindUserModal = (item: any) => {
        // 打开绑定用户弹窗，并进行相关处理
        // await getUserInfoByParkingId()
        setBindUserModalVisible(true);
        // 其他处理逻辑，例如根据 parking 进行数据准备等
    };

    const handleSearch = async () => {
        const { data } = await getList()
        console.log(12312345678,data);
        setFilteredComplaints(data)
    }
    useEffect(() => {
        handleSearch()
    }, [role])


    const handleBindUser = async () => {
        const formData = form.getFieldsValue();
        const data = await create({...formData})
        // const data = await bindUserInParking({

        // })
        if(data.code!==200){
            message.error('新增投诉失败')
        }
        message.success('新增投诉成功')
        // 关闭绑定用户弹窗
        setBindUserModalVisible(false);
        await handleSearch()

    };

    const handleCancel = () => {
        // 关闭绑定用户弹窗
        setBindUserModalVisible(false);
    };

    return (
        <div>
                <Button type="primary"  onClick={showBindUserModal}>新增</Button>
                
          

            <Card size="small" title="投诉信息列表" style={{ width: '100%', marginTop: '20px' }}>
                <Table columns={columns} dataSource={complaintList} />
            </Card>

            {/* 绑定用户弹窗 */}
            <Modal
                visible={bindUserModalVisible}
                title="新增投诉"
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        取消
                    </Button>,
                    <Button key="bind" type="primary" onClick={handleBindUser}>
                        新增
                    </Button>
                ]}
            >
                <Form form={form}>
                    <Form.Item label='投诉内容' name="complaint">
                        <Input></Input>
                    </Form.Item>

                </Form>
            </Modal>
        </div>
    );
};

export default ComplaintPage;
