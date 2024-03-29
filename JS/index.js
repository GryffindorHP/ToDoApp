// Initialize a new TaskManager with currentId set to 0
const taskManager = new TaskManager(0);

taskManager.load();

taskManager.render();


const newTaskForm = document.querySelector('#newTaskForm');

newTaskForm.addEventListener('submit', (event) => {
event.preventDefault();

    // Select the inputs
    const newTaskNameInput = document.querySelector('#newTaskNameInput');
    const newTaskDescription = document.querySelector('#newTaskDescription');
    const newTaskAssignedTo = document.querySelector('#newTaskAssignedTo');
    const newTaskDueDate = document.querySelector('#newTaskDueDate');
    const newTaskStatus = document.querySelector('#newTaskStatus');
    
    /*
        Validation code here
    */

    // Get the values of the inputs
    const validFormFieldInput = () => {
    const name = newTaskNameInput.value;
    const description = newTaskDescription.value;
    const assignedTo = newTaskAssignedTo.value;
    const dueDate = newTaskDueDate.value;
    const status = newTaskStatus.value;
    console.log("name:  "+name);
}

if (name.length === 0 || description.length === 0 || assignedTo.length === 0 || dueDate.length === 0 || status.length === 0) {
    console.log('Please Try Again!');
    var myAlert = document.getElementById('alertMe');
    myAlert.style.display = 'block';
    } else {
    console.log('Completed!');
    var myAlert = document.getElementById('alertMe');
     myAlert.style.display = 'none';
      newTaskVar.addTask();
      newTaskVar.render();  
    } 
    // Add the task to the task manager
    taskManager.addTask(name, description, assignedTo, dueDate);

    taskManager.render();
// Clear the form
    newTaskNameInput.value = '';
    newTaskDescription.value = '';
    newTaskAssignedTo.value = '';
    newTaskDueDate.value = '';
    
    
    });


    


const tasksList = document.querySelector('#tasksList');

tasksList.addEventListener('click', (event) => {
    if (event.target.classList.contains('done-button')) {
        const parentTask = event.target.parentElement.parentElement;

        const taskId = Number(parentTask.dataset.taskId);

        const task = taskManager.getTaskById(taskId);

        task.status = 'DONE';

        taskManager.save();

        taskManager.render();
    }

    // Check if a "Delete" button was clicked
    if (event.target.classList.contains('delete-button')) {
        // Get the parent Task
        const parentTask = event.target.parentElement.parentElement;

        // Get the taskId of the parent Task.
        const taskId = Number(parentTask.dataset.taskId);

        // Delete the task
        taskManager.deleteTask(taskId);

         
        // Save the tasks to localStorage
        taskManager.save();

        // Render the tasks
        taskManager.render();
    }
});

