import { wait } from "@testing-library/user-event/dist/utils";
import { handleApiRequest, instance } from "./instance";

const URL_ROLE = "/role"
export async function getAllCourseRole() {
    return handleApiRequest(async () => {
        return await instance.get(`${URL_ROLE}`);
    });
};


export async function getCourseRoleById(roleId) {
    return handleApiRequest(async () => {
        return await instance.get(`${URL_ROLE}/${roleId}`);
    })
};

export async function insertCourseRole(role) {
    return handleApiRequest(async () => {
        return await instance.post(`${URL_ROLE}`, role);
    })
}

