import * as api from "../api.js";

let host = "http://localhost:3030";
api.settings.host = host;

export let login = api.login;
export let register = api.register;
export let logout = api.logout;

export async function getAllShoes() {
    return await api.get(host + "/jsonstore/shoes")
}

export async function detailsOffer(id) {
    return await api.get(host +"/jsonstore/shoes/" + id)
}

// export async function getMyFurniture() {
//     let userId = sessionStorage.getItem("userId")
//     return await api.get(host +`/data/catalog?where=_ownerId%3D%22${userId}%22`)
// }


export async function createOffer(data) {
    return await api.post(host +`/jsonstore/shoes`, data);
}


export async function editFurniture(id, data) {
    return await api.put(host +"/jsonstore/shoes/" + id, data)
}

export async function deleteOffer(id) {
    return await api.deleteRequest(host +"/jsonstore/shoes/" + id)
}