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
    
                        



// create a TaskManager class
class TaskManager {
    constructor(currentId = 0) {
        this.tasks = [];
        // this.currentId = 0;
        this.currentId = currentId;
    }

    //Create the addTask method
    addTask(name, description, assignedTo, dueDate, ) {
        const task = {
            // Increment the currentId property
            id: this.currentId++,
            name: name,
            description: description,
            assignedTo: assignedTo,
            dueDate: dueDate,
            status: 'TODO'
        };

        this.tasks.push(task);
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



    getTaskById(taskId) {
        let foundTask;

        for (let i = 0; i < this.tasks.length; i++) {
            const task = this.tasks[i];

            if (task.id === taskId) {
                foundTask = task;
            }
        }

        return foundTask;
    }

    render() {
        const tasksHtmlList = [];
        
        for (let i = 0; i < this.tasks.length; i++) {
            const task = this.tasks[i];
            const date = new Date(task.dueDate);
            const formattedDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
            const taskHtml = createTaskHtml(task.id, task.name, task.description, task.assignedTo, formattedDate, task.status);
            tasksHtmlList.push(taskHtml);
        } 

        const tasksHtml = tasksHtmlList.join('\n');
        const tasksList = document.querySelector('#tasksList');
        tasksList.innerHTML = tasksHtml;
    }

    // Create the save method
    save() {
        // Create a JSON string of the tasks
        const tasksJson = JSON.stringify(this.tasks);
        // Store the JSON string in localStorage
        localStorage.setItem('tasks', tasksJson);

        // Convert the currentId to a string;
        const currentId = String(this.currentId);

        // Store the currentId in localStorage
        localStorage.setItem('currentId', currentId);
    }

    // Create the load method
    load() {
        // Check if any tasks are saved in localStorage
        if (localStorage.getItem('tasks')) {
            // Get the JSON string of tasks in localStorage
            const tasksJson = localStorage.getItem('tasks');

            // Convert it to an array and store it in our TaskManager
            this.tasks = JSON.parse(tasksJson);
        }

        // Check if the currentId is saved in localStorage
        if (localStorage.getItem('currentId')) {
            // Get the currentId string in localStorage
            const currentId = localStorage.getItem('currentId');

            // Convert the currentId to a number and store it in our TaskManager
            this.currentId = Number(currentId);
        }
    }
}
// adding the task//