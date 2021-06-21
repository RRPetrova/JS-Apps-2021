function attachEvents() {
    document.getElementById('btnLoadPosts').addEventListener('click', getPosts);
    document.getElementById('btnViewPost').addEventListener('click', displayPost);

}

attachEvents();

async function getPosts() {
    const url = 'http://localhost:3030/jsonstore/blog/posts'

    const responce = await fetch(url);
    const data = await responce.json();

    const postDropdown = document.getElementById('posts')
    Object.values(data).map(createOption).forEach(o => postDropdown.appendChild(o));
}

function createOption(post) {
    const result = document.createElement('option');
    result.textContent = post.title;
    result.value = post.id;
    return result;
}

function displayPost() {

    const postId = document.getElementById('posts').value;
    console.log(postId)
    getComments(postId);
}

async function getComments(postId) {
    const commnentsUl = document.getElementById('post-comments');
    commnentsUl.innerHTML = '';

    const urlPost = 'http://localhost:3030/jsonstore/blog/posts/' + postId;
    const urlComments = 'http://localhost:3030/jsonstore/blog/comments'

    const [postResponce, commentsResponce] =
        await Promise.all
        ([
            fetch(urlPost),
            fetch(urlComments)
        ])

   
    const postData = await postResponce.json();
    document.getElementById('post-title').textContent = postData.title;
    document.getElementById('post-body').textContent = postData.body;

    const commentsData = await commentsResponce.json();
    const comments = Object.values(commentsData).filter(x => x.postId == postId)

    comments.map(createComment).forEach(c=>commnentsUl.appendChild(c));

}

function createComment(comment) {
    const result = document.createElement('li');
    result.textContent = comment.text;
    result.id = comment.id;
    return result;
}