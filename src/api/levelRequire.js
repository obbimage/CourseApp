import { instance } from "./instance";

const URL_LEVEL_REQUIRE = '/levelRequire';
export async function getLevelRequireByCourseId(courseId) {
    try {
        const response = await instance.get(`${URL_LEVEL_REQUIRE}/course/${courseId}`);
        return response;
    } catch (err) {
        if (err.response)
            return err.response;
        return null;
    }
}

export async function insertLevelRequirements(courseId, levelRequireList) {
    try {
        const response = await instance.post(`${URL_LEVEL_REQUIRE}/course/${courseId}`, levelRequireList);
        return response;
    } catch (err) {
        console.log(err);
        if (err.response) {
            return err.response;
        }
        return null;
    }
}

export async function deleteLevelRequirementById(id) {
    try {
        const response = await instance.delete(`${URL_LEVEL_REQUIRE}/${id}`);
        return response;
    } catch (err) {
        if (err.response)
            return err.response;
        return null;
    }
}