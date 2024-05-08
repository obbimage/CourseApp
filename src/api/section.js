import { handleApiRequest, instance } from "./instance";

const URL_SECTION = "/section";

export async function insertSections(unitId, sectionList) {
    return handleApiRequest(async () => {
        return await instance.post(`${URL_SECTION}/inserts/unit/${unitId}`, sectionList)
    });
}

export async function insertSection(unitId, section) {
    return handleApiRequest(async () => {
        return await instance.post(`${URL_SECTION}/insert/unit/${unitId}`, section);
    });
}
export async function getSectionByUnitId(unitId) {
    return handleApiRequest(async () => {
        return await instance.get(`${URL_SECTION}/unit/${unitId}`)
    });
};

export async function deleteSectionById(sectionId) {
    return handleApiRequest(async () => {
        return await instance.delete(`${URL_SECTION}/${sectionId}`);
    });
}

export async function insertVideoSection(sectionId,fileVideo){
    const formData = new FormData();
    formData.append('file',fileVideo);
    return handleApiRequest(async () => {
        return await instance.post(`${URL_SECTION}/${sectionId}/insert/video`,formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    });
}


