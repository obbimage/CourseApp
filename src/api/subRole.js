import { handleApiRequest, instance } from "./instance";

const URL_SUB_ROLE = 'subrole'
export  async function getSubRoleCourseByCourseId(roleId) {

    return handleApiRequest(async () => {
        return await instance.get(`${URL_SUB_ROLE}/role/${roleId}`);
    })
}