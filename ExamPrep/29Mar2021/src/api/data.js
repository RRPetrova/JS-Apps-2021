import * as api from "../api.js";

let host = "http://localhost:3030";
api.settings.host = host;


export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllListings(page = 1) {
    return await api.get(host + `/data/cars?sortBy=_createdOn%20desc&offset=${(page-1)*3}&pageSize=3`)
}

export async function getSize() {
    return await api.get(host + "/data/cars?&count")
}

export async function getCarDetails(id) {
    return await api.get(host + "/data/cars/" + id)
}

export async function myCars() {
    let userId = sessionStorage.getItem("userId")
    console.log(userId);
    return await api.get(host + `/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}

export async function createCar(data) {
    return await api.post(host + `/data/cars`, data);
}

export async function editCar(id, data) {
    return await api.put(host + "/data/cars/" + id, data)
}

export async function deleteRequest(id) {
    return await api.deleteRequest(host + "/data/cars/" + id)
}

export async function searchBy(data) {
    return await api.get(host + `/data/cars?where=year%3D${data}`)
}