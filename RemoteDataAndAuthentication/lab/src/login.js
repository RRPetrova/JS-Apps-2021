document.querySelector("form").addEventListener("submit", loginFunc);

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

    if(resp.ok == false) {
        return alert(data.message);
    }
    console.log("from login:" + data.accessToken);
    sessionStorage.setItem("userToken", data.accessToken);
    
    window.location.pathname = '/RemoteDataAndAuthentication/lab/index.html';

}