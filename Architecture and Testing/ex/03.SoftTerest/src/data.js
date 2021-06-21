import * as api from "./api.js"

let host = "http://localhost:3030"
api.settings.host = host;

export async function getIdeas() {
    return await api.get(host + "/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc");
}

export async function getIdeaById(id) {
    return await api.get(host + "/data/ideas/" + id);
}

export let login = api.login;
export let reg = api.register;
export let logout = api.logout;