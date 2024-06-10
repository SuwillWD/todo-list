import { format } from 'date-fns';
import { storeTodoToLocalStorage, retrieveTodosFromLocalStorage, updateTodos,  storeTodoId, updateTodoId  } from './storage.js';

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

        updateTodos(todoArray);
    }
};

function generateTodoId() {
    let todoId = storeTodoId();
    todoId++;
    updateTodoId(todoId);
    return todoId;
}

const mgtTodo = new manageTodos;





export { manageTodos };