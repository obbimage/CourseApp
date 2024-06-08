
const key = 'courseProvider';
const USER_KEY = 'user'
export function setStorageCourseId(id) {
    localStorage.setItem(key, JSON.stringify(id));
}
export function getStorageCourseId() {
    const id = localStorage.getItem(key);
    return id ? JSON.parse(id) : null;
}

export function removeStorageCourseId() {
    localStorage.removeItem(key);
}

// save info user
export function setStorageUser(user) {
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
}
export function getStorageUser() {
    const user = sessionStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
}
export function removeStorageUser(){
    sessionStorage.removeItem(USER_KEY);
}
//-------------
// save token user
const TOKEN_USER_KEY = 'token_user_key'
export function setStorageTokenUser(token) {
    sessionStorage.setItem(TOKEN_USER_KEY, JSON.stringify(token));
}
export function getStorageTokenUser() {
    let token = sessionStorage.getItem(TOKEN_USER_KEY);
    return token ? JSON.parse(token) : null;
}

export function removeStorageTokenUser(){
    sessionStorage.removeItem(TOKEN_USER_KEY);
}