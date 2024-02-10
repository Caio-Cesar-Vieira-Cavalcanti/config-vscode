'use strict';
var TodoDocument_1 = require('./TodoDocument');
var TodoCodeActionProvider = (function () {
    function TodoCodeActionProvider() {
    }
    TodoCodeActionProvider.prototype.provideCodeActions = function (document, range, context, token) {
        var todoDocument = new TodoDocument_1.TodoDocument(document);
        if (todoDocument.getProject(range.start)) {
            // No code actions on a project
            return [];
        }
        var task = todoDocument.getTask(range.start);
        if (task) {
            if (task.isDone()) {
                return this.getDoneTaskCodeActions(task);
            }
            if (task.isCancelled()) {
                return this.getCancelledTaskCodeActions(task);
            }
            return this.getPendingTaskCodeActions(task);
        }
        var taskDescription = document.lineAt(range.start).text.trim();
        return this.getNewTaskCodeActions(taskDescription);
    };
    TodoCodeActionProvider.prototype.getNewTaskCodeActions = function (taskDescription) {
        if (taskDescription) {
            return [{
                    'title': "Convert to a task",
                    'command': "task.new"
                }];
        }
        return [{
                'title': "Create a task",
                'command': "task.new"
            }];
    };
    TodoCodeActionProvider.prototype.getPendingTaskCodeActions = function (task) {
        if (task.isEmpty()) {
            return [];
        }
        return [{
                'title': "Complete the task",
                'command': "task.complete"
            }, {
                'title': "Cancel the task",
                'command': "task.cancel"
            }];
    };
    TodoCodeActionProvider.prototype.getDoneTaskCodeActions = function (doneTask) {
        return [{
                'title': "Make task pending",
                'command': "task.complete"
            }];
    };
    TodoCodeActionProvider.prototype.getCancelledTaskCodeActions = function (doneTask) {
        return [{
                'title': "Complete the task",
                'command': "task.complete"
            }];
    };
    return TodoCodeActionProvider;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TodoCodeActionProvider;
//# sourceMappingURL=TodoCodeActionProvider.js.map