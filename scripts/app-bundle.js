define('todo',["require", "exports"], function (require, exports) {
    "use strict";
    var Todo = (function () {
        function Todo(values) {
            if (values === void 0) { values = {}; }
            this.description = "";
            this.done = false;
            Object.assign(this, values);
        }
        return Todo;
    }());
    exports.Todo = Todo;
});

define('todo.service',["require", "exports"], function (require, exports) {
    "use strict";
    var TodoService = (function () {
        function TodoService() {
            this.lastId = 0;
            this.todos = [];
        }
        TodoService.prototype.addTodo = function (todo) {
            if (!todo.id) {
                todo.id = ++this.lastId;
            }
            this.todos.push(todo);
            return this;
        };
        TodoService.prototype.deleteTodo = function (id) {
            this.todos = this.todos.filter(function (todo) { return todo.id !== id; });
            return this;
        };
        TodoService.prototype.updateTodo = function (id, values) {
            if (values === void 0) { values = {}; }
            var todo = this.getTodo(id);
            if (!todo) {
                return null;
            }
            Object.assign(todo, values);
            return todo;
        };
        TodoService.prototype.getAllTodos = function () {
            return this.todos;
        };
        TodoService.prototype.getTodo = function (id) {
            return this.todos.filter(function (todo) { return todo.id === id; }).pop();
        };
        TodoService.prototype.toggleTodoDone = function (todo) {
            var updatedTodo = this.updateTodo(todo.id, { done: !todo.done });
            return updatedTodo;
        };
        TodoService.prototype.filterTodo = function (filterCriteria) {
            switch (filterCriteria) {
                case "active":
                    return this.todos.filter(function (t) { return !t.done; });
                case "completed":
                    return this.todos.filter(function (t) { return t.done; });
                case "all":
                default:
                    return this.todos;
            }
        };
        TodoService.prototype.completeAllTodos = function () {
            this.todos.forEach(function (t) { return t.done = true; });
        };
        TodoService.prototype.removeAllTodos = function () {
            this.todos.splice(0);
        };
        TodoService.prototype.removeDoneTodos = function () {
            this.todos = this.todos.filter(function (todo) { return !todo.done; });
        };
        return TodoService;
    }());
    exports.TodoService = TodoService;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('resources/elements/todo-app',["require", "exports", 'aurelia-framework', '../../todo', '../../todo.service'], function (require, exports, aurelia_framework_1, todo_1, todo_service_1) {
    "use strict";
    var TodoApp = (function () {
        function TodoApp(todoService) {
            this.todoService = todoService;
            this.newTodo = new todo_1.Todo();
            this.filter = "all";
            this.filteredTodos = [];
        }
        TodoApp.prototype.addTodo = function () {
            this.todoService.addTodo(this.newTodo);
            this.newTodo = new todo_1.Todo();
            this.filterTodo(this.filter);
        };
        TodoApp.prototype.toggleTodoDone = function (todo) {
            this.todoService.toggleTodoDone(todo);
            this.filterTodo(this.filter);
        };
        TodoApp.prototype.removeTodo = function (todo) {
            this.todoService.deleteTodo(todo.id);
            this.filterTodo(this.filter);
        };
        TodoApp.prototype.filterTodo = function (filterCriteria) {
            this.filter = filterCriteria;
            this.filteredTodos = this.todoService.filterTodo(filterCriteria);
        };
        TodoApp.prototype.completeAllTodos = function () {
            this.todoService.completeAllTodos();
            this.filterTodo(this.filter);
        };
        TodoApp.prototype.removeAllTodos = function () {
            this.todoService.removeAllTodos();
            this.filterTodo(this.filter);
        };
        TodoApp.prototype.removeDoneTodos = function () {
            this.todoService.removeDoneTodos();
            this.filterTodo(this.filter);
        };
        TodoApp = __decorate([
            aurelia_framework_1.inject(todo_service_1.TodoService), 
            __metadata('design:paramtypes', [todo_service_1.TodoService])
        ], TodoApp);
        return TodoApp;
    }());
    exports.TodoApp = TodoApp;
});

define('app',["require", "exports"], function (require, exports) {
    "use strict";
    var App = (function () {
        function App() {
            this.message = 'Hello World!';
        }
        return App;
    }());
    exports.App = App;
});

define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});

define('main',["require", "exports", './environment'], function (require, exports, environment_1) {
    "use strict";
    Promise.config({
        warnings: {
            wForgottenReturn: false
        }
    });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .feature('resources');
        if (environment_1.default.debug) {
            aurelia.use.developmentLogging();
        }
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    function configure(config) {
        config.globalResources([
            "./elements/todo-app",
            "./attributes/keyup-enter"
        ]);
    }
    exports.configure = configure;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('resources/attributes/keyup-enter',["require", "exports", 'aurelia-framework'], function (require, exports, aurelia_framework_1) {
    "use strict";
    var KeyupEnterCustomAttribute = (function () {
        function KeyupEnterCustomAttribute(element) {
            var _this = this;
            this.element = element;
            this.enterPressed = function (e) {
                var key = e.which || e.keyCode;
                if (key === 13) {
                    _this.value();
                }
            };
        }
        KeyupEnterCustomAttribute.prototype.attached = function () {
            this.element.addEventListener('keyup', this.enterPressed);
        };
        KeyupEnterCustomAttribute.prototype.detached = function () {
            this.element.removeEventListener('keyup', this.enterPressed);
        };
        KeyupEnterCustomAttribute = __decorate([
            aurelia_framework_1.autoinject(), 
            __metadata('design:paramtypes', [Element])
        ], KeyupEnterCustomAttribute);
        return KeyupEnterCustomAttribute;
    }());
    exports.KeyupEnterCustomAttribute = KeyupEnterCustomAttribute;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./styles.css\"></require>\n  <todo-app></todo-app>\n</template>\n"; });
define('text!styles.css', ['module'], function(module) { module.exports = "/* You can add global styles to this file, and also import other style files */\r\n\r\n@import url('../node_modules/todomvc-common/base.css');\r\n@import url('../node_modules/todomvc-app-css/index.css');\r\n\r\n.app-root-loader{\r\n  text-align: center;\r\n  padding: 30px;\r\n}\r\n\r\n.toolbar {\r\n\tcolor: #777;\r\n  /*background-color: lightslategray;*/\r\n\tpadding: 5px 10px;\r\n\theight: 20px;\r\n\ttext-align: center;\r\n\tborder-top: 1px solid #e6e6e6;\r\n  float: right;\r\n}"; });
define('text!resources/elements/todo-app.html', ['module'], function(module) { module.exports = "<template>  \n  <section class=\"todoapp\">\n  <header class=\"header\">\n    <h1>Todos</h1>\n    <div class=\"toolbar\">\n      <a href=\"#\" click.trigger=\"removeAllTodos()\">\n        Remove All\n      </a> |\n      <a href=\"#\"  click.trigger=\"removeDoneTodos()\">\n        \n        Remove Completed\n      </a> |\n      <a href=\"#\"  click.trigger=\"completeAllTodos()\">\n        Complete All \n      </a>\n    </div>\n    <br/>\n    <input type=\"text\" class=\"new-todo\" placeholder=\"what needs to be done?\" autofocus=\"\" \n      value.bind=\"newTodo.description\" keyup-enter.call=\"addTodo()\">\n  </header>\n\n  <section class=\"main\" show.bind=\"filteredTodos.length > 0\">\n    <ul class=\"todo-list\">\n      <li repeat.for=\"todo of filteredTodos\" class=\"${todo.done ? 'completed' : ''}\">\n        <div class=\"view\">\n          <input type=\"checkbox\" class=\"toggle\" checked.bind=\"todo.done\">\n          <label>${todo.description}</label>\n          <button class=\"destroy\" click.trigger=\"removeTodo(todo)\"></button>\n        </div>\n      </li>\n    </ul>\n  </section>\n\n  <footer class=\"footer\">\n    <span class=\"todo-count\"><strong>${filteredTodos.length}</strong>${filteredTodos.length === 1 ? ' item ': ' items '} left</span>\n    <ul class=\"filters\">\n      <li>\n        <a class=\"${filter == 'all' ? 'selected' : ''}\" href=\"\" click.trigger=\"filterTodo('all')\">All</a>\n      </li>\n      <li>\n        <a class=\"${filter == 'active' ? 'selected' : ''}\" href=\"\" click.trigger=\"filterTodo('active')\">Active</a>\n      </li>\n      <li>\n        <a class=\"${filter == 'completed' ? 'selected' : ''}\" href=\"\" click.trigger=\"filterTodo('completed')\">Completed</a>\n      </li>\n    </ul>\n  </footer>\n</section>\n\n</template>"; });
//# sourceMappingURL=app-bundle.js.map