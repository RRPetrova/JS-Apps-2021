const reposEl = document.getElementById("repos");
const usernameEl = document.getElementById("username");

function loadRepos() {
   const username = usernameEl.value;
   const url = `https://api.github.com/users/${username}/repos`;

   fetch(url)
      .then(res => res.json())
      .then(data => data
         .forEach(it => {
            let crLi = document.createElement("li");
            let crA = document.createElement("a");
            crA.href = it.html_url;
            crA.innerHTML = it.full_name;
            crLi.appendChild(crA);
            reposEl.appendChild(li);
         }
         ))

}