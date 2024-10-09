
async function doStuff() {
    // declare a variable for json data path
    const jsonData = "./assets/data/testdata.json";
    
    try {
        // fetch data and store in variable "studentData"
        const response = await fetch(jsonData);

        const studentData = await response.json();
        // console.log(studentData);

        // run function "addDataCard", which adds cards to the webpage for each item in json file
        addDataCard(studentData.students.students);
    } catch (error) {
        console.error(error.message);
    }

    
}

doStuff();



function addDataCard(data) {
    // get container where all cards are places
    const container = document.getElementById("spotlight-container");

    // console.log(data);

    // loop through each item to fill a card
    for (let i=0; i < data.length; i++) {
        // console.log(data[i]);

        // change discipline codes into string text
        var disc = "Undefined";

        if (data[i].discipline == "intdes") {
            disc = "Interaction Design";
        } else if (data[i].discipline == "viscom") {
            disc = "Visual Communications Design";
        } else if (data[i].discipline == "inddes") {
            disc = "Industrial Design";
        } else if (data[i].discipline == "digmed") {
            disc = "Digital Media";
        } else {
            disc = "Other";
        }

        // create card element and give it a class
        let card = document.createElement("div");
        card.className = "card";
        
        // fill the card with HTML data
        card.innerHTML = `
            <img src="./assets/img/student/${data[i].headshot}" alt="">
            <h4 class="name">${data[i].name}</h4>
            <div class="dicipline ${data[i].discipline}" id="${data[i].discipline}">
                <h5>${disc}</h5>
            </div>
            <div class="social-icons">
                <a href="${data[i].linkedin}" target="_blank" class="icon"><i class="fa-brands fa-linkedin"></i></a>
                <a href="${data[i].instagram}" target="_blank" class="icon"><i class="fa-brands fa-instagram"></i></a>
                <a href="${data[i].portfolio}" target="_blank" class="icon"><i class="fa-solid fa-globe"></i></a>
            </div>
        `

        // set attributes in HTML to be used for modal
        card.setAttribute('modal-index', `${data[i].id}`);
        card.setAttribute('onClick', `openModal(${data[i].id})`);

        // add the current iteration to the end of the container's child list
        container.appendChild(card);
    }
}