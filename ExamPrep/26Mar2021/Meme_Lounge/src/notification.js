let messageField = document.getElementById("errorBox")

export function notify(message) {
    messageField.innerHTML = `<span>${message}</span>`
    messageField.style.display = "block";

    setTimeout(() => {
        messageField.style.display = "none";

    }, 3000)
}
