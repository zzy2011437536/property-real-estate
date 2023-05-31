import request, { ResData } from "../../tools/request";

export enum BillType {
    tool = 1, //维修
    env = 2, //保洁
    parkingCharge = 3, //停车收费
  }
export const BillTypeMap = {
    [BillType.tool]: '维修服务',
    [BillType.env]: '家政服务',
    [BillType.parkingCharge]: '停车服务',
  };
export const getBillList = async():Promise<ResData>=>{
    return request.post('/bill/getList')
}