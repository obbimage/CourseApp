
export function setStorageCourseId(id){
    localStorage.setItem('courseProvider', JSON.stringify(id));
}
export function getStorageCourseId(){
   const id = localStorage.getItem('courseProvider');
    return id ? JSON.parse(id) : null;
}
