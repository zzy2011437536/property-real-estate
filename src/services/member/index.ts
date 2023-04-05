import urlConstants from "../../constants/urls"
import request, { ResData } from "../../tools/request"

export  const getRole = async (ticket:string ):Promise<ResData> => {
    return request.post('/user/getUserInfo', ticket,{headers:{
        ticket,
    }})
}

export  const getUserList = async (req:any,ticket:string):Promise<ResData> => {
    return request.post('/user/getUserList',req, {headers:{
        ticket,
    }})
}