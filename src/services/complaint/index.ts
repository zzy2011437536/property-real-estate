import request, { ResData } from "../../tools/request";

export const create = async(data:any):Promise<ResData>=>{
    return request.post('/complaint/create',data)
}
export const getList = async():Promise<ResData>=>{
    return request.post('/complaint/getList')
}