import { format } from 'date-fns';
import { storeTodo, getAllTodos, updateTodos,  storeTodoId, updateTodoId  } from './storage-todo.js';

class todo {

    constructor (title, description, dueDate, priority, notes, project) {
        this.id = generateUUID(),
        this.title = title,
        this.description = description,
        this.dueDate = dueDate,
        this.priority = priority,
        this.isCompleted = false,
        this.notes = notes,
        this.project = project
    };

    createTodos () {
        storeTodo(this);
    };

    getTodo(todoId) {
        let todoArray = getAllTodos();

        for (let i = 0; i < todoArray.length; i++) {
            if (todoArray[i].id === todoId) {
                return todoArray[i];
            }
        }
    }

    deleteTodo(todoId) {
        let todoArray = getAllTodos();

        for (let i = 0; i < todoArray.length; i++) {
            if (todoArray[i].id === todoId) {
                todoArray.splice(i, 1);
            }
        }

        updateTodos(todoArray);
    };

    updateTodoStatus(todoId) {
        let todoArray = getAllTodos();

        for (let i = 0; i < todoArray.length; i++) {
            if (todoArray[i].id === todoId) {
                todoArray[i].isCompleted = true;
            }
        }

        updateTodos(todoArray);
    };

    updateTodo(todoId, title, description, dueDate, priority, notes, project) {
        
        let todoArray = getAllTodos();

        for (let i = 0; i < todoArray.length; i++) {
            if (todoArray[i].id === todoId) {
                todoArray[i].title = title,
                todoArray[i].description = description,
                todoArray[i].dueDate = dueDate,
                todoArray[i].priority = priority,
                todoArray[i].notes = notes,
                todoArray[i].project = project

            }
        }
        updateTodos(todoArray);
    }
};

// UUID : Universally Unique Identifier using crypto global object
const generateUUID = () => (crypto.randomUUID());

export default todo;