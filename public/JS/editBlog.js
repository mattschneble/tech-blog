// create a function to edit a blog post
async function editBlogPost(event) {
    // prevent default action
    event.preventDefault();
    // get blog post information from form
    const blogTitle = document.querySelector('input[name="blog-title"]').value.trim();
    const blogContent = document.querySelector('textarea[name="blog-content"]').value.trim();
    // get blog post id from url
    const blogPostID = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // edit blog post in api
    const response = await fetch(`/api/blogPosts/${blogPostID}`, {
        method: 'PUT',
        body: JSON.stringify({
            blogTitle,
            blogContent
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    // if blog post edited successfully
    if (response.ok) {
        // redirect to dashboard to view blog post
        document.location.replace('/dashboard');
    } else {
        // alert error
        alert(response.statusText);
    }
}