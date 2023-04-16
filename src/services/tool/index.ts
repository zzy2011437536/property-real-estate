import request, { ResData } from "../../tools/request";

export enum ToolType {
    hydropower = 1, //水电维修
    householdAppliance = 2, //家电维修
    indoor = 3, //室内维修
  }
  export const ToolTypeMap = {
    [ToolType.hydropower]: '水电维修',
    [ToolType.householdAppliance]: '家电维修',
    [ToolType.indoor]: '室内维修',
  };

export const createTool = async(data:any):Promise<ResData>=>{
    return request.post('/tool/create',data)
}

export const getList = async():Promise<ResData>=>{
    return request.post('/tool/getList')
}

export const changeRate = async(data:any):Promise<ResData>=>{
    return request.post('/tool/changeRate',data)
}