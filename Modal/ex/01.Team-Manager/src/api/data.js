import * as api from "../api.js";

let host = "http://localhost:3030";
api.settings.host = host;

export let login = api.login;
export let register = api.register;
export let logout = api.logout;

export async function getAllTeams() {
    let allTeamsResult = await api.get(host + "/data/teams")
    let allMembersId = [];
    console.log(allTeamsResult);
    allTeamsResult.forEach(t => allMembersId.push(t._id));
    console.log(allMembersId);
    return await getAllMembers(allMembersId);
}



export async function singleTeamDetailsById(id) {
    console.log(id);
    return await api.get(host + "/data/teams/" + id)
}

export async function myTeams() {
    let userId = sessionStorage.getItem("userId")
    return await api.get(host + `/data/members?where=teamId%3D%22${teamId}%22&load=user%3D_ownerId%3Ausers`)
}

export async function createTeam(data) {
    return await api.post(host + `/data/teams`, data);
}

export async function editTeam(id, data) {
    return await api.put(host + "/data/teams/" + id, data)
}

export async function leaveTeam(id) {
    return await api.deleteRequest(host + "/data/members/" + id)
}



export async function requestToJoinTheTeam(teamId) {
    let data = { teamId }
    console.log(teamId);
    return await api.post(host + "/data/members", data)
}


export async function getTeamInfoRequests(teamId) {
console.log(teamId);
    return await api.get(host + `/data/members?where=teamId%3D%22${teamId}%22`)
    //return await api.get(host + `/data/members?where=teamId%3D%22${teamId}%22&load=user%3D_ownerId%3Ausers`)
    
}


export async function getAllMembers(teamWithId) {
    let query = encodeURIComponent(`teamId IN ("${teamWithId.join('", "')}") AND status="member"`);
    console.log(query);
    return await api.get(host + `/data/members?where=${query}`)
}