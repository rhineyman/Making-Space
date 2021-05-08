const deletePostHandler = async function(event) {
    console.log("clicked", event)
    event.preventDefault();
    const postId = document.getElementById('post-id')

    fetch("/api/posts/" + postId.value, {
        method: "delete"
    })
    .then(function() {
        document.location.replace("/homepage");
    })
    .catch(err => console.log(err))
}

document.querySelector("#deleteBTN").addEventListener("click", deletePostHandler);