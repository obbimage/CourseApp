import { handleApiRequest, instance } from "./instance";

const URL_LANGUAGE = '/language';

export function getAllLanguage() {
    return handleApiRequest(async () => {
        return await instance.get(`${URL_LANGUAGE}`);
    })
}