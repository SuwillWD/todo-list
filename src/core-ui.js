import Project from './project';
import Todo from './todo';
import { manageProjectStorage, manageTodoStorage } from './storage';

// Renders when first time open the app & when the current project does't have any todos
const renderTodos = () => {
    let todoContainer = document.querySelector('.todo-container');
    let todoArr = manageTodoStorage.getAllTodos(); 
    let currentProjectId = getCurrentSelectedProjectId();
    let currentProjectName = Project.getProject(currentProjectId).name;
    let currentProjectTodos = [];

    // Current project have any todos?
    let haveTodos = false;

    for (let i = 0; i < todoArr.length; i++) {
        if (todoArr[i].project == currentProjectName) {
            haveTodos = true;
            currentProjectTodos.push(todoArr[i]);
        }
    }

    while (todoContainer.children.length > 1) {
        todoContainer.removeChild(todoContainer.lastElementChild);
    }

    if (haveTodos) {
        renderStoredTodos(todoContainer, currentProjectTodos);
    }
};

// On each reload
const showAllProject = () => {
    const projectsDiv = document.querySelector('.projects');
    const storedProjects = manageProjectStorage.getAllProjects();
    projectsDiv.textContent = '';

    for (let i = 0; i < storedProjects.length; i++) {
        const projectElement = document.createElement('button');
        const deleteBtn = document.createElement('i');
        projectElement.textContent = storedProjects[i].name;
        projectElement.dataset.id = storedProjects[i].id;

        if ( i == 0) {
            projectElement.classList.add('seleted-project');
        }

        projectsDiv.appendChild(projectElement);
    }

    projectsDiv.addEventListener('click', (event) => {
        if (event.target !== event.currentTarget) {
            Array.from(projectsDiv.children).forEach(child => {
                child.className = '';
            });
            event.target.classList.add('seleted-project');  
            displayCurrentProject();
        }
    })
};

showAllProject();

// Get currently selected project
const getCurrentSelectedProjectId = () => {
    const projectsDiv = document.querySelector('.projects');

    const arr = Array.from(projectsDiv.children);
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].className == 'seleted-project') {
            return arr[i].dataset.id;
        }
    }

}

const showAddTodoBox = (() => {
    const todoBox = document.getElementById('add-todo-box');
    const addTodoBtn = document.getElementById('add-todo');

    addTodoBtn.addEventListener('click', () => {
        todoBox.showModal();
    })
})();

function showTodoDetails(title, description, dueDate, priority, status, notes, project) {
    let showTodoDetailsBox = document.getElementById('todo-details');
    let todoInfoDiv = document.querySelector('.todo-info');
    let closeBtn = document.getElementById('close-btn');

    todoInfoDiv.textContent = '';

    let todoTitle = document.createElement('div');
    todoTitle.textContent = title;
    todoInfoDiv.appendChild(todoTitle);
    
    let todoDescription = document.createElement('div');
    todoDescription.textContent = description;
    todoInfoDiv.appendChild(todoDescription);

    let todoDueDate = document.createElement('div');
    todoDueDate.textContent = dueDate;
    todoInfoDiv.appendChild(todoDueDate);

    let todoPriority = document.createElement('div');
    todoPriority.textContent = priority;
    todoInfoDiv.appendChild(todoPriority);

    let todoStatus = document.createElement('div');
    todoStatus.textContent = status;
    todoInfoDiv.appendChild(todoStatus);

    let todoNotes = document.createElement('div');
    todoNotes.textContent = notes;
    todoInfoDiv.appendChild(todoNotes);
    
    let todoProject = document.createElement('div');
    todoProject.textContent = project;
    todoInfoDiv.appendChild(todoProject);

    closeBtn.addEventListener('click', () => {
        showTodoDetailsBox.close();
    })

    showTodoDetailsBox.showModal();
}

function renderStoredTodos(todoContainer, currentProjectTodos) {
    let currentProjectId = getCurrentSelectedProjectId();
    for (let i = 0; i < currentProjectTodos.length; i++) {
        const todoWrapper = document.createElement('div');
        todoWrapper.classList.add('todo-wrapper');

        const inputContainer = document.createElement('div');
        const checkbox = document.createElement('input');
        
        checkbox.type = 'checkbox';
        inputContainer.appendChild(checkbox);
        todoWrapper.appendChild(inputContainer);

        const todoTitle = document.createElement('div');
        todoTitle.textContent = currentProjectTodos[i].title;
        todoWrapper.appendChild(todoTitle);

        const todoStatus = document.createElement('div');
        todoStatus.textContent = currentProjectTodos[i].isCompleted ? 'Completed': 'In progress';
        todoWrapper.appendChild(todoStatus);

        checkbox.addEventListener('change', (event) => {
            if (event.target.checked) {
                Todo.updateTodoStatus(currentProjectTodos[i].id);
                todoStatus.textContent = 'Completed';
            } else {
                Todo.updateTodoStatus(currentProjectTodos[i].id);
                todoStatus.textContent = 'In progress';
            }
        })

        const todoPriority = document.createElement('div');
        todoPriority.textContent = currentProjectTodos[i].priority;
        todoWrapper.appendChild(todoPriority);

        const todoDueDate = document.createElement('div');
        todoDueDate.textContent = currentProjectTodos[i].dueDate;
        todoWrapper.appendChild(todoDueDate);

        const deleteTodo = document.createElement('div');
        deleteTodo.classList.add('todo-btn');
        deleteTodo.innerHTML = '<i class="bx bx-trash" />';
        todoWrapper.appendChild(deleteTodo);

        deleteTodo.addEventListener('click', () => {
            deleteCurrentTodo(currentProjectTodos[i].id);
        })

        todoTitle.addEventListener('click', () => {
            showTodoDetails(todoTitle.textContent, currentProjectTodos[i].description, todoDueDate.textContent, todoPriority.textContent, todoStatus.textContent, currentProjectTodos[i].notes, currentProjectTodos[i].project);
        })

        todoContainer.appendChild(todoWrapper);
    }

};

const createNewTodo = (() => {
    const confirmBtn = document.getElementById('confirm');
    const todoBox = document.getElementById('add-todo-box');
    const todoForm = document.querySelector('#add-todo-box form');

    confirmBtn.addEventListener('click', (event) => {
        event.preventDefault();

        let todoTitle = document.getElementById('title').value;
        let todoDescription = document.getElementById('description').value;
        let todoDueDate = String(document.getElementById('due-date').value);
        let todoPriority = document.getElementById('priority').value;
        let todoNotes = document.getElementById('notes').value;
        let todoProject = Project.getProject(getCurrentSelectedProjectId()).name;

        const newTodo = new Todo(todoTitle, todoDescription, todoDueDate, todoPriority, todoNotes, todoProject);
        newTodo.createTodos();
        displayCurrentProject();

        todoForm.reset();
        todoBox.close();
    })
})();

function deleteCurrentTodo(currentTodoId) {

    Todo.deleteTodo(currentTodoId);

    renderTodos();
}

const createNewProject = (() => {
    const addProjectBtn = document.getElementById('add-project');
    const projectsDiv = document.querySelector('.projects');
    let projectName = '';
    const addProjectInput = document.createElement('input');
    addProjectInput.place = 'Project Name';

    addProjectInput.addEventListener('keydown', (event) => {
        if (event.key == 'Enter') {
            projectName = addProjectInput.value;
            projectsDiv.lastElementChild.remove();

            const project = new Project(projectName);
            project.createProject();

            showAllProject();
        }
    })

    addProjectBtn.addEventListener('click', () => {
        projectsDiv.appendChild(addProjectInput);
        addProjectInput.focus();
    })

})();

const updateProjectStatus = (() => {
    const projectStatusSelect = document.querySelector('#project-status');

    projectStatusSelect.addEventListener('change', (event) => {
        let currentStatus = event.target.value;

        let currentProjectId = getCurrentSelectedProjectId();
        Project.updateProjectStatus(currentProjectId);

    })
})();

function displayCurrentProject() {
    const projectHeading = document.getElementById('project-title');
    const currentProjectId = getCurrentSelectedProjectId();
    const currentProjectTitle = Project.getProject(currentProjectId).name;

    projectHeading.textContent = currentProjectTitle;
    renderTodos();
}

const initialProjectStatus = (() => {
    const projectStatusSelect = document.querySelector('#project-status');
    const currentProjectId = getCurrentSelectedProjectId();
    const currentSelectedProjectStatus = Project.getProject(currentProjectId).isCompleted;
    

    if (currentSelectedProjectStatus) {
        projectStatusSelect.value = 'Completed';
    } else {
        projectStatusSelect.value = 'Ongoing';
    }
    displayCurrentProject();
    
})();

const deleteProject = (() => {
    const deleteProjectBtn = document.getElementById('delete-project');

    deleteProjectBtn.addEventListener('click', () => {
        const currentProjectId = getCurrentSelectedProjectId();
        Project.deleteProject(currentProjectId);
        showAllProject();
        displayCurrentProject();
    })
})();


export { getCurrentSelectedProjectId };