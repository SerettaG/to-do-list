let progress = 0;

// Function to increase progress
function increaseProgress() {
    if (progress < 100) {
        progress += 10;
        document.getElementById('progress-bar').style.width = progress + '%';
    }
}

// Setting up date functionality
const today = new Date();
const dayName = today.toLocaleDateString("en-US", { weekday: "long"});
const dayNumber = today.getDate();
const monthName = today.toLocaleDateString("en-US", { month: "long"});

// Retrieving the date name, number and month name 
// Should give us something like: Monday, November 3
document.getElementById("date").textContent = `${dayName}, ${monthName} ${dayNumber}`;

// Button for the task text
const addBtn = document.getElementById("addBtn");
const newTask = document.getElementById("newTask");
const tasks = document.getElementById("tasks");

addBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const taskText = newTask.value.trim();
    if (taskText !== "") {
        const task = document.createElement("div");
        task.className = "task";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.addEventListener("change", updateProgress);

        const textSpan = document.createElement("span");
        textSpan.textContent = taskText;
        textSpan.className = "taskText";

        const removeBtn = document.createElement("button");
        const removeIcon = document.createElement("img");
        removeBtn.style.backgroundColor = "transparent";
        removeBtn.style.borderStyle = "none";
        // Save a photo in the same directory and name it x.png
        removeIcon.src = "x.png"
        removeIcon.style.width = "75px";
        removeIcon.style.height = "75px";
        removeBtn.appendChild(removeIcon);

        removeBtn.addEventListener("click", () => {
            task.remove();
            updateProgress();
        });

        task.appendChild(checkbox);
        task.appendChild(textSpan);
        task.appendChild(removeBtn);

        tasks.appendChild(task);
        newTask.value = "";
        updateProgress();
    }
});

// Function to update progress
function updateProgress() {
    const checkboxes = document.querySelectorAll('.task input[type="checkbox"]');
    const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
    const total = checkboxes.length;

    const progressPercent = total === 0 ? 0 : (checked / total) * 100;
    document.querySelector('.progress-bar').style.width = `${progressPercent}%`;

    const label = document.getElementById("progress-label");
    label.textContent = `${checked} / ${total} tasks done`;
}

