// create a function to create a blog post
async function createBlogPost(event) {
    // prevent default action
    event.preventDefault();
    // get title and content from form
    const blogTitle = document.querySelector('input[name="blog-title"]').value.trim();
    const blogContent = document.querySelector('textarea[name="blog-content"]').value.trim();
    
    const response = await fetch('/api/blogPosts', {
        method: 'POST',
        body: JSON.stringify({
            blogTitle,
            blogContent
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    // if blog post created successfully
    if (response.ok) {
        // redirect to dashboard to view blog post
        document.location.replace('/dashboard');
    } else {
        // alert error
        alert(response.statusText);
    }
}

// add event listener to create blog post form
document.querySelector('.create-blog-form').addEventListener('submit', createBlogPost);