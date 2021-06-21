import { html } from "../../node_modules/lit-html/lit-html.js"

import { movieDetails , deleteMovie, addLike, delLike, getLikesForUser, getLikes} from "../api/data.js"

function detailsTempl(movie, isOwner, delFunc, likeFunc, numLikes, ownLikes) {
   
    return html`
<section id="movie-example">
    <div class="container">
        <div class="row bg-light text-dark">
            <h1>Movie title: ${movie.title}</h1>

            <div class="col-md-8">
                <img class="img-thumbnail" src="${movie.img}" alt="Movie">
            </div>
            <div class="col-md-4 text-center">
                <h3 class="my-3 ">Movie Description</h3>
                <p>${movie.description}</p>
                ${isOwner  ? 
                html`
                <a @click=${delFunc} class="btn btn-danger" href="javascript:void(0)">Delete</a>
                <a class="btn btn-warning" href="/edit/${movie._id}">Edit</a>`
                : 
                (ownLikes.length != 0 ? ""  :
                html`<a @click=${likeFunc} class="btn btn-primary" href="javascript:void(0)">Like</a>`)}
                 <span class="enrolled-span">Liked ${numLikes}</span>
            </div>
        </div>
    </div>
</section>`
}

export async function detailsPage(ctx) {
   // console.log(ctx);
    let currId = ctx.params.id;
    let [currMovie, numLikes, userLikes] = await Promise.all([
        movieDetails(currId),
        getLikes(currId),
        getLikesForUser(currId),
    ]);
    let userId = sessionStorage.getItem("userId");
    let isOwner = false;
  //  console.log(numLikes);
   // console.log(userLikes);
    if (currMovie._ownerId == userId) {
        isOwner = true;
    }
    ctx.render(detailsTempl(currMovie, isOwner, delFunc, likeFunc, numLikes, userLikes));


    async function likeFunc(ev) {
        let data = {
            movieId: currMovie._id
        }
        await addLike(data);
        numLikes++;
        ev.target.remove();
    }


    async function delFunc() {
        let confirmed = confirm("Are you sure you want to delete this movie ?")
        if (confirmed) {
            await deleteMovie(currId);
            await delLike(currId);
        }
        ctx.page.redirect("/");
    }
}