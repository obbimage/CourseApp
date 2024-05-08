import { wait } from "@testing-library/user-event/dist/utils";
import { handleApiRequest, instance } from "./instance";

const URL_ROLE = "/role"
export async function getAllCourseRole() {
    return handleApiRequest(async () => {
        return await instance.get(`${URL_ROLE}`);
    });
};

// export async function getRoleCourseByCourseId(courseId){
//     return handleApiRequest(async ()=>{
//         return await instance.get(`${URL_ROLE}/course/${courseId}`);
//     });
// }

