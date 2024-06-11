import { useEffect, useState } from "react";
import { isObjEmpty } from "../util/object";
import { getStorageUser, removeStorageTokenUser, removeStorageUser, setStorageUser } from "../util/localStorage";
import useToken from "./token";

export default function useCurrentUser() {
    const [currentUser, setCurrentUser] = useState({});
    const { token, setToken } = useToken();

    useEffect(() => {
        if (isObjEmpty(currentUser) || currentUser) {
            removeStorageUser();
            // removeStorageTokenUser();
        } else {
            setStorageUser(currentUser);
        }
    }, [currentUser]);

    const saveCurrentUser = (user, token) => {
        setCurrentUser(user);
        if (token) {
            setToken(token);
        }
    }
    return {
        currentUser,
        setCurrentUser: saveCurrentUser
    }

}