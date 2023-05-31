import request, { ResData } from "../../tools/request";

export enum EnvType {
  HouseholdCleaning = 1, //家庭清洁服务
  CookingService = 2, //烹饪服务
  HomeMaintenanceService = 3, //家居维护服务
  PurchasingService = 4, //代购服务
  BabysittingService = 5, //保姆服务
  PetCareService = 6, //宠物照顾服务
}

  export const EnvTypeMap = {
    [EnvType.HouseholdCleaning]: '家庭清洁服务',
    [EnvType.CookingService]: '烹饪服务',
    [EnvType.HomeMaintenanceService]: '家居维护服务',
    [EnvType.PurchasingService]: '代购服务',
    [EnvType.BabysittingService]: '保姆服务',
    [EnvType.PetCareService]: '宠物照顾服务',
  };

export const createEnv = async(data:any):Promise<ResData>=>{
    return request.post('/env/create',data)
}

export const getList = async():Promise<ResData>=>{
    return request.post('/env/getList')
}

export const changeRate = async(data:any):Promise<ResData>=>{
    return request.post('/env/changeRate',data)
}