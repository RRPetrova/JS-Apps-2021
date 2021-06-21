document.querySelector("form").addEventListener("submit", reg);


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
    window.location.pathname = '/RemoteDataAndAuthentication/lab/index.html';

}