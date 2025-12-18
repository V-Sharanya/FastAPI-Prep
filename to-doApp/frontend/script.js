const API_URL = "http://127.0.0.1:8000";

async function addTask() {
    const title = document.getElementById("title").value.trim();
    const due_date = document.getElementById("due_date").value;
    const priority = parseInt(document.getElementById("priority").value);

    if (!title) {
        alert("Title is required");
        return;
    }

    const res = await fetch(`${API_URL}/todo_items/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title,
            completed: false,
            due_date: due_date || null,
            priority
        })
    });

    if (!res.ok) {
        alert("Failed to add task");
        return;
    }

    document.getElementById("title").value = "";
    document.getElementById("due_date").value = "";

    loadTasks();
}

async function loadTasks() {
    const res = await fetch(`${API_URL}/todo_items/`);
    const tasks = await res.json();

    const list = document.getElementById("tasks");
    list.innerHTML = "";

    tasks.forEach(task => {
        const card = document.createElement("div");
        card.className = `task-card ${task.completed ? "done" : ""}`;

        card.innerHTML = `
            <div class="task-header">
                <h3>${task.title}</h3>
                <span class="priority p${task.priority}">
                    Priority ${task.priority}
                </span>
            </div>

            <div class="task-body">
                ${task.due_date ? `Due: ${task.due_date.split("T")[0]}` : "No due date"}
            </div>

            <div class="task-actions">
                <button class="btn done-btn"
                onclick="toggleTask(
                    ${task.id},
                    ${task.completed},
                    '${task.title}',
                    ${task.priority},
                    ${task.due_date ? `'${task.due_date}'` : null}
                )">
                ${task.completed ? "Undo" : "Done"}
            </button>

            <button class="btn edit-btn" onclick="openEdit(
                ${task.id},
                '${task.title}',
                ${task.priority},
                ${task.due_date ? `'${task.due_date}'` : null},
                ${task.completed}
            )">
                Edit
            </button>

                <button class="btn delete-btn" onclick="deleteTask(${task.id})">
                    Delete
                </button>
            </div>
        `;

        list.appendChild(card);
    });
}

async function toggleTask(id, completed, title, priority, due_date) {
    const res = await fetch(`${API_URL}/todo_items/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title,
            completed: !completed,
            due_date,
            priority
        })
    });

    if (!res.ok) {
        alert("Failed to update task");
        return;
    }

    loadTasks();
}


async function deleteTask(id) {
    const res = await fetch(`${API_URL}/todo_items/${id}`, {
        method: "DELETE"
    });

    if (!res.ok) {
        alert("Failed to delete task");
        return;
    }

    loadTasks();
}


let editTaskId = null;
let editCompleted = false;

function openEdit(id, title, priority, due_date, completed) {
    editTaskId = id;
    editCompleted = completed;

    document.getElementById("edit_title").value = title;
    document.getElementById("edit_priority").value = priority;
    document.getElementById("edit_due_date").value = due_date
        ? due_date.split("T")[0]
        : "";

    document.getElementById("editModal").classList.remove("hidden");
}

function closeEdit() {
    document.getElementById("editModal").classList.add("hidden");
}

async function saveEdit() {
    const title = document.getElementById("edit_title").value.trim();
    const priority = parseInt(document.getElementById("edit_priority").value);
    const due_date = document.getElementById("edit_due_date").value || null;

    if (!title) {
        alert("Title is required");
        return;
    }

    const res = await fetch(`${API_URL}/todo_items/${editTaskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title,
            completed: editCompleted,
            priority,
            due_date
        })
    });

    if (!res.ok) {
        alert("Failed to update task");
        return;
    }

    closeEdit();
    loadTasks();
}


window.onload = loadTasks;
