import { handleApiRequest, instance } from "./instance";

const URL_ORDETAIL = '/orderDetail'
export function getOrderDetailByUserId(userId){
    return handleApiRequest(async ()=>{
        return await instance.get(`${URL_ORDETAIL}/educator?user_id=${userId}`);
    })
}