import axios from "axios";

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
        const token = localStorage.getItem("token");

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
