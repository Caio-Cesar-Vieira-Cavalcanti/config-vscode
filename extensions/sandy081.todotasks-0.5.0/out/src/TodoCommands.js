'use strict';
var vscode_1 = require('vscode');
var TodoDocument_1 = require('./TodoDocument');
var TodoDocumentEditor_1 = require('./TodoDocumentEditor');
var TodoCommands = (function () {
    function TodoCommands() {
    }
    TodoCommands.prototype.registerNewTaskCommand = function () {
        var _this = this;
        return vscode_1.commands.registerTextEditorCommand(TodoCommands.NEW_TASK, function (textEditor, edit) {
            if (_this.isSupportedLanguage(textEditor)) {
                new TodoDocumentEditor_1.TodoDocumentEditor(textEditor, edit).createNewTask();
            }
        });
    };
    TodoCommands.prototype.registerCompleteTaskCommand = function () {
        var _this = this;
        return vscode_1.commands.registerTextEditorCommand(TodoCommands.COMPLETE_TASK, function (textEditor, edit) {
            if (_this.isSupportedLanguage(textEditor)) {
                new TodoDocumentEditor_1.TodoDocumentEditor(textEditor, edit).completeCurrentTask();
            }
        });
    };
    TodoCommands.prototype.registerCancelTaskCommand = function () {
        var _this = this;
        return vscode_1.commands.registerTextEditorCommand(TodoCommands.CANCEL_TASK, function (textEditor, edit) {
            if (_this.isSupportedLanguage(textEditor)) {
                new TodoDocumentEditor_1.TodoDocumentEditor(textEditor, edit).cancelCurrentTask();
            }
        });
    };
    TodoCommands.prototype.isSupportedLanguage = function (textEditor) {
        return "todo" === textEditor.document.languageId;
    };
    TodoCommands.NEW_TASK = "task.new";
    TodoCommands.COMPLETE_TASK = "task.complete";
    TodoCommands.CANCEL_TASK = "task.cancel";
    return TodoCommands;
}());
exports.TodoCommands = TodoCommands;
var TodoCommandsProvider = (function () {
    function TodoCommandsProvider() {
    }
    TodoCommandsProvider.getCommands = function (filter) {
        var filtered = TodoCommandsProvider.COMMANDS.filter(function (commandObject, index, collection) {
            return !filter || commandObject.label.indexOf(filter) !== -1;
        });
        var result = filtered.map(function (commandObject, index, collection) {
            var completionItem = new vscode_1.CompletionItem(commandObject.label);
            return completionItem;
        });
        return Promise.resolve(result);
    };
    TodoCommandsProvider.COMMANDS = [{ label: TodoDocument_1.TodoDocument.toTag(TodoDocument_1.TodoDocument.ACTION_DONE), command: "Ctrl+Shift+d" },
        { label: TodoDocument_1.TodoDocument.toTag(TodoDocument_1.TodoDocument.ACTION_CANCELLED), command: "Ctrl+Shift+c" }];
    return TodoCommandsProvider;
}());
exports.TodoCommandsProvider = TodoCommandsProvider;
//# sourceMappingURL=TodoCommands.js.map