const API_URL = "http://127.0.0.1:8000";

function addNote() {
    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();

    if (!title || !content) return;

    const notesDiv = document.getElementById("notes");

    const noteCard = document.createElement("div");
    noteCard.className = "note-card";

    noteCard.innerHTML = `
        <button class="delete-btn" onclick="this.parentElement.remove()">✕</button>
        <h3>${title}</h3>
        <p>${content}</p>
    `;

    notesDiv.prepend(noteCard);

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
}




async function loadNotes() {
    const res = await fetch(`${API_URL}/notes`);
    const notes = await res.json();

    const list = document.getElementById("notes");
    list.innerHTML = "";

    notes.forEach(note => {
        const li = document.createElement("li");

        li.innerHTML = `
            <strong>${note.title}</strong>: ${note.content}
            <button onclick="deleteNote(${note.id})">Delete</button>
        `;

        list.appendChild(li);
    });
}

  
loadNotes();