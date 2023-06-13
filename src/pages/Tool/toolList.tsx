import { useEffect, useState } from "react";
import { Button, Card, Form, Input, Space, Table, Select, message, Rate, Modal, Radio } from "antd";
import { ColumnProps } from "antd/lib/table";
import { ButtonMap, getUserInfo, getUserList, Member, RoleMap, StatusMap } from "../../services/member";
import { getLocalStorage } from "../../tools/storage";
import { useNavigate } from "react-router-dom";
import { ToolType, ToolTypeMap, changeRate, changeState, getList, saveRate } from "../../services/tool";
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
    const [bindUserModalVisible, setBindUserModalVisible] = useState(false); // 控制绑定用户弹窗的显示与隐藏
    const [form1] = Form.useForm();
    const [selectedRowId, setSelectedRowId] = useState<number>(0); // 存储选中行的 ID
    const [rateInfo,setRateInfo] = useState({} as any)
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
                    type: ToolTypeMap[item.type as 1 | 2 | 3 | 4 | 5 | 6],
                    tollGatherer: item.tollGatherer.userName,
                    tollGathererContactInformation: item.tollGatherer.contactInformation
                }
            })
            setToolList(toolList)
            setRole(userInfo.data.role)
            console.log(11111111,role)
        }
    };
    useEffect(() => {
        init()
    }, [])
    const showModal = () => {
        setVisible(true);
    };
    const columns: ColumnProps<Member>[] = [
        { title: "工单单号", dataIndex: "billNumber", align: 'center' },
        { title: "业主用户名", dataIndex: "userName", align: 'center' },
        { title: "业主联系方式", dataIndex: "contactInformation", align: 'center' },
        { title: "维修工人用户名", dataIndex: "tollGatherer", align: 'center' },
        { title: "维修工人联系方式", dataIndex: "tollGathererContactInformation", align: 'center' },
        { title: "房间", dataIndex: "roomName", align: 'center' },
        { title: "维修类型", dataIndex: "type", align: 'center' },
        { title: "描述", dataIndex: "description", align: 'center' },
        { title: "金额", dataIndex: "amount", align: 'center' },
        { title: "维修时间", dataIndex: "createdAt", align: 'center' },
        {
            title: "完成状态",
            render: (item: any) => (
                <Space size='large'>
                    
                    <Radio.Group value={item.state} disabled={role!==(3||4)} onChange = {(e)=>{
                            const updateStatus = async () => {
                                try {
                                  await changeState({
                                    id:+item.id,
                                    state: e.target.value
                                  }); // 假设updateToolStatus为更新工单状态的异步函数
                                  message.success('状态更新成功');
                                  init(); // 重新获取工单列表数据
                                } catch (error) {
                                  message.error('状态更新失败');
                                }
                              };
                          
                              updateStatus();
                    }}>
      <Radio value={0}>未完成</Radio>
      <Radio value={1}>已完成</Radio>
    </Radio.Group>
                </Space>
            ),
            align: 'center'
        },
        {
            title: "评价",
            render: (item: any) => (
                <Space size='large'>
                    
                    <Button type="primary" onClick={() => showBindUserModal(item)}>评价</Button>
                    
                    {/* <Rate key={item.id} defaultValue={item.evaluation} disabled={item.evaluation > 0 || role !== 1 || disabledIndexes.includes(item.id)} onChange={(e) => { setId(item.id); setRating(e); showModal() }} /> */}
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
    const getRateInfoByToolId = async () => {
        if(selectedRowId){
            const rateInfo = toolList.filter((item:any)=>item.id===selectedRowId)
            setRateInfo(rateInfo[0])
        }
    }

    useEffect(() => {      
        getRateInfoByToolId();
      }, [selectedRowId]);

      useEffect(() => {
        form1.setFieldsValue(rateInfo);
      }, [rateInfo]);
    const createToolMethod = async () => {
        const data = await changeRate({
            id,
            rate: rating
        })
        setDisabledIndexes([...disabledIndexes, id])
        setId(0)
        setRating(0)
    }
    const handleCancel = () => {
        // 关闭绑定用户弹窗
        setBindUserModalVisible(false);
    };
    const showBindUserModal = async (tool: any) => {
        // 设置选中行的 ID
        setSelectedRowId(tool.id);
        const rateInfoList = toolList.filter((item:any)=>item.id===tool.id)
        setRateInfo(rateInfoList[0])
        console.log(1234567890,rateInfo)
        // 打开绑定用户弹窗，并进行相关处理
        // await getUserInfoByParkingId()
        setBindUserModalVisible(true);
        // 其他处理逻辑，例如根据 parking 进行数据准备等
    };
    const handleBindUser = async () => {
        const formData = form1.getFieldsValue();
        console.log('data123123',formData);
        const data = await saveRate({
            id:selectedRowId,
            ...formData
        })
        if(data.code!==200){
            message.error('评价失败')
        }
        message.success('评价成功')
        // 关闭绑定用户弹窗
        setRateInfo({
            evaluation:0,
            content:''
        })
        setBindUserModalVisible(false);
    };
    const handleSearch = (e: any) => {
        if(!e.userName&&!e.tollGatherer&&!e.state&&!e.billNumber){
            init()
        }else{
            const newToolList = toolList.filter((item: any) => {
                let isMatched = true;
            
                if (e.userName) {
                  isMatched = isMatched && item.userName.includes(e.userName);
                }
                if (e.tollGatherer) {
                  isMatched = isMatched && item.tollGatherer.includes(e.tollGatherer);
                }
                if (e.state) {
                  isMatched = isMatched && item.state === e.state;
                }
                if (e.billNumber) {
                    isMatched = isMatched && item.billNumber === e.billNumber;
                  }
            
                return isMatched;
              });
            
              setToolList(newToolList);
        }

      }
    return (
        <div>
                        <Card size="small" title="筛选项" style={{ width: '100%' }}>
                <Form onFinish={handleSearch} layout="inline" >
                <Form.Item name='billNumber' label="工单编号" >
                        <Input
                            placeholder="请输入工单编号"
                        />
                    </Form.Item>
                    <Form.Item name='userName' label="业主用户名" >
                        <Input
                            placeholder="请输入业主用户名"
                        />
                    </Form.Item>
                    <Form.Item name='tollGatherer' label="维修人员用户名" >
                        <Input
                            placeholder="请输入维修人员用户名"
                        />
                    </Form.Item>
                    <Form.Item name="state" label="状态" style={{marginLeft:30}}>
                        <Select placeholder="请选择状态" allowClear={true}>
                            <Option value={0}>未完成</Option>
                            <Option value={1}>已完成</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item style={{marginLeft:30}}>
                        <Button type="primary" htmlType="submit">
                            查询
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            <Card size="small" title="维修工单列表" style={{ width: '100%', marginTop: '20px' }}>
                <Table columns={columns} dataSource={toolList} />
            </Card>
            <CustomModal onConfirm={createToolMethod}></CustomModal>
            {/* 绑定用户弹窗 */}
            <Modal
                visible={bindUserModalVisible}
                title="评分"
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
                    <Form.Item label='评分' name="evaluation">
                    <Rate  defaultValue={rateInfo.evaluation}  /> 
                    </Form.Item>
                    <Form.Item label='评价' name="content">
                    <Input value={rateInfo.content} placeholder="请输入评价"/> 
                    </Form.Item>

                </Form>
            </Modal>
        </div>
    );
};

export default ToolListPage;