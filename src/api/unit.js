import { handleApiRequest, instance } from "./instance";

const URL_UNIT = '/unit';

export async function insertUnits(courseId, units) {
    return handleApiRequest(async ()=>{
        return  await instance.post(`${URL_UNIT}/inserts/course/${courseId}`, units);
    })
}

export async function insertUnit(courseId,unit){
    console.log('newUnit',unit)
    return handleApiRequest(async ()=>{
        return await instance.post(`${URL_UNIT}/insert/course/${courseId}`,unit);
    })
}

export async function getUnitsByCourseId(courseId) {
    return handleApiRequest(async ()=>{
        return await instance.get(`${URL_UNIT}/course/${courseId}`);

    })
}


export async function deleteUnitById(unitId){
    return handleApiRequest(async ()=>{
        return await instance.delete(`${URL_UNIT}/${unitId}`);
    })
}