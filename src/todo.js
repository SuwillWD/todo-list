import { format } from 'date-fns';
import { storeTodoToLocalStorage } from './storage.js';


class todo {

    constructor (title, description, dueDate, priority) {
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

const mgtTodo = new manageTodos;







export { manageTodos };