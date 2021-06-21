import { showPage, setupNavigation } from "./app.js"


export async function showPost(clickedTitle) {
    //  console.log(clickedTitle);
    configurePostDisplay(clickedTitle);
    document.getElementById("homeBtn").addEventListener("click", setupNavigation);
    //document.getElementById("postB2").addEventListener("click", newCommFunc);
}

async function newCommFunc() {
    let current_timestamp = new Date();

    if (document.getElementById("username").value == "" || document.getElementById("comment").value == "") {
        return alert('All fields are mandatory!');
    }
    let resp = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            currDT: current_timestamp,
            username: document.getElementById("username").value,
            postText: document.getElementById("comment").value
        })
    })

    if (!resp.ok) {
        return alert(await resp.json().message);
    } else {
console.log("show");
        showComms();
    }
}
let title;

async function showComms() {
    let commentsFromLink = await getAllComms();
    console.log(commentsFromLink);

    let cont = document.getElementById("cont");
    cont.innerHTML = "";

    let topicCont = e("div", { id: "topicContentPost", className: "topic-content" });
    let theme =
        e("div", { id: "commsDiv", className: "topic-title" },
            e("div", { className: "topic-name-wrapper" },
                e("div", { className: "topic-name" },
                    e("h2", "", `${title}`),
                    e("p", "", "Date: ", e("time", "", "2020-10-10 12:08:28"))
                ),
                e("div", { className: "subscribers" },
                    e("p", "", "Subscribers: ", e("span", "", "456"))
                )
            )
        );
    topicCont.appendChild(theme);
    Object.values(commentsFromLink).forEach(comm => {
        //console.log();
      //  if (comm.title == title) {
         //   console.log("here");
            let commentAppend =
                e("div", { className: "comment" },
                    e("header", {},
                        //    <p><span>David</span> posted on <time>2020-10-10 12:08:28</time></p>
                        e("p", {}, e("span", {}, `${comm.username}`), " posted on ", e("time", {}, `${comm.currDT}`))),
                    e("div", { className: "comment-main" },
                        e("div", { className: "userdetails" },
                            e("img", { src: "./static/profile.png", alt: "avatar" })),
                        e("div", { className: "post-content" },
                            e("p", "", `${comm.postText}`))),
                    e("div", { className: "footer" },
                        e("p", e("span", "", "3"), "likes"))
                );
            topicCont.appendChild(commentAppend);
     //   } else {
      //      console.log("diff tit");
      //  }
    });


    let answ = e("div", { className: "answer-comment" },
        e("p", {}, e("span", "", "currentUser "), "comment:"),
        e("div", { className: "answer" },
            e("form", "",
                e("textarea", { name: "postText", id: "comment", cols: "30", rows: "10" })),
            e("div", {},
                e("label", { for: "username" }, e("span", { className: "red" }, "*"), "Username"),
                e("input", { type: "text", name: "username", id: "username" })
            ),
            e("button", { id: "postB2", onclick: newCommFunc }, "Post")
        )
    );
    topicCont.appendChild(answ);
    cont.appendChild(topicCont);
}

async function configurePostDisplay(clickedTitle) {
    cont.innerHTML = "";
    let posts = await getAllPosts();

    let filteredPostsFromHomeP = Object.values(posts).filter(p => p.title == clickedTitle);

    title = filteredPostsFromHomeP[0].title;
    // console.log(Object.values(filteredPostsFromHomeP));
    let arrayOfComms = [];

    let commArr = await getAllComms();
  //  console.log(Object.values(commArr));

    if (Object.values(commArr).length == 0) {
        Object.values(filteredPostsFromHomeP).forEach(post => {
            arrayOfComms.push({
                currDT: post.currDT,
                title: title,
                username: post.username,
                postText: post.postText
            })
        })
    } else {


        Object.values(filteredPostsFromHomeP).forEach(post => {
            
            if (!Object.values(commArr).some(el => el.currDT == post.currDT)) {
                arrayOfComms.push({
                    currDT: post.currDT,
                    title: title,
                    username: post.username,
                    postText: post.postText
                })
            }
            
            
        })
    }

    arrayOfComms.forEach(postFromH => postReqComms(postFromH));
    showComms();
}

async function postReqComms(obj) {
    let resp = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
    })
    return await resp.json();
}



async function delPosts(id) {
    let resp = await fetch("http://localhost:3030/jsonstore/collections/myboard/posts/" + id, {
        method: "delete",
    })
}

async function getAllPosts() {
    let resp = await fetch("http://localhost:3030/jsonstore/collections/myboard/posts");
    let data = await resp.json();
    return data;
}

async function getAllComms() {
    let resp = await fetch("http://localhost:3030/jsonstore/collections/myboard/comments");
    let data = await resp.json();
    return data;
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