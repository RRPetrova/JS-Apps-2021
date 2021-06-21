import * as api from "../api.js";

let host = "http://localhost:3030";
api.settings.host = host;


export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllArticles() {
    return await api.get(host + "/data/wiki?sortBy=_createdOn%20desc")
}


export async function home() {
    return await api.get(host + "/data/wiki?sortBy=_createdOn%20desc&distinct=category")
}

export async function articleDetails(id) {
    return await api.get(host + "/data/wiki/" + id)
}

export async function search(data) {
    return await api.get(host + `/data/wiki?where=title%20LIKE%20%22${data}%22`)
}


export async function createArt(data) {
    return await api.post(host + `/data/wiki`, data);
}


export async function editReq(id, data) {
    return await api.put(host + "/data/wiki/" + id, data)
}

export async function deleteRequest(id) {
    return await api.deleteRequest(host + "/data/wiki/" + id)
}