import { instance } from "./instance";

const URL_STUDY_WILL_LEARN = 'studentWillLearn';

export async function insertStudyWillLearn(courseId, courseList) {
    try {
        const response = await instance.post(`${URL_STUDY_WILL_LEARN}/course/${courseId}`, courseList);
        return response;
    } catch (err) {
        if (err.response) {
            return err.response;
        }
        return null;
    }
}

export async function getStudyWillLearnByCourseId(courseId) {
    try {
        const response = await instance.get(`${URL_STUDY_WILL_LEARN}/course/${courseId}`);
        return response;
    } catch (err) {
        console.log(err)
        if (err.response)
            return err.response;
        return null;
    }
}

export async function deleteStudyWillLearnById(id) {
    try {
        const response = instance.delete(`${URL_STUDY_WILL_LEARN}/${id}`);
        return response;
    } catch (err) {
        console.log(err)
        if (err.response)
            return err.response;
        return null;
    }
}