// create a function to allow for signing up a new user
async function signupNewUser(event) {
    // prevent default action
    event.preventDefault();
    // get username, and password from form
    const username = document.querySelector('input[name="username"]').value.trim();
    const password = document.querySelector('input[name="password"]').value.trim();

    // if username and password exist
    if (username && password) {
        // post user to api
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // if user created successfully
        if (response.ok) {
            console.log('sign up successful');
            alert('Sign up successful! Please log in when prompted.');
            // redirect to login page
            document.location.replace('/login');
        } else {
            // alert error
            alert(response.statusText);
        }
    }
}

// create a function to allow for logging in a user
async function loginUser(event) {
    // prevent default action
    event.preventDefault();
    // get username and password from form
    const username = document.querySelector('input[name="username"]').value.trim();
    const password = document.querySelector('input[name="password"]').value.trim();

    // if username and password exist
    if (username && password) {
        // post user to api
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // if user logged in successfully
        if (response.ok) {
            console.log('login successful');
            alert('Login successful!');
            // redirect to dashboard
            document.location.replace('/dashboard');
        } else {
            // alert error
            alert(response.statusText);
        }
    }
}