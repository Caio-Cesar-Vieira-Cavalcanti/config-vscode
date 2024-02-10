'use strict';
var vscode_1 = require('vscode');
var TodoDocument_1 = require('./TodoDocument');
var TodoDocumentDecorator_1 = require('./TodoDocumentDecorator');
var TodoDocumentEditor = (function () {
    function TodoDocumentEditor(_textEditor, _textEditorEdit) {
        this._textEditor = _textEditor;
        this._textEditorEdit = _textEditorEdit;
    }
    TodoDocumentEditor.prototype.createNewTask = function () {
        var todoDocument = new TodoDocument_1.TodoDocument(this._textEditor.document);
        var task = todoDocument.getTask(this._textEditor.selection.active);
        if (task) {
            // TODO: Create task in the next line
            return;
        }
        var taskLine = this._textEditor.document.lineAt(this._textEditor.selection.active);
        var taskDescription = taskLine.text.trim();
        this.updateTask(taskLine, taskDescription, TodoDocument_1.TodoDocument.SYMBOL_NEW_TASK);
    };
    TodoDocumentEditor.prototype.completeCurrentTask = function () {
        var todoDocument = new TodoDocument_1.TodoDocument(this._textEditor.document);
        var pos = this._textEditor.selection.active;
        var task = todoDocument.getTask(pos);
        if (!task || task.isEmpty()) {
            return;
        }
        if (task.isDone()) {
            this.updateTask(task.taskLine, task.getDescription(), TodoDocument_1.TodoDocument.SYMBOL_NEW_TASK);
            return;
        }
        this.updateTask(task.taskLine, task.getDescription(), TodoDocument_1.TodoDocument.SYMBOL_DONE_TASK, TodoDocument_1.TodoDocument.ACTION_DONE);
    };
    TodoDocumentEditor.prototype.cancelCurrentTask = function () {
        var todoDocument = new TodoDocument_1.TodoDocument(this._textEditor.document);
        var pos = this._textEditor.selection.active;
        var task = todoDocument.getTask(pos);
        if (!task) {
            return;
        }
        if (task.isEmpty()) {
            return;
        }
        if (task.isDone()) {
            return;
        }
        if (task.isCancelled()) {
            return;
        }
        this.updateTask(task.taskLine, task.getDescription(), TodoDocument_1.TodoDocument.SYMBOL_CANCEL_TASK, TodoDocument_1.TodoDocument.ACTION_CANCELLED);
    };
    TodoDocumentEditor.prototype.updateTask = function (taskLine, taskDescription, symbol, tag) {
        var timestamp = new Date();
        this._textEditorEdit.delete(new vscode_1.Range(new vscode_1.Position(taskLine.lineNumber, taskLine.firstNonWhitespaceCharacterIndex), taskLine.range.end));
        this.insertTask(new vscode_1.Position(taskLine.lineNumber, taskLine.firstNonWhitespaceCharacterIndex), symbol + " " + taskDescription + (tag ? (" " + TodoDocument_1.TodoDocument.toTag(tag) + ' (' + timestamp.toLocaleString() + ')') : ""));
    };
    TodoDocumentEditor.prototype.insertTask = function (pos, task) {
        this._textEditorEdit.insert(pos, task);
        new TodoDocumentDecorator_1.default(this._textEditor).performDecoration();
    };
    return TodoDocumentEditor;
}());
exports.TodoDocumentEditor = TodoDocumentEditor;
//# sourceMappingURL=TodoDocumentEditor.js.map