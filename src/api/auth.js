import { instance } from "./instance";

const ROLE_USER = 'USER';

export async function login(username, password, role = ROLE_USER) {

    try {
        const response = await instance.post(`/auth/${role}`, {
            username: username,
            password: password
        });

        return response.data;
    } catch (err) {
        console.error("login faile: ", err);
        // throw err;
    }
}

export async function register(username, password) {
    try {
        instance.post("/register/educator", {
            username: username,
            password: password
        })
    }catch(err){
        console.log('resgister faile: ', err);
        return err;
        
    }
}

export async function getUser(){
    try{
       return (await instance.get('/user')).data.data
    }catch(err){
        console.log(err)
    }
}