document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    

    const form = new FormData(e.target);
    console.log(form.get("profileImage"));

    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: form.get("username"),
            email: form.get("email"),
            password: form.get("password"),
            image_data: form.get("profileImage").name
        })
    }

    console.log(form.get("profileImage"));

    const response = await fetch("http://localhost:3000/users/register", options);
    const data = await response.json();
    console.log(form.get("profileImage"));

    if (response.status == 201) {
        console.log(form.get("profileImage"));
        window.location.assign("login.html");
    } else {
        alert(data.error);
    }
})
