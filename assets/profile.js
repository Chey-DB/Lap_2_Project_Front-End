const updateWorkshopDetails = require("./workshop-info.js");

const USERNAME = require("./login.js");

function createWorkshopElement (data) {
    const workshop = document.createElement("div");
    workshop.className = "card";

    const anchor = document.createElement("a");
    anchor.className = "image-link"
    anchor.href = "workshop-info.html";
    card.appendChild(anchor);

    const image = document.createElement("img");
    image.className = "workshop-image"
    image.src = data["image_data"];
    anchor.appendChild(image);

    const title = document.createElement("h3");
    title.className = "workshop-text";
    title.textContent = data["title"];
    anchor.appendChild(title);

    const description = document.createElement("p");
    description.className = "workshop-para";
    description.textContent = data["description"];
    card.appendChild(description);

    return workshop;
}



document.getElementById("workshop-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: form.get("title"),
            description: form.get("description"),
            location: form.get("location"),
            date: form.get("date"),
            time: form.get("time"),
            data_image: form.get("data_image").name,
            username: USERNAME
        })
    }

    const response = await fetch("http://localhost:3000/workshops", options);
    console.log(response);
    const data = await response.json();
    console.log(data);

    if (response.status == 201) {
        window.location.reload();
    } else {
        alert(data.error);
    }

    updateWorkshopDetails(data);
});


async function loadMyWorkshops () {

    const options = {
        headers: {
            'Authorization': localStorage.getItem("token")
        }
    }
    const response = await fetch("http://localhost:3000/workshops", options);

    if (response.status == 200) {
        const workshops = await response.json();
    
        const container = document.getElementById("workshops");

        workshops.forEach(p => {
            const elem = createWorkshopElement(p);
            container.appendChild(elem);
        })
    } else {
        window.location.assign("./dashboard.html");
    }

}

loadMyWorkshops();
