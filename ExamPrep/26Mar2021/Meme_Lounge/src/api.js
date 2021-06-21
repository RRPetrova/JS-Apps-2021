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
            // alert(err.message);
            // throw err;
        }

    } catch (err) {
        console.error(err.message);
        throw err;
    }
}

function getOptions(method = "get", body) {
    let options = {
        method,
        headers: {}
    }
    let token = sessionStorage.getItem("authToken");
    console.log(token);
    if (token != null) {
        options.headers["X-Authorization"] = token;
    }
    
    if (body) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(body);
    }
    console.log(options);
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
    const result = await post(settings.host + '/users/login', {  email, password });

    sessionStorage.setItem('userId', result._id);
    sessionStorage.setItem('email', result.email);
    sessionStorage.setItem('authToken', result.accessToken);
    sessionStorage.setItem('username', result.username);
    sessionStorage.setItem('gender', result.gender);

    return result;
}

export async function register(username, email, password, gender) {
    const result = await post(settings.host + '/users/register', { username, email, password, gender });
    
    sessionStorage.setItem('userId', result._id);
    sessionStorage.setItem('email', result.email);
    sessionStorage.setItem('authToken', result.accessToken);
    sessionStorage.setItem('username', result.username);
    sessionStorage.setItem('gender', result.gender);

    return result;
}

export async function logout() {
    const result = await get(settings.host + '/users/logout');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('gender');

    return result;
}