import { useCallback, useEffect, useState } from "react";
import { Button, message, Card, Space, Table, Select } from "antd";
import { getUserInfo, Member, RoleMap, StatusMap } from "../../services/member";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getLocalStorage } from "../../tools/storage";
import { ColumnProps } from "antd/lib/table";
import { addUserInRoom, delUserInRoom, getRoomInfo, getUserListFormAddUserInRoom } from "../../services/room";
const { Option } = Select;

const RoomUserPage = () => {
    const params = useParams()
    const delUser = async (id: number) => {
        const data = await delUserInRoom({ userId: id, roomId: params.id })
        if (data.code !== 200) {
            message.error(data.message)
        } else {
            await init()
            message.success('移除用户成功')
        }

    }
    const columns: ColumnProps<Member>[] = [
        { title: "用户名", dataIndex: "userName", align: 'center' },
        { title: "联系方式", dataIndex: "contactInformation", align: 'center' },
        { title: "角色", dataIndex: "role", align: 'center' },
        { title: "状态", dataIndex: "newStatus", align: 'center' },
        {
            title: "操作",
            render: (member: Member) => (
                <Space size='large'>
                    <Button onClick={() => delUser(member.id)}>移除用户</Button>
                </Space>

            ),
            align: 'center'
        },
    ];
    const [searchValue, setSearchValue] = useState("");
    const [selectedValue, setSelectedValue] = useState([]);
    const [addUserValue, setAddUserValue] = useState([]);
    const navigate = useNavigate();
    const [roomUserInfo, setRoomUserInfo] = useState<Member[]>([] as Member[]);
    const [role, changeRole] = useState(1);
    const location = useLocation()
    const init = async () => {
        const [data, roleData] = await Promise.all([
            await getRoomInfo({ id: params.id }),
            await getUserInfo(getLocalStorage('userToken'))
        ])
        if (data.code && roleData.code !== 200) {
            message.error(data.message)
        } else {
            const members = data.data.users.map((item: any) => {
                return {
                    ...item,
                    role: RoleMap.get(item.role),
                    newStatus: StatusMap.get(item.status),
                }
            })
            setRoomUserInfo(members)
            changeRole(roleData.data.role)
            if (roleData.data.role !== 4) {
                navigate('/noauth')
            }
        }
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
    const searchUser = async () => {
        const data = await getUserListFormAddUserInRoom({
            userName: searchValue,
            roomId: params.id
        })
        const newOptions = data.data.map((item: Member) => (
            <Option key={item.id} value={item.userName}>{item.userName}</Option>
        ));
        setSelectedValue(newOptions)
    }
    useEffect(() => {
        searchUser()
    }, [searchValue])


    const addUser = async () => {
        const data = await addUserInRoom({
            userList: addUserValue,
            roomId: params.id
        })
        if (data.code !== 200) {
            message.error(data.message)
        } else {
            await init()
            setAddUserValue([])
            setSearchValue('')
            message.success('添加用户成功')
        }

    }


    return (
        <>
            <Card size="small" title="添加成员" style={{ width: '100%' }}>
                <Select
                    mode="multiple"
                    style={{ width: '90%' }}
                    allowClear
                    placeholder="Please select"
                    value={addUserValue}
                    onChange={(e) => { setAddUserValue(e) }}
                    onSearch={(e) => { setSearchValue(e) }}
                >{selectedValue}</Select>
                <Button type="primary" style={{ position: 'absolute', right: '3%' }} onClick={addUser}>添加用户</Button>
            </Card>
            <Card size="small" title="房屋所属成员列表" style={{ width: '100%', marginTop: '20px' }}>
                <Table columns={columns} dataSource={roomUserInfo} />
            </Card>
        </>

    );
};

export default RoomUserPage;