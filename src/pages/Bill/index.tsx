import { useEffect, useState } from "react";
import { Button, Card, Form, Input, Space, Table, Select, message, Rate } from "antd";
import { ColumnProps } from "antd/lib/table";
import { ButtonMap, getUserInfo, getUserList, Member, RoleMap, StatusMap } from "../../services/member";
import { getLocalStorage } from "../../tools/storage";
import { useNavigate } from "react-router-dom";
import { BillTypeMap, getBillList } from "../../services/bill";
const { Option } = Select;

const columns: ColumnProps<Member>[] = [
    { title: "业主用户名", dataIndex: "userName", align: 'center' },
    { title: "业主联系方式", dataIndex: "contactInformation", align: 'center' },
    { title: "服务人员用户名", dataIndex: "tollGatherer", align: 'center' },
    { title: "服务人员联系方式", dataIndex: "tollGathererContactInformation", align: 'center' },
    { title: "房间", dataIndex: "roomName", align: 'center' },
    { title: "服务类型", dataIndex: "type", align: 'center' },
    { title: "金额", dataIndex: "amount", align: 'center' },
    { title: "服务时间", dataIndex: "createdAt", align: 'center' },
    {
        title: "评分",
        render: (item: any) => (
            <Space size='large'>
                <Rate key={item.id} defaultValue={item.evaluation} disabled  />
            </Space>
        ),
        align: 'center'
    },
];

const BillPage: React.FC = () => {
    const [billList, setBillList] = useState([]);
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

    const handleSearch = async (e: any) => {
        const { data } = await getBillList()
        const billList = data.map((item: any) => {
            return {
                ...item,
                userName: item.user.userName,
                contactInformation: item.user.contactInformation,
                roomName: `${item.room.zone}-${item.room.name}`,
                type: BillTypeMap[item.type as 1 | 2 |3],
                tollGatherer: item.tollGatherer.userName,
                tollGathererContactInformation: item.tollGatherer.contactInformation
            }
        })
        console.log(123123123,billList,e)
        if(e.tollGatherer||e.type){

            if(e.tollGatherer&&!e.type){
                const newBillList = billList.filter((item:any)=>{
                    return item.tollGatherer.includes(e.tollGatherer)
                })
                setBillList(newBillList)
            }
            if(e.tollGatherer &&e.type){
                const newBillList = billList.filter((item:any)=>{
                    return item.type===e.type
                })
                setBillList(newBillList)
            }
            if(!e.tollGatherer &&e.type){
                const newBillList = billList.filter((item:any)=>{
                    return item.tollGatherer.includes(e.tollGatherer)&&item.type===e.type
                })
                setBillList(newBillList)
            }

        }else{
            setBillList(billList)
        }
    }
    useEffect(() => {
        handleSearch({})
    }, [])
    return (
        <div>
            <Card size="small" title="筛选项" style={{ width: '100%' }}>
                <Form form={form} onFinish={handleSearch} layout="inline" >
                    <Form.Item name='tollGatherer' label="服务人员用户名" >
                        <Input
                            placeholder="请输入服务人员用户名"
                        />
                    </Form.Item>
                    <Form.Item name="type" label="服务类型" style={{marginLeft:50}}>
                        <Select placeholder="请选择服务类型"  allowClear={true}>
                            <Option value={"家政服务"}>家政服务</Option>
                            <Option value={'维修服务'}>维修服务</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item style={{marginLeft:50}}>
                        <Button type="primary" htmlType="submit">
                            查询
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            <Card size="small" title="账单列表" style={{ width: '100%', marginTop: '20px' }}>
                <Table columns={columns} dataSource={billList}/>
            </Card>



        </div>
    );
};

export default BillPage;