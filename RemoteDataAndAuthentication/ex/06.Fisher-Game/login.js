function sol() {
    document.getElementById("login").addEventListener("submit", loginFunc);
    document.getElementById("reg").addEventListener("submit", reg);
}

sol();

async function loginFunc(ev) {
    ev.preventDefault();

    const formData = new FormData(ev.target);
    let mail = formData.get("email");
    let pass = formData.get("password");

    const resp = await fetch("http://localhost:3030/users/login", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: mail, password: pass })
    });

    let data = await resp.json();
    //  console.log(data);
    if (resp.ok == false) {
        return alert(data.message);
    } else {
        sessionStorage.setItem("userToken", data.accessToken);
      
        window.location.pathname = '/RemoteDataAndAuthentication/ex/06.Fisher-Game/index.html';
    }
    // console.log("from login:" + data.accessToken);

}



async function reg(ev) {
    ev.preventDefault();

    const formData = new FormData(ev.target);
    let mail = formData.get("email");
    let pass = formData.get("password");
    let repass = formData.get("rePass");

    if (mail == "" || pass == "") {
        return alert("All fields are mandatory!")
    } else if (pass != repass) {
        return alert("Passwords don\'t match!")
    }

    let resp = await fetch("http://localhost:3030/users/register", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: mail, password: pass })
    });

    let data = await resp.json();

    if (resp.ok == false) {
        return alert(data.message);
    }
    sessionStorage.setItem("userToken", data.accessToken);
    window.location.pathname = '/RemoteDataAndAuthentication/ex/06.Fisher-Game/index.html';

}

