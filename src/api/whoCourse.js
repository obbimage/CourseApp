import { instance } from "./instance";
const URL_WHO_COURSE = '/whoCourse';

export async function getWhoCourseByCourseId(courseId) {
    try {
        const response = await instance.get(`${URL_WHO_COURSE}/course/${courseId}`);
        return response;
    } catch (err) {
        console.log(err);
        if (err.response) {
            return err.response;
        }
        return null;
    }
}

export async function insertWhoCourses(courseId, WhoCourseList) {
    console.log('whoCourseList',WhoCourseList);
    try {
        const response = await instance.post(`${URL_WHO_COURSE}/insert/course/${courseId}`, WhoCourseList);
        return response;
    } catch (err) {
        console.log(err);
        if (err.response) {
            return err.response;
        }
        return null;
    }
}

export async function deleteWhoCourseById(whoCourseId){
    try{
        const response = await instance.post(`${URL_WHO_COURSE}/${whoCourseId}`);
        return response;
    }catch(err){
        console.log(err)
        if(err.response){
            return err.response;
        }
        return null;
    }
}