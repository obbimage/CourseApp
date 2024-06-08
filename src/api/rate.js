import { handleApiRequest, instance } from "./instance";

const URL_RATE = '/rate';

export async function insertRate(courseId,rate) {
    return handleApiRequest(async () => {
        return await instance.post(`${URL_RATE}/course/${courseId}`,rate);
    })
};

export async function getRatesByCourseId(courseId){
    return handleApiRequest(async ()=>{
        return await instance.get(`${URL_RATE}/course/${courseId}`);
    })
};