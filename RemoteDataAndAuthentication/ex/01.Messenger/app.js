function attachEvents() {
    document.getElementById("submit").addEventListener("click", sendMess);
   document.getElementById("refresh").addEventListener("click", getMess)
    
}

attachEvents();
function sendMess() {
    let author = document.getElementById("author").value;
    let content = document.getElementById("content").value;


   createMess({ author, content });
    document.getElementById("author").value = "";
    document.getElementById("content").value = "";
}

async function getMess() {
    const resp = await fetch("http://localhost:3030/jsonstore/messenger");
    let data = await resp.json();
    let res = [];
    Object.values(data).forEach(v =>
        res.push(`${v.author}: ${v.content}`));
    document.getElementById("messages").value = res.join("\n");
}

async function createMess(mess) {
    const resp = await fetch("http://localhost:3030/jsonstore/messenger", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mess)
    });
    let data = await resp.json();
    console.log(data);
}