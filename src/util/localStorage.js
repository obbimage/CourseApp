
const key = 'courseProvider';
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