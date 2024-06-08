import { handleApiRequest, instance } from "./instance";

const URL_EDUCATOR  = '/educator'
export function getAllEducator(){
    return handleApiRequest(async ()=>{

        return await instance.get(URL_EDUCATOR);
    });
}