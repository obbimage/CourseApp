import { handleApiRequest, instance } from "./instance";

const URL_SECTION = "/section";

export async function insertSection(unitId, sectionList) {
    return handleApiRequest(async () => {
        return await instance.post(`${URL_SECTION}/inserts/unit/${unitId}`, sectionList)
    });
}

export async function getSectionByUnitId(unitId) {
    return handleApiRequest(async () => {
        return await instance.get(`${URL_SECTION}/unit/${unitId}`)
    })
};