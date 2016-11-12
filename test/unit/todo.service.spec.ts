/* tslint:disable:no-unused-variable */

import { inject } from 'aurelia-framework';
import { Todo } from '../../src/todo';
import { Container } from "aurelia-dependency-injection";
import { TodoService } from '../../src/todo.service';

describe('Service: Todo', () => {
  let container = new Container();
  beforeEach(() => {
    container.registerTransient(TodoService, () => new TodoService());
  });

  describe('#getAllTodos()', () => {
    it('should ...', ()  => {
      let service = container.get(TodoService);
      expect(service).toBeTruthy();
    });

    it('should return an empty array by default', () => {
      let service = container.get(TodoService);
      expect(service.getAllTodos()).toEqual([]);
    });

    it('should return all todos', () => {
      let service = container.get(TodoService);
      let todo1 = new Todo({description: 'Task 1', done: false});
      let todo2 = new Todo({description: 'Task 2', done: true});
      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
    });
  });

  describe('#save(todo)', () => {
    it('should remove todo with the corresponding id', () => {
      let service = container.get(TodoService);
      let todo1 = new Todo({description: 'Task 1', done: false});
      let todo2 = new Todo({description: 'Task 2', done: true});
      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
      service.deleteTodoById(1);
      expect(service.getAllTodos()).toEqual([todo2]);
      service.deleteTodoById(2);
      expect(service.getAllTodos()).toEqual([]);
    });

    it('should not removing anything if todo with corresponding id is not found', () => {
      let service = container.get(TodoService);
      let todo1 = new Todo({description: 'Hello 1', done: false});
      let todo2 = new Todo({description: 'Hello 2', done: true});
      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
      service.deleteTodoById(3);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
    });
  });

  describe('#updateTodoById(id, values)', () => {

    it('should return todo with the corresponding id and updated data', () => {
      let service = container.get(TodoService);
      let todo = new Todo({description: 'Hello 1', done: false});
      service.addTodo(todo);
      let updatedTodo = service.updateTodoById(1, {
        description: 'new description'
      });
      expect(updatedTodo.description).toEqual('new description');
    });

    it('should return null if todo is not found', () => {
      let service = container.get(TodoService);
      let todo = new Todo({description: 'Hello 1', done: false});
      service.addTodo(todo);
      let updatedTodo = service.updateTodoById(2, {
        description: 'new description'
      });
      expect(updatedTodo).toEqual(null);
    });

    describe('#toggleTodoDone(todo)', () => {

      it('should return the updated todo with inverse complete status', () => {
      let service = container.get(TodoService);
        let todo = new Todo({description: 'Hello 1', done: false});
        service.addTodo(todo);
        let updatedTodo = service.toggleTodoDone(todo);
        expect(updatedTodo.done).toEqual(true);
        service.toggleTodoDone(todo);
        expect(updatedTodo.done).toEqual(false);
      });
    });
  });
});
