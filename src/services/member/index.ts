import urlConstants from "../../constants/urls"
import request, { ResData } from "../../tools/request"
import { getLocalStorage } from "../../tools/storage"

export enum Role {
    resident = 1,
    cleaning = 2,
    maintenance = 3,
    admin = 4,
  }

  export enum StatusType {
    ShutDown = -2, //封停
    applyReject = -1, // 审批拒绝
    normal = 0,
    applying = 1, // 审批中
    success = 2, // 审批通过,可正常使用
  }

export const RoleMap = new Map()
RoleMap.set(1, '业主')
RoleMap.set(2, '保洁人员')
RoleMap.set(3, '维修人员')
RoleMap.set(4, '管理员')

export const StatusMap = new Map()
StatusMap.set(-2, '账号封停')
StatusMap.set(-1, '审批拒绝')
StatusMap.set(1, '审批中')
StatusMap.set(2, '正常使用')

export const ButtonMap = new Map()
ButtonMap.set(-2, '账号解封')
ButtonMap.set(-1, '审批通过')
ButtonMap.set(1, '审批通过')
ButtonMap.set(2, '账号封停')

export const ChangeStatusMap = new Map()
ChangeStatusMap.set(-2, 2)
ChangeStatusMap.set(1, 2)
ChangeStatusMap.set(-1, 2)
ChangeStatusMap.set(2, -2)

export const ruleList = [
    { label: '业主', value: 1 },
    { label: '安保人员', value: 2 },
    { label: '维修人员', value: 3 },
    { label: '管理员', value: 4 },
];

export interface Member {
    id: number;
    userName: string;
    password:string;
    contactInformation: string;
    role: 1 | 2 | 3 | 4;
    createdAt: string;
    status: -2 | -1 | 1 | 2;
    ticket:string;
    rooms?:any
    roomList?:string[]
    vipLevel:string;
    subscriberNumber:string;
}

//获取用户详情
export  const getUserInfo = async (ticket?:string):Promise<ResData> => {
    return request.post('/user/getUserInfo', ticket?{ticket}:{ticket:getLocalStorage('userToken')})
}
// 获取列表
export  const getUserList = async (req:any):Promise<ResData> => {
    return request.post('/user/getUserList',req)
}
//保存用户信息
export  const saveUserInfo = async (req:any):Promise<ResData> => {
    return request.post('/user/saveUserInfo',req)
}
//改变用户状态
export const changeUserStatus = async(req:any):Promise<ResData>=>{
    return request.post('/user/changeUserStatus',req)
}

export const updateVip = async():Promise<ResData>=>{
    return request.post('/user/updateVip')
}