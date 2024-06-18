import { handleApiRequest, instance } from "./instance";

const URL_CHAT = "/chat";

export async function insertChat(courseId, chat) {
  return handleApiRequest(async () => {
    return await instance.post(`${URL_CHAT}/course/${courseId}`, chat);
  });
}

export async function getChatsByCourseId(courseId) {
  return handleApiRequest(async () => {
    return await instance.get(`${URL_CHAT}/course/${courseId}`);
  });
}
