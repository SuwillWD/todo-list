// Storage Implementation using localStorage

// For todos
const storeTodo = (todoObject) => {
    if (localStorage["todoObjects"]) {
        const tempTodoArray = getAllTodos();
        tempTodoArray.push(todoObject);
        localStorage.setItem('todoObjects', JSON.stringify(tempTodoArray));        
    } else {
        localStorage.setItem('todoObjects', 
            JSON.stringify([todoObject])
        );
    }
};

const getAllTodos = () => {
    if (localStorage['todoObjects']) {
        return [...JSON.parse(localStorage['todoObjects'])];
    } else {
        return [];
    }
};

function updateTodos(todoArray) {
    localStorage["todoObjects"] = JSON.stringify(todoArray);
}

// For projects
const storeProject = (projectObject) => {
    if (localStorage["projectObjects"]) {
        const tempProjectArray = getAllProjects();
        tempProjectArray.push(projectObject);
        localStorage.setItem('projectObjects', JSON.stringify(tempProjectArray));        
    } else {
        localStorage.setItem('projectObjects', 
            JSON.stringify([projectObject])
        );
    }
};

const getAllProjects = () => ([...JSON.parse(localStorage['projectObjects'])]);

function updateProjects(projectArray) {
    localStorage["projectObjects"] = JSON.stringify(projectArray);
}

const manageTodoStorage = { storeTodo, getAllTodos, updateTodos };
const manageProjectStorage = { storeProject, getAllProjects, updateProjects };

export { manageTodoStorage, manageProjectStorage };