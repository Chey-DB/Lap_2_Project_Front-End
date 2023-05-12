async function updateWorkshopDetails (data) {

    const response = await fetch("http://localhost:3000/workshops/lastWorkshop");

    if (response.status == 200) {
        const workshops = await response.json();
        updateWorkshopDetails(workshops);

        const title = document.getElementById("workshop-title");
        const description = document.getElementById("info");
        const location = document.getElementById("location");
        const date = document.getElementById("date");
        const time = document.getElementById("time");
        const image = document.getElementById("workshop-image");

        title.innerHTML = data["title"];
        description.innerHTML = data["description"];
        location.innerHTML = data["location"];
        date.innerHTML = data["date"];
        time.innerHTML = data["time"];
        image.innerHTML = data["image_data"];
    } else {
        alert(data.error);
    }
}

module.exports = updateWorkshopDetails;

