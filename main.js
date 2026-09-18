// CLOCK

function updateClock() {
    document.getElementById("timeElement").textContent =
        new Date().toLocaleString();
}

updateClock();
setInterval(updateClock, 1000);


// WINDOWS

const welcomeWindow = document.getElementById("welcomeWindow");
const notesWindow = document.getElementById("notesWindow");

welcomeWindow.style.display = "flex";

document.getElementById("welcomeClose").onclick = () => {
    welcomeWindow.style.display = "none";
};

document.getElementById("notesClose").onclick = () => {
    notesWindow.style.display = "none";
    notesIcon.classList.remove("selected");
};



const notesIcon = document.getElementById("notesIcon");

notesIcon.addEventListener("click", () => {

    notesWindow.style.display = "flex";

    notesIcon.classList.add("selected");

});


dragElement(welcomeWindow);
dragElement(notesWindow);

function dragElement(element) {

    let pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;

    const header = document.getElementById(element.id + "header");

    if (header) {

        header.onmousedown = dragMouseDown;

    } else {

        element.onmousedown = dragMouseDown;

    }

    function dragMouseDown(e) {

        e.preventDefault();

        pos3 = e.clientX;
        pos4 = e.clientY;

        document.onmouseup = closeDrag;
        document.onmousemove = elementDrag;

    }

    function elementDrag(e) {

        e.preventDefault();

        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;

        pos3 = e.clientX;
        pos4 = e.clientY;

        element.style.top =
            (element.offsetTop - pos2) + "px";

        element.style.left =
            (element.offsetLeft - pos1) + "px";

    }

    function closeDrag() {

        document.onmouseup = null;
        document.onmousemove = null;

    }

}


let notes =
    JSON.parse(localStorage.getItem("notes")) || [

        {
            title: "Welcome",
            content: "Welcome to YashOS Notes!"
        }

    ];

let selectedNote = 0;


const noteList = document.getElementById("noteList");

const noteTitle = document.getElementById("noteTitle");

const noteContent = document.getElementById("noteContent");

const newBtn = document.getElementById("newNoteBtn");


function saveNotes() {

    localStorage.setItem(
        "notes",
        JSON.stringify(notes)
    );

}


function displayNote(index) {
    selectedNote = index;

    noteTitle.value =
        notes[index].title;

    noteContent.value =
        notes[index].content;

    renderSidebar();

}


function renderSidebar() {

    noteList.innerHTML = "";

    notes.forEach((note, index) => {

        const div = document.createElement("div");

        div.className = "noteItem";

        if (index === selectedNote) {

            div.classList.add("active");

        }

        div.textContent =
            note.title || "Untitled";

        div.onclick = () => {
            displayNote(index);
        };

        div.ondblclick = () => {

            if (confirm("Delete this note?")) {
                notes.splice(index, 1);

                if (notes.length === 0) {

                    notes.push({

                        title: "Untitled",
                        content: ""

                    });

                }

                selectedNote = 0;

                saveNotes();

                displayNote(0);

            }

        };

        noteList.appendChild(div);

    });

}




newBtn.onclick = () => {

    notes.unshift({

        title: "New Note",
        content: ""

    });

    selectedNote = 0;

    saveNotes();

    displayNote(0);

};


// auto save

noteTitle.addEventListener("input", () => {

    notes[selectedNote].title =
        noteTitle.value;

    saveNotes();

    renderSidebar();

});

noteContent.addEventListener("input", () => {

    notes[selectedNote].content =
        noteContent.value;

    saveNotes();

});



renderSidebar();

displayNote(selectedNote);