import request, { ResData } from "../../tools/request";

export enum EnvType {
    local = 1, //局部
    whole = 2, //整体
  }

  export const EnvTypeMap = {
    [EnvType.local]: '局部保洁',
    [EnvType.whole]: '全局保洁',
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