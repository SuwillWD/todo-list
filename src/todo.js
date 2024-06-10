import { format } from 'date-fns';
import { storeTodoToLocalStorage, storeTodoId, updateTodoId  } from './storage.js';

class todo {

    constructor (title, description, dueDate, priority) {
        this.id = generateTodoId(),
        this.title = title,
        this.description = description,
        this.dueDate = dueDate,
        this.priority = priority,
        this.isCompleted = false
    };

};

class manageTodos {

    createTodos (title, description, dueDate, priority) {
        const todoObject = new todo(title, description, dueDate, priority);
        storeTodoToLocalStorage(todoObject);
    };


};

function generateTodoId() {
    let todoId = storeTodoId();
    todoId++;
    updateTodoId(todoId);
    return todoId;
}

const mgtTodo = new manageTodos;






export { manageTodos };