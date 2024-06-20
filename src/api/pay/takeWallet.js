import { handleApiRequest, instance } from "../instance";

const URL_WALLET = "/takeWallet";

export async function insertTakeWallet(userId, wallet) {
    return handleApiRequest(async () => {
        return await instance.post(`${URL_WALLET}/take?user_id=${userId}`, wallet);
    }
    )
}

export async function getAllTakeWallet() {
    return handleApiRequest(async () => {
        return await instance.get(`${URL_WALLET}`);
    })
}

export async function getTakeWalletByGet(isGet) {
    return handleApiRequest(async () => {
        return await instance.get(`${URL_WALLET}?is_get=${isGet}`);
    })
}

export async function updateTakeWallet(wallet) {
    return handleApiRequest(async () => {
        return await instance.put(`${URL_WALLET}/update`, wallet);
    })
}

