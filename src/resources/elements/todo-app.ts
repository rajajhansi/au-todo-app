import {inject} from 'aurelia-framework';
import {Todo} from '../../todo';
import {TodoService} from '../../todo.service';

@inject(TodoService)
export class TodoApp {
  newTodo: Todo = new Todo();

  constructor(private todoService: TodoService) { }

  addTodo() {
    this.todoService.addTodo(this.newTodo);
    this.newTodo = new Todo();
  }

  toggleTodoDone(todo) {
    this.todoService.toggleTodoDone(todo);
  }

  removeTodo(todo) {
    this.todoService.deleteTodoById(todo.id);
  }

  get todos() {
    return this.todoService.getAllTodos();
  }
}

