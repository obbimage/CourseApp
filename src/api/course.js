import { wait } from "@testing-library/user-event/dist/utils";
import { instance } from "./instance";

const URL_COURSE = '/course';
export async function insertCourse(idUser, course) {

    try {
        const response = await instance.post(URL_COURSE, {
            ...course,
            user: {
                id: idUser
            }
        });
        return response;
    } catch (err) {
        if (err.response) {
            return { status: err.response.status }
        }
        return null;
    }
}


export async function insertStudyWillLearnFromCourse(courseId, studentWillLearns){
    try{
        const request = studentWillLearns.map((studentWillLearn,index)=>{
            return{
                content: studentWillLearn,
                // course:{
                //     id:courseId
                // }
            }
        });
        console.log(request)
        const response = instance.post(`${URL_COURSE}/${courseId}/insert/studyWillLearn`,request);
        return response;
    }catch(err){
        console.error(err);
        if(err.response){
            return{status:err.response.status};
        }
        return null;
    }
}
export async function getCourseByUserId(userId) {
    try {
        const response = await instance.get(`${URL_COURSE}/user/${userId}`);
        return response;
    } catch (err) {
        if (err.response) {
            return { status: err.response.status };
        }
        return null;
    }
}
export async function getCourseById(id) {
    try {
        const response = await instance.get(`${URL_COURSE}/${id}`);
        return response;
    } catch (err) {
        if (err.response) {
            return { status: err.response.status }
        }
        return null;
    }
}