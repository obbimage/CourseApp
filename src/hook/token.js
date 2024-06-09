import { useEffect, useState } from "react";

const TOKEN = 'token';

export default function useToken() {

    const [token, setToken] = useState(null);

    useEffect(() => {
        const tokenString = localStorage.getItem(TOKEN);
        const userToken = tokenString;
        setToken(userToken);
    }, []);

    const saveToken = (userToken) => {
        if (userToken === "") {
            localStorage.removeItem(TOKEN);
        }
        // chuyển userToken về kiểu String trước khi lưu
        localStorage.setItem(TOKEN, userToken);
        setToken(userToken);
    }

    return {
        token,
        setToken: saveToken
    }
}

export function clearToken() {
    localStorage.clear(TOKEN);
}