import { handleApiRequest, instance } from "../instance"

const URL_PAY = '/vnpay'
export function getUrlVnpay(returnUrl,userId, courseId){
    return handleApiRequest(async ()=>{
        return await instance.get(`${URL_PAY}/createPayment?user_id=${userId}&course_id=${courseId}&return_url=${returnUrl}`);
    });
}

export function confirmVnPay(url){
    console.log('url',url)
    return handleApiRequest(async ()=>{
        return await instance.get(`${url}`);
    })
}