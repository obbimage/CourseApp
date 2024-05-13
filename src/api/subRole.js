import { handleApiRequest, instance } from "./instance";

const URL_SUB_ROLE = 'subrole'
export  async function getSubRoleCourseByCourseId(roleId) {

    return handleApiRequest(async () => {
        return await instance.get(`${URL_SUB_ROLE}/role/${roleId}`);
    })
}

export async function insertSubRole(roleId,subRole){
    return handleApiRequest(async()=>{
        return await instance.post(`${URL_SUB_ROLE}/insert/role/${roleId}`,subRole);
    })
}