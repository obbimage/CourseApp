import { handleApiRequest, instance } from "./instance";

const ROLE_USER = 'user';
const ROLE_EDUCATOR = 'educator'
const URL_REGISTER = '/register';
const URL_LOGIN = '/auth'

const URL_USER = '/user';

const loginRequest = (userName, password) => {
    return {
        username: userName,
        password: password
    }
}

async function login(username, password, role = ROLE_USER) {

    return handleApiRequest(async () => {
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
};

export async function loginEducator(username, password) {
    return await login(username, password, ROLE_EDUCATOR);
};

export async function loginAdmin(username, password) {
    return handleApiRequest(async () => {
        return await instance.post(`${URL_LOGIN}/admin`, loginRequest(username, password));
    })

}

export async function loginUser(username, password) {
    return handleApiRequest(async () => {
        return await instance.post(`${URL_LOGIN}/user`, {
            username: username,
            password: password
        });
    });
}

export async function registerEducator(username, password) {
    return register(username, password, ROLE_EDUCATOR)
};

export async function registerAdmin(username, password) {
    const user = {
        username: username,
        password: password
    }

    return handleApiRequest(async () => {
        return await instance.post(`${URL_REGISTER}/admin`, user);
    })
}

export async function registerUser(username, password) {
    const user = {
        username: username,
        password: password
    }
    return handleApiRequest(async () => {
        return await instance.post(`${URL_REGISTER}/user`, user);
    });
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
    // return handleApiRequest(async () => {
    //     return await instance.put(`/user/updateInfo/${id}`, user);
    // });
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
    const formData = new FormData();
    formData.append('file', files[0], files[0].name);
    return handleApiRequest(async () => {
        return await instance.post(`/user/updateAvatar/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    });
}

export async function getAllEducator(pageNumber, pageSize) {
    // nếu có truyền tham số
    if (pageNumber !== undefined && pageSize !== undefined) {
        return handleApiRequest(async () => {
            return await instance.get(`${URL_USER}/${ROLE_EDUCATOR}/page/${pageNumber}/${pageSize}`);
        });
        // nếu không có tham số được truyền vào
    } else {
        return handleApiRequest(async () => {
            return await instance.get(`${URL_USER}/${ROLE_EDUCATOR}`);
        });
    }
}

export async function findeEducators(search, pageSize, pageNumber) {
    return handleApiRequest(async () => {
        return await instance.get(`${URL_USER}/${ROLE_EDUCATOR}/search/${search}/page/${pageSize}/${pageNumber}`);
    })
}


export async function getWallet() {
    return handleApiRequest(async () => {
        return await instance.get(`${URL_USER}/wallet`);
    })
}