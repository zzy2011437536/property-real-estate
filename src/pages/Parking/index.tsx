import { useEffect, useState } from "react";
import { Button, Card, Form, Input, Space, Table, Select, message, Modal } from "antd";
import { ColumnProps } from "antd/lib/table";
import { getLocalStorage } from "../../tools/storage";
import { useNavigate } from "react-router-dom";
import { getRoomList, Room, RoomStatus } from "../../services/room";
import { Member, getUserInfo, getUserList } from "../../services/member";
import InputModal from "../../components/InputModal";
import { Parking, bindUserInParking, getParkingInfo, getParkingList } from "../../services/parking";
const { Option } = Select;

const ParkingPage: React.FC = () => {
    const columns: ColumnProps<Room>[] = [
        { title: "区", dataIndex: "zone", align: 'center' },
        { title: "车位号", dataIndex: "name", align: 'center' },
        { title: "状态", dataIndex: "status", align: 'center' },
        {
            title: "操作",
            render: (parking: Parking) => (
                <Space size='large'>
                    <Button type="primary" onClick={() => showBindUserModal(parking)}>绑定用户</Button>
                </Space>
            ),
            align: 'center'
        },
    ];
    const [filteredps, setFilteredPs] = useState<any[]>([]);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [role, changeRole] = useState(1);
    const [bindUserModalVisible, setBindUserModalVisible] = useState(false); // 控制绑定用户弹窗的显示与隐藏
    const [selectedRowId, setSelectedRowId] = useState<number>(0); // 存储选中行的 ID
    const [userInfo, setUserInfo] = useState<Member>({} as Member)
    const [yezhuList, setYezhuList] = useState<any>([])
    const [form1] = Form.useForm();

    const init = async () => {
        const data = await getUserInfo();
        const yezhuUserList = await getUserList({role:1,status:2})

        if (data.code !== 200) {
            message.error(data.message);
        } else {
            changeRole(data.data.role);
            const list = yezhuUserList.data.map((item:any)=>{
                return {
                    label:item.userName,
                    value:item.id
                }
            })
            setYezhuList(list)
        }
    };

    useEffect(() => {
        init();
    }, [role]);

    const getUserInfoByParkingId = async () => {
        if(selectedRowId){
            const data = await getParkingInfo({ id: selectedRowId })
            console.log('wangmumu',data.data)
            if (data.code !== 200) {
                message.error(data.message);
            } else {
                if(data.data.user){
                    setUserInfo(data.data.user);
                    
                }else{
                    setUserInfo({} as Member);
                }
                await handleSearch({})
            }
        }
    }

    useEffect(() => {
        const fetchData = async () => {
          await getUserInfoByParkingId();
        };
      
        fetchData();
      }, [selectedRowId]);

    const handleSearch = async (e: any) => {
        const { data } = await getParkingList(e);
        const ps = data.map((item: any) => {
            return {
                ...item,
                status: item.status === 0 ? '未售出' : '已售出'
            };
        });
        setFilteredPs(ps);
    };

    useEffect(() => {
        handleSearch({});
    }, [selectedRowId]);

    const showBindUserModal = async (parking: Parking) => {
        console.log(123123123123,userInfo)
        // 设置选中行的 ID
        setSelectedRowId(parking.id);
        // 打开绑定用户弹窗，并进行相关处理
        // await getUserInfoByParkingId()
        setBindUserModalVisible(true);
        // 其他处理逻辑，例如根据 parking 进行数据准备等
    };

    const handleBindUser = async () => {
        const formData = form1.getFieldsValue();
        const data = await bindUserInParking({
            id:selectedRowId,
            userId:formData.userName
        })
        if(data.code!==200){
            message.error('绑定失败')
        }
        message.success('绑定成功')
        // 关闭绑定用户弹窗
        setBindUserModalVisible(false);
        setSelectedRowId(0)
        setUserInfo({}as Member)
    };

    const handleCancel = () => {
        setSelectedRowId(0)
        setUserInfo({}as Member)
        // 关闭绑定用户弹窗
        setBindUserModalVisible(false);
    };

    return (
        <div>
            <Card size="small" title="筛选项" style={{ width: '100%' }}>
                <Form form={form} onFinish={handleSearch} layout="inline" >
                    <Form.Item name="zone" label="区" >
                        <Select placeholder="请选择区" style={{ width: 200 }} allowClear={true}>
                            <Option value='A'>A</Option>
                            <Option value='B'>B</Option>
                            <Option value='C'>C</Option>
                            <Option value='D'>D</Option>
                            <Option value='E'>E</Option>
                            <Option value='F'>F</Option>
                            <Option value='G'>G</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name='name' label="车位号" style={{ marginLeft: 50 }}>
                        <Input
                            placeholder="请输入车位号 8"
                            style={{ width: 200 }}
                            allowClear={true}
                        />
                    </Form.Item>
                    <Form.Item name="status" label="状态" style={{ marginLeft: 50 }}>
                        <Select placeholder="请选择状态" style={{ width: 200 }} allowClear={true}>
                            <Option value={0}>出售中</Option>
                            <Option value={1}>已售出</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item style={{ marginLeft: 50 }}>
                        <Button type="primary" htmlType="submit">
                            查询
                        </Button>
                    </Form.Item>
                </Form>
            </Card>

            <Card size="small" title="车位信息列表" style={{ width: '100%', marginTop: '20px' }}>
                <Table columns={columns} dataSource={filteredps} />
            </Card>

            {/* 绑定用户弹窗 */}
            <Modal
                visible={bindUserModalVisible}
                title="绑定用户"
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        取消
                    </Button>,
                    <Button key="bind" type="primary" onClick={handleBindUser}>
                        绑定
                    </Button>
                ]}
            >
                <Form form={form1}>
                    <Form.Item label='用户名' name="userName">
                    <Select
                        defaultValue={userInfo?.userName || ''}
                        options={[
                            {
                                label: '业主',
                                options: yezhuList
                            },
                        ]}
                        allowClear
                    />
                    </Form.Item>

                </Form>
            </Modal>
        </div>
    );
};

export default ParkingPage;
