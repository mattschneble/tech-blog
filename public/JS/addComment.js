// create an asynchronous function to add comment
async function addComment(event) {
    // prevent default action
    event.preventDefault();
    // get comment body from form
    const comment_body = document.querySelector('textarea[name="comment-body"]').value.trim();
    // get blog post id from url
    const blogPost_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // if comment body exists
    if (comment_body) {
        // post comment to api
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                comment_body,
                blogPost_id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // if comment posted successfully
        if (response.ok) {
            // reload page
            document.location.reload();
        } else {
            // alert error
            alert(response.statusText);
        }
    }
}

// add event listener to comment form
document.querySelector('.comment-form').addEventListener('submit', addComment);