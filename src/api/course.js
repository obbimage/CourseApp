import { wait } from "@testing-library/user-event/dist/utils";
import { handleApiRequest, instance } from "./instance";

const URL_COURSE = '/course';
export async function insertCourse(userId, course) {
    return handleApiRequest(async ()=>{
        return await instance.post(`${URL_COURSE}/insert/user/${userId}`,course);
    });
};


// export async function insertStudyWillLearnFromCourse(courseId, studentWillLearns){
//     try{
//         const request = studentWillLearns.map((studentWillLearn,index)=>{
//             return{
//                 content: studentWillLearn,
//                 // course:{
//                 //     id:courseId
//                 // }
//             }
//         });
//         console.log(request)
//         const response = instance.post(`${URL_COURSE}/${courseId}/insert/studyWillLearn`,request);
//         return response;
//     }catch(err){
//         console.error(err);
//         if(err.response){
//             return{status:err.response.status};
//         }
//         return null;
//     }
// }

export async function insertImgCourse(courseId, fileImg){
    let formData = new FormData();
    formData.append('file',fileImg)
    return handleApiRequest(async ()=>{
        return await instance.post(`${URL_COURSE}/${courseId}/insert/img`,formData);
    })
}

export async function insertClipDemoCourse(courseId,videoFile){
    let formData = new FormData();
    formData.append('file',videoFile);
    return handleApiRequest(async ()=>{
        return await instance.post(`${URL_COURSE}/${courseId}/insert/clipDemo`,formData);
    })
}

export async function getCourseByUserId(userId) {
    return handleApiRequest(async ()=>{
        return await instance.get(`${URL_COURSE}/user/${userId}`);
    })
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

export async function deleteCourseById(courseId){
    return handleApiRequest(async ()=>{
        return await instance.delete(`${URL_COURSE}/${courseId}`);
    })
}