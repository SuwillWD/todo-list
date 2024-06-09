function storageRecordExits() {
    return localStorage["todoObjects"] ? 1 : null;
}

function storeTodoToLocalStorage (todoObject) {
    if (localStorage["todoObjects"]) {
        console.log('Then Here');
        const tempTodoArray = retrieveTodosFromLocalStorage();
        tempTodoArray.push(todoObject);
        localStorage.setItem('todoObjects', JSON.stringify(tempTodoArray));        
    } else {
        console.log('First here');
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

export { storeTodoToLocalStorage };