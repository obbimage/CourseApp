import { wait } from "@testing-library/user-event/dist/utils";
import { instance } from "./instance";

const URL_ROLE = "/role"
export async function getAllCourseRole() {
    try {
        const response = await instance.get(URL_ROLE);
        return response;
    } catch (err) {
        if (err.response) {
            return { status: err.response.status }
        }
        return null;
    }
}

