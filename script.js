let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskPriority = document.getElementById("taskpriority");
  const taskText = taskInput.value.trim();
  const priority = taskPriority.value;
  const taskDate = document.getElementById("taskDate").value;

  if (taskText === "") 
    return;

  tasks.push({
    text: taskText,
    completed: false,
    priority: priority,
    date: taskDate
  });
  const audio = new Audio('cool.wav');
    audio.play();
 
  saveTasks();
  displayTasks();
  updateProgress();
  taskInput.value = "";
}

function displayTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    li.classList.add(task.priority); 

    const today = new Date().toISOString().split('T')[0]; 
    
    if (task.date === today) {
    li.classList.add("today-task"); 
}

  const span = document.createElement("span"); 
  span.textContent = task.text;
   if (task.completed) {
     li.classList.add("completed"); 
    } 
   if (task.date) {
     const dateSpan = document.createElement("span");
     dateSpan.textContent = " (" + task.date + ")";
     dateSpan.style.fontSize = "0.8em";
     dateSpan.style.marginLeft = "5px";
     li.appendChild(dateSpan);
 }

   
    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✅";
    completeBtn.addEventListener("click", function () {
      toggleComplete(index);
    });

    
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.addEventListener("click", function () {
      deleteTask(index);
    });

    li.appendChild(span);
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  displayTasks();
  updateProgress();

  if (tasks[index].completed) {
    spawnConfetti(); 

    const audio = new Audio('audio.wav');
    audio.play();
}
}

function deleteTask(index) {
  const taskList = document.getElementById("taskList");
  const li = taskList.children[index];

  
  li.classList.add("removing");
  const audio = new Audio('audio.wav');
    audio.play();
  
  setTimeout(() => {
    tasks.splice(index, 1);
    saveTasks();
    displayTasks();
    updateProgress();
  }, 300); 
}
function saveTasks() { 
    localStorage.setItem("tasks", JSON.stringify(tasks));
 }

document.getElementById("clearCompletedBtn").addEventListener("click", () => {
tasks = tasks.filter(task => !task.completed);
 const audio = new Audio('cool.wav');
    audio.play();

saveTasks();
displayTasks();
updateProgress();
});
 
function spawnConfetti() {
    const container = document.querySelector('.container');
    const colors = ['#e74c3c','#f1c40f','#2ecc71','#3498db','#9b59b6'];
    
    for (let i = 0; i < 20; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * (container.offsetWidth - 10) + 'px';
        confetti.style.top = Math.random() * (container.offsetHeight / 2) + 'px';
        container.appendChild(confetti);
        confetti.addEventListener('animationend', () => confetti.remove());
    }
}

function updateProgress(){
    const total=tasks.length;
    const completedTasks=tasks.filter(task => task.completed).length;
    const progressPercent = total === 0 ? 0 : (completedTasks / total)* 100;

    const progressBar = document.getElementById("progressBar");
    progressBar.style.width = progressPercent + "%";
}

const themeToggleBtn = document.getElementById("themeToggleBtn");


// if(localStorage.getItem("theme") === "dark"){
//     document.body.classList.add("dark");
//     themeToggleBtn.textContent = "☀️ Light Mode";
// }

// themeToggleBtn.addEventListener("click", () => {
//     document.body.classList.toggle("dark");

//     if(document.body.classList.contains("dark")){
//         themeToggleBtn.textContent = "☀️ Light Mode";
//         localStorage.setItem("theme", "dark");
//     } else {
//         themeToggleBtn.textContent = "🌙 Dark Mode";
//         localStorage.setItem("theme", "light");
//     }
// });

const themeBtn = document.getElementById("themeToggleBtn");
const themeIcon = document.getElementById("themeIcon");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    
    if(document.body.classList.contains("dark")){
        themeIcon.textContent = "☀️";
    } else {
        themeIcon.textContent = "🌙"; 
    }
});

function filterTasks(filter) {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    let show = false;

    if (filter === 'all') show = true;
    if (filter === 'completed' && task.completed) show = true;
    if (filter === 'pending' && !task.completed) show = true;
    if (filter === 'high' && task.priority === 'high') show = true;
    if (filter === 'low' && task.priority === 'low') show = true;

    if (show) {
      const li = document.createElement("li");
      li.classList.add(task.priority);

      const span = document.createElement("span");
      span.textContent = task.text;

      if (task.completed) li.classList.add("completed");

      if (task.date) {
        const dateSpan = document.createElement("span");
        dateSpan.textContent = " (" + task.date + ")";
        dateSpan.style.fontSize = "0.8em";
        dateSpan.style.marginLeft = "5px";
        li.appendChild(dateSpan);
      }

      const completeBtn = document.createElement("button");
      completeBtn.textContent = "✅";
      completeBtn.addEventListener("click", function () {
        toggleComplete(index);
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "❌";
      deleteBtn.addEventListener("click", function () {
        deleteTask(index);
      });

      li.appendChild(span);
      li.appendChild(completeBtn);
      li.appendChild(deleteBtn);

      taskList.appendChild(li);
    }
  });
}