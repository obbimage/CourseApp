import { wait } from "@testing-library/user-event/dist/utils";
import { handleApiRequest, instance } from "./instance";

const URL_COURSE = "/course";
export async function insertCourse(userId, course) {
  return handleApiRequest(async () => {
    return await instance.post(`${URL_COURSE}/insert/user/${userId}`, course);
  });
}

export async function insertImgCourse(courseId, fileImg) {
  let formData = new FormData();
  formData.append("file", fileImg);
  return handleApiRequest(async () => {
    return await instance.post(
      `${URL_COURSE}/${courseId}/insert/img`,
      formData
    );
  });
}

export async function insertClipDemoCourse(courseId, videoFile) {
  let formData = new FormData();
  formData.append("file", videoFile);
  return handleApiRequest(async () => {
    return await instance.post(
      `${URL_COURSE}/${courseId}/insert/clipDemo`,
      formData
    );
  });
}

export async function getCourseByUserId(userId) {
  return handleApiRequest(async () => {
    return await instance.get(`${URL_COURSE}/user/${userId}`);
  });
}
export async function getCourseById(id) {
  try {
    const response = await instance.get(`${URL_COURSE}/${id}`);
    return response;
  } catch (err) {
    if (err.response) {
      return { status: err.response.status };
    }
    return null;
  }
}

export async function deleteCourseById(courseId) {
  return handleApiRequest(async () => {
    return await instance.delete(`${URL_COURSE}/${courseId}`);
  });
}

export async function getAllCourseToPage(pageNumber, pageSize) {
  return handleApiRequest(async () => {
    return await instance.get(`${URL_COURSE}/page/${pageNumber}/${pageSize}`);
  });
}

export async function getAllCourseNew(pageNumber, pageSize) {
  return handleApiRequest(async () => {
    return await instance.get(
      `${URL_COURSE}/asc/dateUpload/page/${pageNumber}/${pageSize}`
    );
  });
}

export async function findAllCourseByName(courseName, pageNumber, pageSize) {
  return handleApiRequest(async () => {
    return await instance.get(
      `${URL_COURSE}/search/name/${courseName}/page/${pageNumber}/${pageSize}`
    );
  });
}

export async function getAllcourseBuy() {
  return handleApiRequest(async () => {
    return await instance.get(`${URL_COURSE}/buy`);
  });
}

export async function isBuyCourse(courseId, userId) {
  return handleApiRequest(async () => {
    return await instance.get(
      `${URL_COURSE}/buying/course/${courseId}/user/${userId}`
    );
  });
}
export async function getCourseFromBuy(courseId) {
  return handleApiRequest(async () => {
    return await instance.get(`${URL_COURSE}/${courseId}/buy`);
  });
}

export async function setCompleteCourse(courseId, complete) {
  return handleApiRequest(async () => {
    return await instance.post(`${URL_COURSE}/${courseId}/${complete}`);
  });
}

export async function setConfirmCourse(courseId, confirm) {
  return handleApiRequest(async () => {
    return await instance.put(
      `${URL_COURSE}/confirm?course_id=${courseId}&confirm=${confirm}`
    );
  });
}
export async function getCoursesByComplete(complete) {
  return handleApiRequest(async () => {
    return await instance.post(`${URL_COURSE}/complete/${complete}`);
  });
}

export async function getCoursesByConfirm(confirm) {
  return handleApiRequest(async () => {
    return await instance.get(`${URL_COURSE}/confirm/${confirm}`);
  });
}
