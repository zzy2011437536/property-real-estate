import request, { ResData } from "../../tools/request";

export enum ToolType {
  ElectricalMaintenance = 1, //电器维修
  PipelineMaintenance = 2, //管道维修
  WoodworkingMaintenance = 3, //木工维修
  PaintRepair = 4, //油漆维修
  FurnitureMaintenance = 5, //家具维修
  LightingMaintenance = 6, //灯具维修
}
export const ToolTypeMap = {
  [ToolType.ElectricalMaintenance]: '电器维修',
  [ToolType.PipelineMaintenance]: '管道维修',
  [ToolType.WoodworkingMaintenance]: '木工维修',
  [ToolType.PaintRepair]: '油漆维修',
  [ToolType.FurnitureMaintenance]: '家具维修',
  [ToolType.LightingMaintenance]: '灯具维修',
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

export const saveRate = async(data:any):Promise<ResData>=>{
  return request.post('/tool/saveRate',data)
}

export const changeState = async(data:any):Promise<ResData>=>{
  return request.post('/tool/changeState',data)
}