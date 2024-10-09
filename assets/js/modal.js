var modalInfo = [];

// close modal initialisation
const modal = document.getElementById('modal');
const modalBackground = document.getElementById('modal-background');
// listen for click outside modal
modalBackground.addEventListener("click", closeModal);


async function fillModal(modalIndex) {
    const modalFill = document.getElementById('modal-content');

    try {
        for (i=0; i < modalInfo.length; i++) {
            if (modalInfo[i][0] == modalIndex) {
                clickedItem = i;
                console.log(modalInfo[clickedItem][1]);
            }
        }

        const containerItem = document.createElement('div');


        containerItem.innerHTML = `
            <div class="modal-intro">
                <div class="image-links">
                    <img src="./assets/img/student/hs-lachlanbegbie.jpg" class="modal-headshot">

                    <div class="modal-social-icons">
                        <a href="#" target="_blank" class="icon"><i class="fa-brands fa-linkedin"></i></a>
                        <a href="#" target="_blank" class="icon"><i class="fa-brands fa-instagram"></i></a>
                        <a href="#" target="_blank" class="icon"><i class="fa-solid fa-globe"></i></a>
                    </div>
                </div>

                <div class="modal-top">
                    <h1 class="modal-heading">Lachlan Begbie</h1>
                    <h2 class="modal-disc">Interaction Design</h2>

                    <p class="modal-bio">I'm Lachlan Begbie, and I've just completed my Bachelor of Design (Interaction Design). I 
                    have engaged with projects to develop usable digital systems, and considered the application of user psychology 
                    to the design of the web.</p>
                </div>
            </div>

            <div class="modal-project">
                <img src="./assets/img/student/pi-lachlanbegbie.jpg" class="modal-proj-img">

                <p class="modal-project-bio">The project I have on display is a web-based portfolio for a photographer. It considers the way 
                items are collected online, and how the work of the artist is best put on display.</p>
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