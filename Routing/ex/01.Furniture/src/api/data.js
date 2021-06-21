import * as api from "../api.js";

let host = "http://localhost:3030";
api.settings.host = host;

export let login = api.login;
export let register = api.register;
export let logout = api.logout;

export async function getAllFurniture() {
    return await api.get(host + "/data/catalog")
}

export async function getFurnitureId(id) {
    return await api.get(host +"/data/catalog/" + id)
}

export async function getMyFurniture() {
    let userId = sessionStorage.getItem("userId")
    return await api.get(host +`/data/catalog?where=_ownerId%3D%22${userId}%22`)
}


export async function createFurniture(data) {
    return await api.post(host +`/data/catalog`, data);
}


export async function editFurniture(id, data) {
    return await api.put(host +"/data/catalog/" + id, data)
}

export async function deleteFurniture(id) {
    return await api.deleteRequest(host +"/data/catalog/" + id)
}