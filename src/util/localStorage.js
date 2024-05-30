
const key = 'courseProvider';
const USER_KEY = 'user'
export function setStorageCourseId(id){
    localStorage.setItem(key, JSON.stringify(id));
}
export function getStorageCourseId(){
   const id = localStorage.getItem(key);
    return id ? JSON.parse(id) : null;
}

export function removeStorageCourseId(){
    localStorage.removeItem(key);
}

export function setStorageUser(user){
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getStorageUser(){
    const user = sessionStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
}