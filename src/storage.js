function storageRecordExits() {
    return localStorage["todoObjects"] ? 1 : null;
}

function storeTodoToLocalStorage (todoObject) {
    if (localStorage["todoObjects"]) {
        const tempTodoArray = retrieveTodosFromLocalStorage();
        tempTodoArray.push(todoObject);
        localStorage.setItem('todoObjects', JSON.stringify(tempTodoArray));        
    } else {
        localStorage.setItem('todoObjects', 
            JSON.stringify([todoObject])
        );
    }
};

function retrieveTodosFromLocalStorage() {
    return [...JSON.parse(
        localStorage['todoObjects']
    )];
};

function updateTodos(todoArray) {
    localStorage["todoObjects"] = JSON.stringify(todoArray);
}

function storeTodoId () {
    if (!localStorage["todoId"]) {
        localStorage["todoId"] = 0;
        return 0;
    } else {
        return localStorage["todoId"];
    }
}

function updateTodoId(todoId) {
    localStorage["todoId"] = todoId;
}

export { storeTodoToLocalStorage, retrieveTodosFromLocalStorage, updateTodos, storeTodoId, updateTodoId };