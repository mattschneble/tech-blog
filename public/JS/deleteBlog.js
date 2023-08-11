// create a function to delete a blog post
async function deleteBlogPost(event) {
    // prevent default action
    event.preventDefault();
    // get blog post id from url
    const blogPostID = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // delete blog post from api
    const response = await fetch(`/api/blogPosts/${blogPostID}`, {
        method: 'DELETE'
    });

    // if blog post deleted successfully
    if (response.ok) {
        // redirect to dashboard
        document.location.replace('/dashboard');
    } else {
        // alert error
        alert(response.statusText);
    }
}

// add event listener to delete blog post button
document.querySelector('.delete-blog-btn').addEventListener('click', deleteBlogPost);