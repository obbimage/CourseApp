import { useState } from "react";

const TOKEN = 'token';

export default function useToken() {

    const getToken = () => {
        const tokenString = localStorage.getItem(TOKEN);
        const userToken = tokenString;
        /*UserToken?.Token
            nếu userToken rỗng thì trả về null hoặc underfind
            nếu không rỗng thì trả về thuộc tính token
    
        */
        return userToken;
    }

    const [token, setToken] = useState(getToken());

    const saveToken = (userToken) => {
        if (userToken === "") {
            localStorage.removeItem(TOKEN);
        }
        // chuyển userToken về kiểu String trước khi lưu
        localStorage.setItem(TOKEN, userToken);
        setToken(userToken);
    }

    return {
        setToken: saveToken,
        token
    }
}

export function clearToken() {
    localStorage.clear(TOKEN);
}