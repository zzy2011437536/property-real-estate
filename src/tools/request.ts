import axios from 'axios'
import urlConstants from '../constants/urls';
export interface ResData{
    code:number,
    message:string;
    data:any
}
const request = axios.create({
    baseURL: urlConstants.baseURL,
    timeout: 3000,
    // headers:''
})

request.interceptors.response.use((res: { data: any; }) => res.data, (err: { config: any; }) => {
    let config = err.config
    if (!config) return Promise.reject(err)

    config.__retryCount = config.__retryCount || 0

    if (config.__retryCount >= 10) {
        return Promise.reject(err)
    }

    config.__retryCount += 1
    console.log(`[请求超时 重新请求 第${config.__retryCount}次] @${config.url}`)

    let backoff = new Promise<void>(resolve => {
        setTimeout(() => {
            resolve()
        }, 3000)
    })

    return backoff.then(() => request(config))
})

export default request