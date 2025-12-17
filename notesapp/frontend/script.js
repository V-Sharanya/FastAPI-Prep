const notesDiv = document.getElementById("notes");

// Load notes on page load
document.addEventListener("DOMContentLoaded", loadNotes);

function addNote() {
    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();

    if (!title || !content) return;

    const note = {
        id: Date.now(),
        title,
        content
    };

    const notes = getNotesFromStorage();
    notes.unshift(note);
    saveNotesToStorage(notes);

    renderNote(note);

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
}

function renderNote(note) {
    const noteCard = document.createElement("div");
    noteCard.className = "note-card";
    noteCard.dataset.id = note.id;

    noteCard.innerHTML = `
        <button class="delete-btn">✕</button>
        <h3>${note.title}</h3>
        <p>${note.content}</p>
    `;

    noteCard.querySelector(".delete-btn").onclick = () => deleteNote(note.id);

    notesDiv.prepend(noteCard);
}

function deleteNote(id) {
    let notes = getNotesFromStorage();
    notes = notes.filter(note => note.id !== id);
    saveNotesToStorage(notes);

    document.querySelector(`[data-id="${id}"]`).remove();
}

function loadNotes() {
    const notes = getNotesFromStorage();
    notes.forEach(renderNote);
}

function getNotesFromStorage() {
    return JSON.parse(localStorage.getItem("notes")) || [];
}

function saveNotesToStorage(notes) {
    localStorage.setItem("notes", JSON.stringify(notes));
}
