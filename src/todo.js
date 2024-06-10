import { format } from 'date-fns';
import { storeTodoToLocalStorage, retrieveTodosFromLocalStorage, updateTodosOfLocalStorage,  storeTodoIdInLocalStorage, updateTodoIdInLocalStorage  } from './storage-project.js';

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

    deleteTodo(todoId) {
        let todoArray = retrieveTodosFromLocalStorage();

        for (let i = 0; i < todoArray.length; i++) {
            if (todoArray[i].id === todoId) {
                todoArray.splice(i, 1);
            }
        }

        updateTodosOfLocalStorage(todoArray);
    };

    updateTodoStatus(todoId) {
        let todoArray = retrieveTodosFromLocalStorage();

        for (let i = 0; i < todoArray.length; i++) {
            if (todoArray[i].id === todoId) {
                todoArray[i].isCompleted = true;
            }
        }

        updateTodosOfLocalStorage(todoArray);
    };

    editTodo(title, description, dueDate, priority, todoId) {
        this.createTodos(title, description, dueDate, priority);
        this.deleteTodo(todoId);
    }
};

function generateTodoId() {
    let todoId = storeTodoIdInLocalStorage();
    todoId++;
    updateTodoIdInLocalStorage(todoId);
    return todoId;
}

const mgtTodo = new manageTodos;

mgtTodo.updateTodoStatus(10);


export { manageTodos };