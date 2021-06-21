function attachEvents() {
    document.getElementById("btnLoadPosts").addEventListener("click", loadFunc);
    document.getElementById("btnViewPost").addEventListener("click", viewFunc);

    async function loadFunc() {
        document.getElementById("posts").innerHTML = "";
        let urlPosts = `http://localhost:3030/jsonstore/blog/posts`;
        let resp = await fetch(urlPosts);
        let data = await resp.json();
        //  console.log(data);
        Object.entries(data).forEach(([key, value]) => {
            let crOpt = document.createElement("option");
            crOpt.textContent = value.title;
            crOpt.value = key;
            document.getElementById("posts").appendChild(crOpt);
        })

    }

    function viewFunc() {
        let postId = document.getElementById("posts").value;
        commentsPreview(postId);
    }

    async function commentsPreview(pid) {
        let ul = document.getElementById("post-comments");
        ul.innerHTML = "";
        let urlP = `http://localhost:3030/jsonstore/blog/posts/` + pid;
        let allComsUrl = `http://localhost:3030/jsonstore/blog/comments`;


        let [p, c] = await Promise.all([
            fetch(urlP),
            fetch(allComsUrl)
        ])
       
        let dataP = await p.json();

        document.getElementById("post-title").textContent = dataP.title;
        document.getElementById("post-body").textContent = dataP.body;
    
        let data2 = await c.json();

        let filtered = Object.values(data2).filter(v => v.postId == pid);
        // console.log(filtered);
        
        filtered.forEach(c => {
            let li = document.createElement("li");
            li.id = c.id;
            li.textContent = c.text;
            ul.appendChild(li);
        })

    }

}

attachEvents();