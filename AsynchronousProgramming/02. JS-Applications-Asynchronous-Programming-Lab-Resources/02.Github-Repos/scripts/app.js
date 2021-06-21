function loadRepos() {
	let username = document.querySelector("#username").value;

	let url = `https://api.github.com/users/${username}/repos`;

	fetch(url);
}