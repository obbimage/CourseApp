import axios from "axios";
import { getStorageTokenUser } from "../util/localStorage";

const BASE_URL = "http://localhost:8080";

export const instance = axios.create({
    baseURL: BASE_URL,
    // timeout: 1000,
    // headers: {'Content-Type': 'json'}
});

// Thêm interceptor để gắn JWT vào các yêu cầu
instance.interceptors.request.use(
    config => {
        // Lấy token từ local storage hoặc bất kỳ nơi nào bạn lưu trữ nó
        // const token = localStorage.getItem("token");
        const token = getStorageTokenUser();
        // Nếu tồn tại token, thêm vào header Authorization
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export async function handleApiRequest(request) {
    try {
        const response = await request();
        return response;
    } catch (err) {
        console.log(err)
        if (err.response) {
            return err.response;
        }
        return null;
    }
}

export function handleApiResponse(response, onSuccess, onFailure, onComplete) {
    if (response && response.status === 200) {
        if (onSuccess) {
            const data = response.data.data;
            onSuccess(data); // goi ham neu thanh cong
        }
    } else {
        if (onFailure)
            onFailure(response); // goi ham khi that bai
    }
    if (onComplete) {
        onComplete();
    }
}