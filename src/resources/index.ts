import {FrameworkConfiguration} from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    "./elements/todo-app",
    "./attributes/keyup-enter"
  ]);
}
