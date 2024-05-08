import { handleApiRequest, instance } from "./instance";

const ROLE_USER = 'user';
const ROLE_EDUCATOR = 'educator'

async function login(username, password, role = ROLE_USER) {

    // try {
    //     const response = await instance.post(`/auth/${role}`, {
    //         username: username,
    //         password: password
    //     });

    //     return response;
    // } catch (err) {
    //     console.error("login faile: ", err);
    //     if (err.response)
    //         return err.response;
    //     return null;
    // }

    return handleApiRequest(async ()=>{
        return await instance.post(`/auth/${role}`, {
            username: username,
            password: password
        });
    });
}
// http://localhost:8080/register/educator
async function register(username, password, role) {
    try {
        const response = await instance.post(`/register/${role}`, {
            username: username,
            password: password
        })
        return response;
    } catch (err) {
        console.log('resgister faile: ', err);
        if (err.response)
            return err.response;
        return null;

    }
}

export async function loginEducator(username, password) {
    return await login(username, password, ROLE_EDUCATOR);
}

export async function registerEducator(username, password) {
    return register(username, password, ROLE_EDUCATOR)
}

export async function getUser() {
    try {
        return (await instance.get('/user')).data.data
    } catch (err) {
        console.log(err)
    }
}


export async function logout() {
    try {

        // return await instance.post("auth/logout")
    } catch (err) {

    }
}

export async function changePassword(idUser, oldPassword, newPassword) {
    try {
        const response = await instance.put("/user/changePassword", {
            id: idUser,
            oldPassword: oldPassword,
            newPassword: newPassword
        });
        return response;
    } catch (err) {
        console.log(err)
        // server có phản hồi
        if (err.response) {
            return { status: err.response.status };
        }
        console.log(`change password: ${err}`);
        return null;
    }
}

export async function updateUser(id, user) {

    try {
        const response = await instance.put(`/user/updateInfo/${id}`, user)
        return response;
    } catch (err) {
        // có phản hồi từ server
        if (err.response) {
            console.log(err)
            return { status: err.response.status }
        }
        return null;
    }
}

export async function updateAvatar(id, files) {
    try {
        const formData = new FormData();
        console.log(files)
        formData.append('file', files[0], files[0].name);

        const response = await instance.post(`/user/updateAvatar/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response;
    } catch (err) {
        console.log(err)
        if (err.response) {
            return { status: err.response.status }
        }
        return null;
    }
}