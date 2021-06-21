function attachEvents() {
    document.getElementById('btnLoadPosts').addEventListener('click', getPosts);
    document.getElementById('btnViewPost').addEventListener('click', dispalyPost);
}
attachEvents();
async function getPosts(){
    const url = 'http://localhost:3030/jsonstore/blog/posts';
    const response = await fetch(url);
    const data = await response.json();

    const select = document.getElementById('posts');
    Object.values(data).map(createOption).forEach(o => select.appendChild(o));

}
function createOption(post){
    const result = document.createElement('option');
    result.textContent = post.title;
    result.value = post.id;
    return result;
    

}
    
    
    function dispalyPost(){
        const postId = document.getElementById('posts').value;
        getCommentsByPostId(postId);

    }
    
    async function getCommentsByPostId(postId){
        const commentsUl = document.getElementById('post-comments');
        commentsUl.innerHTML = '';

        const postURL = 'http://localhost:3030/jsonstore/blog/posts/' + postId;
        const commentsUrl = 'http://localhost:3030/jsonstore/blog/comments';

        const [postResponse, commnetResponse] = await Promise.all([
            fetch(postURL),
            fetch(commentsUrl)
        ]);

        const postData = await postResponse.json();

        document.getElementById('post-title').textContent = postData.title;
        document.getElementById('post-body').textContent = postData.body;

        const commentsData = await commnetResponse.json();
        const comments = Object.values(commentsData).filter(c => c.postId == postId);

        comments.map(createComment).forEach(c => commentsUl.appendChild(c));

    }
    function createComment(comment){
        const result = document.createElement('li');
        result.textContent = comment.text;
        result.id = comment.id
        return result
    }


