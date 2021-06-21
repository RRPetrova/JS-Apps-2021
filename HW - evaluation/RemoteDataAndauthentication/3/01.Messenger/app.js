function attachEvents() {
    document.getElementById('submit').addEventListener('click',async ()=>{
        const author = document.getElementById('author').value;
        const content = document.getElementById('content').value;

        await sendMessage({author,content});
        author = document.getElementById('author').value = '';
        content = document.getElementById('content').value = '';
        getMessages();

    })

    document.getElementById('refresh').addEventListener('click',getMessages);
    getMessages();
}

attachEvents();

async function getMessages(){
    const response = await fetch('http://localhost:3030/jsonstore/messenger');
    const data = await response.json();

    const messages = Object.values(data).map(v =>`${v.author}: ${v.content}`)
    document.getElementById('messages').value = messages;
    console.log(messages)
}
async function sendMessage(message){
    const response = await fetch('http://localhost:3030/jsonstore/messenger',{
        method:'post',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(message)
    });
    const data = await response.json();
console.log(data)
    const messages = Object.values(data).map(v =>`${v.author}: ${v.content}`)
    document.getElementById('messages').value = messages;
    console.log(messages)
}