import { useEffect, useState } from "react";
import { Button, Card, Form, Input, Space, Table, Select, message, Modal } from "antd";
import { ColumnProps } from "antd/lib/table";
import { getLocalStorage } from "../../tools/storage";
import { useNavigate } from "react-router-dom";
import { changePaymentStatus, getRoomList, getRoomListBySelf, Room, RoomStatus } from "../../services/room";
import { getUserInfo } from "../../services/member";
import InputModal from "../../components/InputModal";
import { any } from "prop-types";
const { Option } = Select;



const ProfileRoomPage: React.FC = () => {
    
    const columns: ColumnProps<Room>[] = [
        { title: "物业缴费单号", dataIndex: "propertyBillingNumber", align: 'center' },
        { title: "区", dataIndex: "zone", align: 'center' },
        { title: "房间号", dataIndex: "name", align: 'center' },
        { title: "占地面积", dataIndex: "area", align: 'center' },
        { title: "物业费缴费状态", dataIndex: "paymentStatus", align: 'center' },
        {
            title: "操作",
            render: (room: Room) => (
                <Space size='large'>
                    {room.paymentStatus==='未缴费'?<Button onClick={() => { setRoomId(room.id); setRoomInfo(room.area);showModal() }}>物业缴费</Button>:'-'}
                </Space>

            ),
            align: 'center'
        },
    ];
    const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [roomId, setRoomId] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0); // 保存计算后的总金额
    const showModal = () => {
        setVisible(true);
    };
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState<any>({})
    const [roomInfo, setRoomInfo] = useState(0)
    const init = async () => {
        const data = await getUserInfo()
        if (data.code !== 200) {
            message.error(data.message)
        } else {
            setUserInfo(data.data)
        }

    };
    useEffect(() => {
        init()
    }, [])

    const handleSearch = async () => {
        const { data } = await getRoomListBySelf()
        const rooms = data.map((item: any) => {
            return {
                ...item,
                paymentStatus: item.paymentStatus === 0 ? '未缴费' : '已缴费'
            }
        })
        setFilteredRooms(rooms)
    }
    useEffect(() => {
        handleSearch()
    }, [])
    const changePaymentStatusMethod = async (data: any) => {
        await changePaymentStatus({roomId})
    }
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
    return Number(amount * discountRate).toFixed(2);
  };
  const discountedPrice = getDiscountedPrice(userInfo.vipLevel, roomInfo*12);
    const CustomModal: React.FC<any> = ({ onConfirm }) => {
        const handleOk = async () => {
            await onConfirm();
            setVisible(false);
            await handleSearch()
            message.success('缴费成功')
        };

        const handleCancel = () => {
            setVisible(false);
        };

        return (
            <div>
                <Modal
                    title="缴费弹窗"
                    visible={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    okText="确认"
                    cancelText="取消"
                    okButtonProps={{ danger: true }}
                >
                    <p>{`尊贵的${userInfo.vipLevel}会员，折后价格${discountedPrice}，确认缴费吗？`}</p>
                </Modal>
            </div>
        );
    };
    return (
        <div>
            <Card size="small" title="房屋列表" style={{ width: '100%' }}>
                <Table columns={columns} dataSource={filteredRooms} />
            </Card>
            <CustomModal onConfirm={changePaymentStatusMethod} />
        </div>
    );
};

export default ProfileRoomPage;