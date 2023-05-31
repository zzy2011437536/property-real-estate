import request, { ResData } from "../../tools/request";
import { Member } from "../member";

export const ParkingStatus = {
    0:'出售中',
    1:'已售出'
}

export interface Parking {
    id: number;
    name: string;
    zone:'A'|'B'|'C'|'D'|'E'|'F'|'G'
    status: 0|1
    createdAt: string;
    user:Member
}

export const getParkingList = async(data:any):Promise<ResData>=>{
    return request.post('/parking/getList',data)
}

export const getParkingInfo = async(data:{id:number}):Promise<ResData>=>{
    return request.post('/parking/getInfo',data)
}

export const bindUserInParking = async(data:{id:number,userId:number}):Promise<ResData>=>{
    return request.post('/parking/bindUserInParking',data)
}


