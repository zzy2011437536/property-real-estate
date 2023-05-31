import request, { ResData } from "../../tools/request";

export const RoomStatus = {
    0:'出售中',
    1:'已售出'
}

export interface Room {
    id: number;
    name: string;
    zone:'A'|'B'|'C'|'D'
    status: 0|1
    area:number
    description: string;
    salePrice: number;
    createdAt: string;
    paymentStatus:0|1|string
}

export const getRoomList = async(data:any):Promise<ResData>=>{
    return request.post('/room/getRoomList',data)
}

export const getRoomListBySelf = async():Promise<ResData>=>{
    return request.post('/room/getRoomListBySelf')
}

export const getRoomInfo = async(data:any):Promise<ResData>=>{
    return request.post('/room/getRoomInfo',data)
}

export const getUserListFormAddUserInRoom = async(data:any):Promise<ResData>=>{
    return request.post('/room/getUserListFormAddUserInRoom',data)
}

export const addUserInRoom = async(data:any):Promise<ResData>=>{
    return request.post('/room/addUserInRoom',data)
}

export const delUserInRoom = async(data:any):Promise<ResData>=>{
    return request.post('/room/delUserInRoom',data)
}

export const changePaymentStatus = async(data:any):Promise<ResData>=>{
    return request.post('/room/changePaymentStatus',data)
}
