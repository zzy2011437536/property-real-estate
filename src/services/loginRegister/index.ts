import urlConstants from "../../constants/urls";
import request, { ResData } from "../../tools/request";
interface loginObject {
    userName: string,
    password: string
}

interface RegisterObject {
    userName: string,
    contactInformation:number,
    password: string,
    role:1|2|3
}
export  const doLogin = async (data: loginObject):Promise<ResData> => {
    return request.post(urlConstants.login, data)
}

export  const doRegister = async (data: RegisterObject) : Promise<ResData>=>{
    return request.post(urlConstants.register, data)
}