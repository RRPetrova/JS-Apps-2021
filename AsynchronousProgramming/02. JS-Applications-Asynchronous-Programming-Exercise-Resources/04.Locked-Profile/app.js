function lockedProfile() {
    let defaultPr = document.querySelector("main div");
    defaultPr.parentNode.removeChild(defaultPr);

    profile();
}

async function profile() {
    let inf = await getInfo();
  
  //  console.log(inf);

    Object.values(inf).forEach(p => {
        let main = document.getElementById("main");
       
//    mainPage.appendChild(e('div', { 'className': 'profile' },
//       e('img', { 'src': './iconProfile2.png', 'className': 'userIcon' }),
//       e('label', '', 'Lock'),
//       e('input', { 'type': 'radio', 'name': `user${index + 2}Locked`, 'value': 'lock', 'checked': true }),
//       e('label', '', 'Unlock'),
//       e('input', { 'type': 'radio', 'name': `user${index + 2}Locked`, 'value': 'unlock' }),
//       e('br'),
//       e('hr'),
//       e('label', '', 'Username'),
//       e('input', { 'type': 'text', 'name': `user${index + 2}Username`, 'value': u.username, 'disabled': true, 'readonly': true }),
//       e('div', { 'id': `user${index + 2}HiddenFields`, 'style': 'display: none;' },
//           e('hr'),
//           e('label', '', 'Email:'),
//           e('input', { 'type': 'email', 'name': `user${index + 2}Email`, 'value': u.email, 'disabled': true, 'readonly': true }),
//           e('label', '', 'Age:'),
//           e('input', { 'type': 'email', 'name': `user${index + 2}Age`, 'value': u.age, 'disabled': true, 'readonly': true })
//       ),
//       e('button', { 'onClick': hideOrRevealUserInfo}, 'Show more')
//   ))
       
        let divProf = document.createElement("div");
        divProf.className = "profile";

        let crImg = document.createElement("img");
        crImg.src = "./iconProfile2.png";
        crImg.className = "userIcon";
        crImg.style.display = "inline-block"
        divProf.appendChild(crImg);

        let crLab1 = document.createElement("label");
        crLab1.textContent = "Lock";
        divProf.appendChild(crLab1);

        let crInp1 = document.createElement("input");
        crInp1.type = "radio";
        crInp1.name = "user1Locked";
        crInp1.value = "lock";
        crInp1.checked = "checked";
        divProf.appendChild(crInp1);

        let crLabUnl = document.createElement("Unlock");
        crLabUnl.textContent = "Unlock";
        divProf.appendChild(crLabUnl);

        let crInp2 = document.createElement("input");
        crInp2.type = "radio";
        crInp2.name = "user1Locked";
        crInp2.value = "unlock";
        divProf.appendChild(crInp2);

        let crBr = document.createElement("br");
        divProf.appendChild(crBr);

        let crHr = document.createElement("hr");
        divProf.appendChild(crHr);

        let crLab2 = document.createElement("label");
        crLab2.textContent = "Username";
        divProf.appendChild(crLab2);

        let crInp3 = document.createElement("input");
        crInp3.type = "text";
        crInp3.name = "user1Username";
        crInp3.value = p.username;
        divProf.appendChild(crInp3);

        let hr2 = document.createElement("hr");
        let crLab3 = document.createElement("label");
        crLab3.textContent = "Email:";
        let inp = document.createElement("input");
        inp.type = "email";
        inp.name = "user1Email";
        inp.value = p.email;
        inp.readOnly = true;
        let crLabAge = document.createElement("label");
        crLabAge.textContent = "Age:";
        let inpAge = document.createElement("input");
        inpAge.type = "email";
        inpAge.name = "user1Age";
        inpAge.value = p.age;
        inpAge.readOnly = true;

        let divId = document.createElement("div");
        divId.id = "user1HiddenFields";
        divId.appendChild(hr2)
        divId.appendChild(crLab3)
        divId.appendChild(inp)
        divId.appendChild(crLabAge)
        divId.appendChild(inpAge)

        let btn = document.createElement("button");
        btn.textContent = "Show more";
        btn.addEventListener("click", clicked);
        divProf.appendChild(btn)

        divProf.appendChild(divId);
        main.appendChild(divProf);


    });


        document.querySelectorAll("input").forEach(i => {
            if (i.type != "radio" ){
              
                i.readOnly = true;
            }

        });

    function clicked(ev) {
        let currBtn = ev.target;
        let hiddenInfo = ev.target.parentNode.querySelector("#user1HiddenFields");
        console.log(hiddenInfo);
        if (ev.target.parentNode.querySelector('input[type="radio"]:checked').value != "lock") {
            if (currBtn.textContent === "Show more") {
                hiddenInfo.style.display = "block";
                currBtn.textContent = "Hide it";
            } else if (currBtn.textContent === "Hide it") {
                hiddenInfo.style.display = "none";
                currBtn.textContent = "Show more";
            }
        }
    }


}


async function getInfo() {
    let url = `http://localhost:3030/jsonstore/advanced/profiles`;
    let resp = await fetch(url);
    let data = await resp.json();
    // console.log(data);
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