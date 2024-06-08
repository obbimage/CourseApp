import { useEffect, useState } from "react";
import { isObjEmpty } from "../util/object";
import { getStorageUser, removeStorageTokenUser, removeStorageUser, setStorageUser } from "../util/localStorage";

export default function useCurrentUser() {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        if (isObjEmpty(currentUser) || currentUser) {
            removeStorageUser();
            // removeStorageTokenUser();
        } else {
            setStorageUser(currentUser);
        }
    }, [currentUser]);

    return {
        currentUser,
        setCurrentUser
    }

}