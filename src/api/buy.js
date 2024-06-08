import { handleApiRequest, instance } from "./instance";

const URL_BUY = '/buy'

export async function insertBuy(studentId, courseId){

return handleApiRequest(async ()=>{
    return await instance.post(`${URL_BUY}/student/${studentId}/course/${courseId}`);
})
}