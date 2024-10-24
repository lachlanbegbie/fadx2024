async function doCardStuff() {
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

doCardStuff();



function addDataCard(data) {
    // get container where all cards are places
    const container = document.getElementById("spotlight-container");

    container.innerHTML = "";

    // console.log(data);

    let numbers = [];
    let range = Array.from({length: 17}, (_, i) => i);
    
    // Shuffle and pick the first 8 numbers
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * range.length);

        numbers.push(range[randomIndex]);
        range.splice(randomIndex, 1); // Remove the chosen number from the range
    }

    console.log(numbers);

    // loop through each item to fill a card
    for (let i = 0; i < numbers.length; i++) {
        // console.log(data[i]);

        // change discipline codes into string text
        var disc = "";
        var tag = "";

        let setItem = numbers[i];

        console.log(data[setItem]);

        if (data[setItem].discipline == "intdes") {
            disc = "Interaction Design";
        } else if (data[setItem].discipline == "viscom") {
            disc = "Visual Communications Design";
        } else if (data[setItem].discipline == "inddes") {
            disc = "Industrial Design";
        } else if (data[setItem].discipline == "digmed") {
            disc = "Digital Media";
        } else if (data[setItem].discipline == "vismar") {
            disc = "Visual Communications/";
            tag = "Marketing Communications";
        } else {
            disc = "Other";
        }

        // create card element and give it a class
        let card = document.createElement("div");
        card.className = "card";

        // fill the card with HTML data
        card.innerHTML = `
            <div class="card-div" id="${data[setItem].discipline}"><img src="./assets/img/student/${data[setItem].headshot}" alt=""></div>
            <h4 class="name">${data[setItem].name}</h4>
            <div class="dicipline ${data[setItem].discipline}" id="${data[setItem].discipline}">
                <h5>${disc}<br>${tag}</h5>
            </div>
            <div class="social-icons">
                <a href="${data[setItem].linkedin}" target="_blank" class="icon"><i class="fa-brands fa-linkedin"></i></a>
                <a href="${data[setItem].instagram}" target="_blank" class="icon"><i class="fa-brands fa-instagram"></i></a>
                <a href="${data[setItem].portfolio}" target="_blank" class="icon"><i class="fa-solid fa-globe"></i></a>
            </div>
        `

        // set attributes in HTML to be used for modal
        card.setAttribute('modal-index', `${data[setItem].id}`);
        card.setAttribute('onClick', `openModal(${data[setItem].id})`);

        // add the current iteration to the end of the container's child list
        container.appendChild(card);
    }
}