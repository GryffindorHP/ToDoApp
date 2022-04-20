const createTaskHtml = (name,description,assignedTo,dueDate,status) => {
    let html;
    if (status !== "TODO"){
        html = `
        <ul class="list-group list-group-horizontal">
                </ul>
                <div class="jumbotron">
                    <h1 class="display-4">My Tasks</h1>
                    <div id="list-items">
                        <div class="card" style="width: 18rem;">                
                            <div class="card-body">
                                <h5 class="card-title">${name}</h5>
                                <p class="card-text">${description}</p>
                                <p class="card-text">${assignedTo}</p>
                                <p class="card-text">${dueDate}</p>; June 2 - 2022</p>
                                <span class="badge badge-primary">${status}</span>
                                <a href="#" class="btn btn-primary">Delete</a>
                            </div>
                        </div>`

    }else{
        html = `

        <div class="card" style="width: 18rem;">                
                            <div class="card-body">
                                <h5 class="card-title">${name}</h5>
                                <p class="card-text">${description}</p>
                                <p class="card-text">${assignedTo}</p>
                                <p class="card-text">${dueDate}: Apr 10 - 2022</p>
                                <span class="badge badge-success">${status}</span>
                                <a href="#" class="btn btn-primary">Delete</a>
                            </div>
                        </div>`
    }
    return html;
}
    
                        



class TaskManager {
    constructor(currentId) {
      this.tasks = [];
      this.currentId = 0;
    }
  
    addTask(name, description, assignedTo, dueDate) {
      var name = document.querySelector("#name").value;
      var description = document.querySelector("#description").value;
      var assignedTo = document.querySelector("#assignedTo").value;
      var dueDate = document.querySelector("#dueDate").value;
      var status = 'TODO';
  
      const task = {
        id: this.currentId++,
        name: document.querySelector("#name").value,
        description: document.querySelector("#description").value,
        assignedTo: document.querySelector("#assignedTo").value,
        dueDate: document.querySelector("#dueDate").value,
        status: 'TODO'
  
      }
  
      this.tasks.push(task);
    }
  
    render() {
      var tasksHtmlList = [];
      var tasksHtmlVar = tasksHtmlList;
  
      for(let i = 0; i < this.tasks.length; i++){
        var currentTask = this.tasks[i];
        const newDate = new Date(currentTask.dueDate);
        // due to time zones, date is ahead by one day
        const formattedDate = (newDate.getMonth() + 1) + '/' + newDate.getDate() + '/' + newDate.getFullYear();
        var taskHtml = createTaskHtml(currentTask.id, currentTask.name, currentTask.description, currentTask.assignedTo, formattedDate, currentTask.status);
        tasksHtmlList.push(taskHtml);
        for(let i = 0; i < tasksHtmlList.length; i++){
          document.getElementById("taskList").innerHTML = tasksHtmlList;
        }
      }
        const tasksHtml = tasksHtmlList.join('\n');
        const tasksList = document.querySelector('#taskList');
        tasksList.innerHTML = tasksHtml;
    }
  
    getTaskById(taskId) {
      var foundTask = taskId;
      for(let x = 0; x < this.tasks.length; x++){
        let task = this.tasks[x];
        if (task.id == foundTask){
          return task;
        }
      }
    }
  
    save() {
      var tasksJson = JSON.stringify(this.tasks);
      localStorage.setItem('tasks', tasksJson);
      var currentId = String(this.currentId);
      localStorage.setItem('currentId', currentId);
  }
  
    load() {
      if (localStorage.getItem('tasks')) {
          const tasksJson = localStorage.getItem('tasks');
          this.tasks = JSON.parse(tasksJson);
      }
  
      if (localStorage.getItem('currentId')) {
          const currentId = localStorage.getItem('currentId');
          this.currentId = Number(currentId);
      }
    }
  
    deleteTask(taskId) {
        // Create an empty array and store it in a new variable, newTasks
        const newTasks = [];
  
        // Loop over the tasks
        for (let i = 0; i < this.tasks.length; i++) {
            // Get the current task in the loop
            const task = this.tasks[i];
  
            // Check if the task id is not the task id passed in as a parameter
            if (task.id !== taskId) {
                // Push the task to the newTasks array
                newTasks.push(task);
            }
        }
  
        // Set this.tasks to newTasks
        this.tasks = newTasks;
    } 
  }
  
  
  var newTaskVar = new TaskManager();
  
  newTaskVar.load();
  newTaskVar.render();
  