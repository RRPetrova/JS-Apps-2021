import { showPost } from "./postDetails.js";

function solution() {
    showPage();
    // document.getElementById("cancelBtn").addEventListener("click", cancelFunc);
    document.getElementById("formId").addEventListener("submit", postFunc);
    
}

solution();

function clickPost(ev) {
    showPost(ev.target.textContent);
}

async function postFunc(ev) {
    ev.preventDefault();

    let title = document.getElementById("topicName").value;
    let username = document.getElementById("username").value;
    let postText = document.getElementById("postText").value;
    if (title == "" || username == "" || postText == "") {
        return alert("All fields are mandatory!!")
    }
    //  console.log(title, username, postText);

    let resp = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: title,
            username: username,
            postText, postText
        })
    })


    showPage();

    ev.target.reset()
}

async function showPage() {
    let resp = await fetch("http://localhost:3030/jsonstore/collections/myboard/posts");
    let data = await resp.json();

    document.getElementById("topicTitle").innerHTML = "";
    
    Object.values(data).forEach(p => {
   //     console.log(p.title == "[object Object]");
        if(p.title != "[object Object]") {
        let elem = `
        <div class="topic-container">
        <div class="topic-name-wrapper">
            <div class="topic-name">
                <a href="#" class="normal">
                    <h2>${p.title}</h2>
                </a>
                <div class="columns">
                    <div>
                        <p>Date: <time>${(new Date()).toISOString()}</time></p>
                        <div class="nick-name">
                            <p>Username: <span>${p.username}</span></p>
                        </div>
                    </div>
                    <div class="subscribers">
                        <!-- <button class="subscribe">Subscribe</button> -->
                        <p>Subscribers: <span>65</span></p>
                    </div>
                </div>
            </div>
        </div>
        </div>`
        document.getElementById("topicTitle").innerHTML += elem;
        }
    })
    Array.from(document.querySelectorAll("h2"))
    .forEach(h2 => h2.addEventListener("click", clickPost));
}




// function cancelFunc() {

// }


// APP.js FILE

// import {createPost} from './createPost.js'


// function start() {
//     let form = document.querySelector('form').addEventListener('submit', createPost)
// }


// start()


// ==================================


// CREATE POST.js FILE


// export async function createPost(event) {
//     event.preventDefault()

//     if (topicName.value == '' || username.value == '' || postText.value == '') {
//         return
//     }

//     const formData = new FormData(event.target)


//     const post = {
//         topic: formData.get('topicName'),
//         username: formData.get('username'),
//         postText: formData.get('postText'),
//     }


//     let response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts', {
//         method: 'post',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify(post)
//     })

//     let result = `
//     <div class="topic-container">
//         <div class="topic-name-wrapper">
//             <div class="topic-name">
//                 <a href="#" class="normal">
//                     <h2>${post.topic}</h2>
//                 </a>
//                 <div class="columns">
//                     <div>
//                         <p>Date: <time>${(new Date()).toISOString()}</time></p>
//                         <div class="nick-name">
//                             <p>Username: <span>${post.username}</span></p>
//                         </div>
//                     </div>
//                     <div class="subscribers">
//                         <!-- <button class="subscribe">Subscribe</button> -->
//                                         <p>Subscribers: <span>0</span></p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
//     `
//     document.querySelector('main').innerHTML += result
//     event.target.reset()
// }