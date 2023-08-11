// create a function to logout
async function logout() {
    // post logout to api
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    // if logout successful
    if (response.ok) {
        // redirect to homepage
        document.location.replace('/');
    } else {
        // alert error
        alert(response.statusText);
    }
}

// add event listener to logout button
document.querySelector('#logout').addEventListener('click', logout);