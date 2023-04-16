import { useEffect, useState } from "react";
import { Button, Card, Form, Input, Space, Table, Select, message, Rate, Modal } from "antd";
import { ColumnProps } from "antd/lib/table";
import { ButtonMap, getUserInfo, getUserList, Member, RoleMap, StatusMap } from "../../services/member";
import { getLocalStorage } from "../../tools/storage";
import { useNavigate } from "react-router-dom";
import { ToolType, ToolTypeMap, changeRate, getList } from "../../services/tool";
// import { Member } from "./types";
const { Option } = Select;



const ToolListPage: React.FC = () => {
    const [disabledIndexes, setDisabledIndexes] = useState<any>([]);
    const [personalInfo, setPersonalInfo] = useState<Member>({} as Member)
    const [toolList, setToolList] = useState([])
    const [rating, setRating] = useState(0);
    const [role, setRole] = useState(1);
    const [visible, setVisible] = useState(false);
    const [id, setId] = useState(0)
    const navigate = useNavigate();
    const init = async () => {
        const data = await getList()
        const userInfo = await getUserInfo()
        if (data.code !== 200) {
            message.error(data.message)
        } else {
            const toolList = data.data.map((item: any) => {
                return {
                    ...item,
                    userName: item.user.userName,
                    contactInformation: item.user.contactInformation,
                    roomName: `${item.room.zone}-${item.room.name}`,
                    type: ToolTypeMap[item.type as 1 | 2 | 3],
                    tollGatherer: item.tollGatherer.userName,
                    tollGathererContactInformation: item.tollGatherer.contactInformation
                }
            })
            setToolList(toolList)
            setRole(userInfo.data.role)
        }
    };
    useEffect(() => {
        init()
    }, [])
    const showModal = () => {
        setVisible(true);
    };
    const columns: ColumnProps<Member>[] = [
        { title: "业主用户名", dataIndex: "userName", align: 'center' },
        { title: "业主联系方式", dataIndex: "contactInformation", align: 'center' },
        { title: "维修工人用户名", dataIndex: "tollGatherer", align: 'center' },
        { title: "维修工人联系方式", dataIndex: "tollGathererContactInformation", align: 'center' },
        { title: "房间", dataIndex: "roomName", align: 'center' },
        { title: "维修类型", dataIndex: "type", align: 'center' },
        { title: "金额", dataIndex: "amount", align: 'center' },
        { title: "维修时间", dataIndex: "createdAt", align: 'center' },
        {
            title: "评分",
            render: (item: any) => (
                <Space size='large'>
                    <Rate key={item.id} defaultValue={item.evaluation} disabled={item.evaluation > 0 ||role!==1|| disabledIndexes.includes(item.id)} onChange={(e) => { setId(item.id); setRating(e); showModal() }} />
                </Space>
            ),
            align: 'center'
        },
    ];
    const CustomModal: React.FC<any> = ({ onConfirm }) => {
        const handleOk = () => {
            onConfirm();
            setVisible(false);
            message.success('评分成功')
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
                    <p>确定评分吗？</p>
                </Modal>
            </div>
        );
    };
    const createToolMethod = async () => {
        const data = await changeRate({
            id,
            rate: rating
        })
        setDisabledIndexes([...disabledIndexes, id])
        setId(0)
        setRating(0)
    }
    return (
        <div>
            <Card size="small" title="维修工单列表" style={{ width: '100%', marginTop: '20px' }}>
                <Table columns={columns} dataSource={toolList} />
            </Card>
            <CustomModal onConfirm={createToolMethod}></CustomModal>
        </div>
    );
};

export default ToolListPage;