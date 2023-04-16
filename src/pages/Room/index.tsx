import { useEffect, useState } from "react";
import { Button, Card, Form, Input, Space, Table, Select, message } from "antd";
import { ColumnProps } from "antd/lib/table";
import { getLocalStorage } from "../../tools/storage";
import { useNavigate } from "react-router-dom";
import { getRoomList, Room, RoomStatus } from "../../services/room";
import { getUserInfo } from "../../services/member";
import InputModal from "../../components/InputModal";
const { Option } = Select;



const RoomPage: React.FC = () => {
    const columns: ColumnProps<Room>[] = [
        { title: "区", dataIndex: "zone", align: 'center' },
        { title: "房间号", dataIndex: "name", align: 'center' },
        { title: "占地面积", dataIndex: "area", align: 'center' },
        { title: "每平米售价", dataIndex: "salePrice", align: 'center' },
        { title: "房屋描述", dataIndex: "description", align: 'center' },
        { title: "状态", dataIndex: "newStatus", align: 'center' },
        { title: "创建时间", dataIndex: "createdAt", align: 'center' },
        {
            title: "操作",
            render: (room: Room) => (
                <Space size='large'>
    
                    <Button onClick={() => window.open(`/room/${room.id}/user`)}>住户管理</Button>
                </Space>
    
            ),
            align: 'center'
        },
    ];
    const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();
    const [role, changeRole] = useState(1)
    const init = async () => {
        const data = await getUserInfo()
        if (data.code !== 200) {
            message.error(data.message)
        } else {
            changeRole(data.data.role)
        }

    };
    useEffect(() => {
        init()
    }, [])
    if (role !== 4) {
        navigate('/noauth')
    }

    const handleOpenModal = () => {
        setVisible(true);
      };
    
      const handleCloseModal = () => {
        setVisible(false);
      };
    const handleSearch = async (e: any) => {
        const { data } = await getRoomList(e)
        const rooms = data.map((item: any) => {
            return {
                ...item,
                newStatus: RoomStatus[item.status as 0|1],
                description:item.description||'-'
            }
        })
        setFilteredRooms(rooms)
    }
    useEffect(() => {
        handleSearch({})
    }, [])
    console.log(123123,filteredRooms);
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
                        </Select>
                    </Form.Item>
                    <Form.Item name='name' label="房间号" style={{ marginLeft: 50 }}>
                        <Input
                            placeholder="请输入房间号 601"
                            style={{ width: 200 }}
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
                <InputModal visible={visible} onClose={handleCloseModal} />
            </Card>
            <Card size="small" title="成员列表" style={{ width: '100%', marginTop: '20px' }}>
                <Table columns={columns} dataSource={filteredRooms}/>
            </Card>

        </div>
    );
};

export default RoomPage;