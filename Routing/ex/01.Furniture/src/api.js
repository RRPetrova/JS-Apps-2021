export const settings = {
    host: ""
};

async function request(url, options) {
    try {
        let response = await fetch(url, options);
       // console.log(response);
        if (response.ok == false) {
            let error = await response.json();
            throw new Error(error.message);
        }
        try {
            let data = await response.json();
            //console.log(data);
            return data;
        } catch (err) {
            return response;
        }

    } catch (err) {
        alert(err.message);
        throw err;
    }
}

function getOptions(method = "get", body) {
    let options = {
        method,
        headers: {}
    }

    let token = sessionStorage.getItem("authToken");
    if (token != null) {
        options.headers["X-Authorization"] = token;
    }

    if (body) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(body);
    }
    return options;
}

export async function get(url) {
    return await request(url, getOptions());
}

export async function post(url, data) {
    return await request(url, getOptions("post", data));
}

export async function put(url, data) {
    return await request(url, getOptions("put", data));
}

export async function deleteRequest(url) {
    return await request(url, getOptions("delete"));
}

export async function login(email, password) {
    let res = await post("http://localhost:3030/users/login", { email, password });
    sessionStorage.setItem("email", res.email);
    sessionStorage.setItem("authToken", res.accessToken);
    sessionStorage.setItem("userId", res._id);

    return res;
}

export async function register(email, password) {
    let res = await post("http://localhost:3030/users/register", { email, password });
    sessionStorage.setItem("email", res.email);
    sessionStorage.setItem("authToken", res.accessToken);
    sessionStorage.setItem("userId", res._id);

    return res;
}

export async function logout() {
    let res = await get("http://localhost:3030/users/logout");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("userId");

    return res;
}