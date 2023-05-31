import { useEffect, useState } from "react";
import { Button, Card, Form, Input, Space, Table, Select, message } from "antd";
import { ColumnProps } from "antd/lib/table";
import { ButtonMap, getUserInfo, getUserList, Member, RoleMap, StatusMap } from "../../services/member";
import { getLocalStorage } from "../../tools/storage";
import { useNavigate } from "react-router-dom";
// import { Member } from "./types";
const { Option } = Select;


const handleBan = (e: any) => {
    console.log(e)
}

const columns: ColumnProps<Member>[] = [
    { title: "用户名", dataIndex: "userName", align: 'center' },
    { title: "联系方式", dataIndex: "contactInformation", align: 'center' },
    { title: "角色", dataIndex: "role", align: 'center' },
    { title: "状态", dataIndex: "newStatus", align: 'center' },
    { title: "创建时间", dataIndex: "createdAt", align: 'center' },
    {
        title: "操作",
        render: (member: Member) => (
            <Space size='large'>
                {/* <Button onClick={() => handleBan(member)}>{ButtonMap.get(member.status)}</Button> */}

                <Button onClick={() => window.open(`/profile/${member.ticket}`)}>个人详情</Button>
            </Space>

        ),
        align: 'center'
    },
];

const MemberManagement: React.FC = () => {
    const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
    const [form] = Form.useForm();
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

    const handleSearch = async (e: any) => {
        const { data } = await getUserList(e)
        const members = data.map((item: any) => {
            return {
                ...item,
                role: RoleMap.get(item.role),
                newStatus: StatusMap.get(item.status),
            }
        })
        setFilteredMembers(members)
    }
    useEffect(() => {
        handleSearch({})
    }, [])
    return (
        <div>
            <Card size="small" title="筛选项" style={{ width: '100%' }}>
                <Form form={form} onFinish={handleSearch} layout="inline" >
                    <Form.Item name='userName' label="用户名" >
                        <Input
                            placeholder="请输入姓名"
                        />
                    </Form.Item>
                    <Form.Item name='contactInformation' label="联系方式" style={{marginLeft:50}}>
                        <Input
                            placeholder="请输入联系方式"
                        />
                    </Form.Item>
                    <Form.Item name="status" label="状态" style={{marginLeft:50}}>
                        <Select placeholder="请选择状态" allowClear={true}>
                            <Option value={-2}>账号封停</Option>
                            <Option value={-1}>审批拒绝</Option>
                            <Option value={1}>审批中</Option>
                            <Option value={2}>正常使用</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="role" label="角色" style={{marginLeft:50}}>
                        <Select placeholder="请选择角色"  allowClear={true}>
                            <Option value={1}>业主</Option>
                            <Option value={2}>安保人员</Option>
                            <Option value={3}>维修人员</Option>
                            <Option value={4}>管理员</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item style={{marginLeft:50}}>
                        <Button type="primary" htmlType="submit">
                            查询
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            <Card size="small" title="成员列表" style={{ width: '100%', marginTop: '20px' }}>
                <Table columns={columns} dataSource={filteredMembers}/>
            </Card>



        </div>
    );
};

export default MemberManagement;