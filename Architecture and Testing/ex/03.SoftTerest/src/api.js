export const settings = {
    host : ""
};


async function request(url, createOptions) {
    let resp = await fetch(url, createOptions);

    if (resp.ok == false) {
        let err = await resp.json();
        alert(err.message);
        throw new Error(err.message);
    }
    let data = await resp.json();
    return data;
}


async function createOptions(method = "get", data) {
    let res = {
        method,
        headers: {}
    }
    if (data != undefined) {
        res.headers["Content-Type"] = "application/json";
        res.body = JSON.stringify(data);
    }

    let token = sessionStorage.getItem("authToken");
    if (token != null) {
        res.headers["X-Autorization"] = token;
    }
    return res;
}

export async function get(url) {
    return request(url, createOptions())
}

export async function post(url, data) {
    return request(url, createOptions("post", data));
}

export async function put(url, data) {
    return request(url, createOptions("put", data));
}

export async function delReq(url) {
    return request(url, createOptions("delete"));
}

export async function login(email, password) {
    let resp = await post(settings.host + "/users/login", { email, password });

    sessionStorage.setItem("authToken", resp.accessToken);
    sessionStorage.setItem("email", resp.email);
    sessionStorage.setItem("userId", resp._id);

}

export async function register(email, password) {
    let resp = await post(settings.host + "/users/register")

    sessionStorage.setItem("authToken", resp.accessToken);
    sessionStorage.setItem("email", resp.email);
    sessionStorage.setItem("userId", resp._id);
    return resp;
}

export async function logout( ){
    let resp = await get(settings.host + "/users/logout");

    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("userId");
    return resp;
}
