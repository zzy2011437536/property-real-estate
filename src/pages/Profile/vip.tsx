import { useCallback, useEffect, useState } from "react";
import { Form, Input, Button, message, Card, Radio, Modal, Select,Tooltip ,Popover} from "antd";
import { EyeInvisibleOutlined, EyeOutlined, EyeTwoTone ,QuestionCircleOutlined,InfoCircleOutlined} from "@ant-design/icons";
import { ButtonMap, ChangeStatusMap, changeUserStatus, getUserInfo, Member, RoleMap, ruleList, saveUserInfo, StatusMap, updateVip } from "../../services/member";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getLocalStorage } from "../../tools/storage";
interface Props {
    onConfirm: () => void;
}

const VipPage = () => {
    const navigate = useNavigate();
    const [personalInfo, setPersonalInfo] = useState<Member>({} as Member);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [vipLevelGap, changeVipLevelGap] = useState(999);
    const [form] = Form.useForm();
    const location = useLocation()
    const init = async () => {
        const data = await getUserInfo(getLocalStorage('userToken'))
        const roleData = await getUserInfo(getLocalStorage('userToken'))
        if (data.code && roleData.code !== 200) {
            message.error(data.message)
        } else {
            const roomList = data.data.rooms.map((item: { zone: string; name: string; }) => `${item.zone}-${item.name}`)
            setPersonalInfo({
                ...data.data,
                roomList
            })
        }
    }
    const updateVipLevel = async ()=>{
        const data = await updateVip()
        if(data.code!==200){
            message.error('升级失败')
        }else{
            message.success('升级成功')
        }
        await init()
    }
    useEffect(() => {
        
        init()
        if (personalInfo.vipLevel === 'v1') {
            changeVipLevelGap(3 - (personalInfo.roomList?.length || 0))
        } else if (personalInfo.vipLevel === 'v2') {
            changeVipLevelGap(5 - (personalInfo.roomList?.length || 0))
        }
        console.log(123456,vipLevelGap)
    }, [personalInfo])

    return (
        <>
            <Card size="small" title="会员中心" style={{ width: '100%' }}>
                <Form
                    form={form}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={personalInfo}
                >
                    <Form.Item label="用户名" >
                        <Input disabled value={personalInfo.userName} />
                    </Form.Item>
                    <Form.Item label={`拥有房屋数量${personalInfo.roomList?.length}套`}>
                        <Select
                            mode="multiple"
                            disabled
                            style={{ width: '100%' }}
                            value={personalInfo.roomList}
                        />
                    </Form.Item>
                    <Form.Item label="当前vip等级" >
                        <Input disabled value={personalInfo.vipLevel} />
                    </Form.Item>
                    <Form.Item label='升级条件'>
                        {personalInfo.vipLevel === 'v3' ? (
                            <Input disabled value={'已满级，无需再升级'}       suffix={
                                <Tooltip title="升级条件:v1升级需要名下绑定3套房产,v2升级需要名下绑定5套房产">
                                  <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                              }/>
                        ) : (
                            <>
                                <Input disabled value={`距离下个级别，还需要名下绑定${vipLevelGap}套房产`} suffix={
                                <Tooltip title="升级条件:v1升级需要名下绑定3套房产,v2升级需要名下绑定5套房产">
                                  <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                              }/>
                                {vipLevelGap === 0 && (
                                    <Button onClick={updateVipLevel}>升级</Button>
                                )}
                            </>
                        )}
                    </Form.Item>
                    <Form.Item label="会员福利" >
                        <Input disabled value='在物业缴费,维修费等其他消费活动时,v2会员享受9折福利,v3会员享受8折福利' />
                    </Form.Item>
                </Form>
            </Card>
        </>

    );
};

export default VipPage;