import { Todo } from './todo';

export class TodoService {

  lastId: number = 0;

  todos: Todo[] = [];

  constructor() { }

  addTodo(todo: Todo) : TodoService {
    if(!todo.id) {
      todo.id = ++this.lastId;
    }
    this.todos.push(todo);
    return this;
  }

  deleteTodo(id: number) : TodoService {
    this.todos = this.todos.filter(todo => todo.id !== id);
    return this;
  }

  updateTodo(id: number, values: Object = {}): Todo {
    let todo = this.getTodo(id);
    if(!todo) {
      return null;
    }
    Object.assign(todo, values);
    return todo;
  }

  getAllTodos(): Todo[] {
    return this.todos;
  }

  getTodo(id: number): Todo {
    return this.todos.filter(todo => todo.id === id).pop();
  }

  toggleTodoDone(todo: Todo): Todo {
    let updatedTodo = this.updateTodo(todo.id, { done: !todo.done });
    return updatedTodo;
  }

  filterTodo(filterCriteria: string) : Todo[] {
    switch(filterCriteria) {
      case "active":
        return this.todos.filter((t: Todo) => !t.done);
      case "completed":
        return this.todos.filter((t: Todo) => t.done);
      case "all":
      default:
        return this.todos;
    }     
  }

  completeAllTodos() {
    this.todos.forEach((t: Todo) => t.done = true);
  }

  removeAllTodos() {
    this.todos.splice(0);
  }
  
  removeDoneTodos() {
    this.todos = this.todos.filter((todo: Todo) => !todo.done);
  }
}
