import { useEffect, useState } from "react";
import { Button, Card, Form, Input, Space, Table, Select } from "antd";
import { ColumnProps } from "antd/lib/table";
import { getUserList } from "../../services/member";
import { getLocalStorage } from "../../tools/storage";
// import { Member } from "./types";
const { Option } = Select;
const RoleMap = new Map()
RoleMap.set(1, '业主')
RoleMap.set(2, '保洁人员')
RoleMap.set(3, '维修人员')
RoleMap.set(4, '管理员')

const StatusMap = new Map()
StatusMap.set(-2, '账号封停')
StatusMap.set(1, '审批中')
StatusMap.set(2, '正常使用')

const ButtonMap = new Map()
ButtonMap.set(-2, '账号解封')
ButtonMap.set(1, '审批通过')
ButtonMap.set(2, '账号封停')

interface Member {
    id: number;
    userName: string;
    contactInformation: string;
    role: 1 | 2 | 3 | 4;
    createdAt: string;
    status: -2 | -1 | 1 | 2;
}
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
                <Button onClick={() => handleBan(member)}>{ButtonMap.get(member.status)}</Button>

                <Button onClick={() => handleBan(member)}>个人详情</Button>
            </Space>

        ),
        align: 'center'
    },
];

const MemberManagement: React.FC = () => {
    const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
    const [form] = Form.useForm();

    const handleBan = (member: Member) => {
        // 执行封禁操作
        console.log(`封禁成员：${member.userName}`);
    };
    const handleSearch = async (e: any) => {
        const ticket = getLocalStorage('userToken')
        const {data} = await getUserList(e,ticket)
        const members = data.map((item:any) => {
            return {
                ...item,
                role: RoleMap.get(item.role),
                newStatus:StatusMap.get(item.status),
            }
        })
        setFilteredMembers(members)
    }
    useEffect(()=>{
        handleSearch({})

    },[])
    return (
        <div>
            <Card size="small" title="筛选项" style={{ width: '100%' }}>
                <Form form={form} onFinish={handleSearch} layout="inline" >
                    <Form.Item name='userName' label="用户名">
                        <Input
                            placeholder="请输入姓名"
                            style={{ width: 200 }}
                        />
                    </Form.Item>
                    <Form.Item name='contactInformation' label="联系方式" style={{ marginLeft: '100px' }}>
                        <Input
                            placeholder="请输入联系方式"
                            style={{ width: 200 }}
                        />
                    </Form.Item>
                    <Form.Item name="status" label="状态" style={{ marginLeft: '100px' }}>
                        <Select placeholder="请选择状态" style={{ width: 200 }} allowClear={true}>
                            <Option value={-2}>账号封停</Option>
                            <Option value={1}>审批中</Option>
                            <Option value={2}>正常使用</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="role" label="角色" style={{ marginLeft: '100px' }} >
                        <Select placeholder="请选择角色" style={{ width: 200 }} allowClear={true}>
                            <Option value={1}>业主</Option>
                            <Option value={2}>保洁人员</Option>
                            <Option value={3}>维修人员</Option>
                            <Option value={4}>管理员</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item style={{ marginLeft: '100px' }}>
                        <Button type="primary" htmlType="submit">
                            查询
                        </Button>
                    </Form.Item>
                </Form>

            </Card>
            <Card size="small" title="成员列表" style={{ width: '100%', marginTop: '20px' }}>
                <Table columns={columns} dataSource={filteredMembers} />
            </Card>



        </div>
    );
};

export default MemberManagement;