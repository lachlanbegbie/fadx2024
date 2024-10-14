async function getData() {
    // declare a variable for json data path
    const jsonData = "./assets/data/testdata.json";

    try {
        // fetch data and store in variable "studentData"
        const response = await fetch(jsonData);

        const studentData = await response.json();
        // console.log(studentData);

        // run function "addDataCard", which adds cards to the webpage for each item in json file
        modalInfo = studentData.students.students;
    } catch (error) {
        console.error(error.message);
    }
}




var modalInfo = [];
getData();

// close modal initialisation
const modal = document.getElementById('modal');
const modalBackground = document.getElementById('modal-background');
// listen for click outside modal
modalBackground.addEventListener("click", closeModal);


async function fillModal(modalIndex) {
    const modalFill = document.getElementById('modal-content');
    var selected = [];
    var disc = "";

    try {
        for (i = 0; i < modalInfo.length; i++) {
            if (modalInfo[i].id == modalIndex) {
                clickedItem = i;

                selected = modalInfo[clickedItem];
                console.log(selected);
            }
        }

        if (selected.discipline == "intdes") {
            disc = "Interaction Design";
        } else if (selected.discipline == "viscom") {
            disc = "Visual Communications Design";
        } else if (selected.discipline == "inddes") {
            disc = "Industrial Design";
        } else if (selected.discipline == "digmed") {
            disc = "Digital Media";
        } else if (selected.discipline == "vismar") {
            disc = "Visual Communications and Marketing Communications";
        } else {
            disc = "Other";
        }

        const containerItem = document.createElement('div');


        containerItem.innerHTML = `
            <div class="modal-intro">
                <div class="image-links">
                    <img src="./assets/img/student/${selected.headshot}" class="modal-headshot">

                    <div class="modal-social-icons">
                        <a href="${selected.linkedin}" target="_blank" class="icon"><i class="fa-brands fa-linkedin"></i></a>
                        <a href="${selected.instagram}" target="_blank" class="icon"><i class="fa-brands fa-instagram"></i></a>
                        <a href="${selected.portfolio}" target="_blank" class="icon"><i class="fa-solid fa-globe"></i></a>
                    </div>
                </div>

                <div class="modal-top">
                    <h1 class="modal-heading">${selected.name}</h1>
                    <h2 class="modal-disc">${disc}</h2>

                    <p class="modal-bio">${selected.bio}</p>
                </div>
            </div>

            <div class="modal-project">
                <img src="./assets/img/student/${selected.project}" class="modal-proj-img">

                <p class="modal-project-bio">${selected.projectbio}</p>
            </div>
        `;

        if (modalFill.childElementCount != 0) {
            modalFill.removeChild(modalFill.lastChild);
        }
        modalFill.appendChild(containerItem);
    } catch (error) {
        console.log('error: ', error);
    }
}


async function openModal(modalIndex) {
    fillModal(modalIndex);

    console.log("Here!")

    document.getElementById('body').classList.add('scrollFreeze');

    modal.classList.remove('hidden');
    modalBackground.classList.remove('hidden');

    modal.classList.add('movein');
    modalBackground.classList.add('fadein');

    await delay(500);

    modal.classList.remove('movein');
    modalBackground.classList.remove('fadein');
}


async function closeModal() {
    document.getElementById('body').classList.remove('scrollFreeze');

    modal.classList.add('moveoff');
    modalBackground.classList.add('fadeout');

    await delay(500);

    modal.classList.add('hidden');
    modalBackground.classList.add('hidden');

    modal.classList.remove('moveoff');
    modalBackground.classList.remove('fadeout');
}


function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}