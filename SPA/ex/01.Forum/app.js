import { showPost } from "./postDetails.js"

setupNavigation();
showPage();

export function setupNavigation() {

    showPage();
    document.getElementById("postBtn").addEventListener("click", postFunc);
    document.getElementById("cancelBtn").addEventListener("click", cancelFunc);
    document.getElementById("homeBtn").addEventListener("click", showPage);
    Array.from(document.querySelectorAll("h2"))
        .forEach(h2 => h2.addEventListener("click", (ev) => {
         //   console.log(ev.target.innerText);
            showPost(ev.target.innerText);
        }));
}

function cancelFunc(ev) {
   // console.log("clickcanc");
    document.getElementById("topicName").value = "";
    document.getElementById("username").value = "";
    document.getElementById("postText").value = "";
}

async function postFunc(ev) {
    ev.preventDefault();
    showPage();
    // console.log("clickpost");
   // console.log(document.getElementById("topicName").value);
    let title = document.getElementById("topicName").value;
    let username = document.getElementById("username").value;
    let postText = document.getElementById("postText").value;
    if (title == "" || username == "" || postText == "") {
        return alert("All fields are mandatory!!")
    }
    //  console.log(title, username, postText);
    let current_timestamp = new Date();
    let resp = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            currDT: current_timestamp,
            title: title,
            username: username,
            postText, postText
        })
    })
    document.getElementById("topicName").value = "";
    document.getElementById("username").value = "";
    document.getElementById("postText").value = "";

    let data = resp.json();
    if (resp.ok == false) {
        return alert(data.message);
    } else {
        showPage();
        // showHome();
    }
}

export async function showPage() {
    let resp = await fetch("http://localhost:3030/jsonstore/collections/myboard/posts");
    let data = await resp.json();

    let main = document.createElement("main");
    document.getElementById("cont").innerHTML = "";
    let formHomeP =
        e("div", { id: "formHome", className: "new-topic-border" },
            e("div", { className: "header-background" },
                e("span", {}, "New Topic")
            ),
            e("form", { id: "formId" },
                e("div", { className: "new-topic-title" },
                    e("label", { for: "topicName" }, "Title", e("span", { className: "red" }, "*")),
                    e("input", { type: "text", name: "topicName", id: "topicName" })
                ),
                e("div", { className: "new-topic-title" },
                    e("label", { for: "username" }, "Username", e("span", { className: "red" }, "*")),
                    e("input", { type: "text", name: "username", id: "username" })
                ),
                e("div", { className: "new-topic-content" },
                    e("label", { for: "postText" }, "Post", e("span", { className: "red" }, "*")),
                    e("input", { type: "text", id: "postText", name: "postText", rows: "8", class: "height" })
                ),
                e("div", { className: "new-topic-buttons" },
                    e("button", { id: "cancelBtn", className: "cancel", onclick: cancelFunc }, "Cancel"),
                    e("button", { id: "postBtn", className: "public", onclick: postFunc }, "Post"),
                )
            )
        );
    main.appendChild(formHomeP);
    let topCont = e("div", { id: "topicTitle", class: "topic-title" });
  //  console.log(data);
  
    Object.values(data).forEach(p => {
    //    console.log(p);
       // console.log(p.title == "[object Object]");
        if (p.title != "[object Object]") {
        //    console.log("postCont");
            let postContainer =
                e("div", { className: "topic-container" }, "",
                    e("div", { className: "topic-name-wrapper" }, "",
                        e("div", { className: "topic-name" }, "",
                            e("a", { href: "#", className: "normal" }, "",
                                e("h2", "", `${p.title}`)
                            ),
                            e("div", { className: "columns" }, "",
                                e("div", "", "",
                                    e("p", "", "Date: ", e("time", "", `${p.currDT}`)),
                                    e("div", { className: "nick-name" }, e("p", "", "Username: ", e("span", "", `${p.username}`))),
                                    e("div", { className: "subscribers" }, e("p", "", "Subscribers: ", e("span", "", `456`)))
                                )
                            )
                        )

                    )
                );
            topCont.appendChild(postContainer);
        }
    });
    console.log("app");
    main.appendChild(topCont)
    document.getElementById("cont").appendChild(main);

    Array.from(document.querySelectorAll("h2"))
        .forEach(h2 => h2.addEventListener("click", (ev) => {
       //     console.log(ev.target.innerText);
            showPost(ev.target.innerText);
        }));
}


function e(type, attributes, ...content) {
    const result = document.createElement(type);
    for (let [attr, value] of Object.entries(attributes || {})) {
        if (attr.substring(0, 2) == 'on') {
            result.addEventListener(attr.substring(2).toLocaleLowerCase(), value);
        } else {
            result[attr] = value;
        }
    }
    content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);
    content.forEach(e => {
        if (typeof e == 'string' || typeof e == 'number') {
            const node = document.createTextNode(e);
            result.appendChild(node);
        } else {
            result.appendChild(e);
        }
    });
    return result;
}