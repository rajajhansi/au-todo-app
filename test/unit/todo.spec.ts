/* tslint:disable:no-unused-variable */
import {Todo} from '../../src/todo';

describe('Todo', () => {

  it('should create an instance', () => {
    expect(new Todo()).toBeTruthy();
  });

  it('should accept values in the constructor', () => {
    let todo = new Todo({
      description: 'hello',
      done: true
    });
    expect(todo.description).toEqual('hello');
    expect(todo.done).toEqual(true);
  });

  it('should ignore values sent in wrong properties in the constructor', () => {
    let todo = new Todo({
      title: 'hello',
      done: true
    });
    expect(todo.description).toEqual('');
    expect(todo.done).toEqual(true);
  });

});