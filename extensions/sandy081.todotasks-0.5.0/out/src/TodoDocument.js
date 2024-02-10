'use strict';
var vscode_1 = require('vscode');
var TodoDocument = (function () {
    function TodoDocument(_textDocument) {
        this._textDocument = _textDocument;
    }
    TodoDocument.prototype.getProject = function (pos) {
        var line = this._textDocument.lineAt(pos.line);
        var projectText = line.text.trim();
        if (projectText.endsWith(TodoDocument.SYMBOL_PROJECT)) {
            return new Project(line);
        }
        return null;
    };
    TodoDocument.prototype.getTasks = function () {
        var result = [];
        var text = this._textDocument.getText();
        var regEx = /^\s*[☐|✘|✔]/gm;
        var match;
        while (match = regEx.exec(text)) {
            var line = this._textDocument.lineAt(this._textDocument.positionAt(match.index + 1).line);
            result.push(new Task(line));
        }
        return result;
    };
    TodoDocument.prototype.getTask = function (pos) {
        if (!this.isTask(pos)) {
            return null;
        }
        var line = this._textDocument.lineAt(pos.line);
        return new Task(line);
    };
    TodoDocument.prototype.isTask = function (pos) {
        var task = this._textDocument.lineAt(pos.line).text.trim();
        return task.startsWith(TodoDocument.SYMBOL_NEW_TASK)
            || task.startsWith(TodoDocument.SYMBOL_CANCEL_TASK)
            || task.startsWith(TodoDocument.SYMBOL_DONE_TASK);
    };
    TodoDocument.toTag = function (tagName) {
        return TodoDocument.SYMBOL_TAG + tagName;
    };
    TodoDocument.SYMBOL_PROJECT = ":";
    TodoDocument.SYMBOL_NEW_TASK = "☐";
    TodoDocument.SYMBOL_DONE_TASK = "✔";
    TodoDocument.SYMBOL_CANCEL_TASK = "✘";
    TodoDocument.SYMBOL_TAG = "@";
    TodoDocument.TAG_CRITICAL = "critical";
    TodoDocument.TAG_HIGH = "high";
    TodoDocument.TAG_LOW = "low";
    TodoDocument.TAG_TODAY = "today";
    TodoDocument.ACTION_DONE = "done";
    TodoDocument.ACTION_CANCELLED = "cancelled";
    return TodoDocument;
}());
exports.TodoDocument = TodoDocument;
var Task = (function () {
    function Task(taskLine) {
        this.taskLine = taskLine;
        this.taskText = taskLine.text.trim();
    }
    Task.prototype.getDescription = function () {
        if (this.isDone()) {
            var index_1 = this.taskText.indexOf(TodoDocument.toTag(TodoDocument.ACTION_DONE));
            return index_1 !== -1 ? this.taskText.substring(TodoDocument.SYMBOL_DONE_TASK.length, index_1).trim()
                : this.taskText.substring(TodoDocument.SYMBOL_DONE_TASK.length).trim();
        }
        if (this.isCancelled()) {
            var index = this.taskText.indexOf(TodoDocument.toTag(TodoDocument.ACTION_CANCELLED));
            return index !== -1 ? this.taskText.substring(TodoDocument.SYMBOL_CANCEL_TASK.length, index).trim()
                : this.taskText.substring(TodoDocument.SYMBOL_CANCEL_TASK.length).trim();
        }
        return this.taskText.substring(TodoDocument.SYMBOL_NEW_TASK.length).trim();
    };
    Task.prototype.isEmpty = function () {
        return !this.getDescription().trim();
    };
    Task.prototype.isDone = function () {
        return this.taskText.indexOf(TodoDocument.SYMBOL_DONE_TASK) !== -1;
    };
    Task.prototype.isCancelled = function () {
        return this.taskText.indexOf(TodoDocument.SYMBOL_CANCEL_TASK) !== -1;
    };
    Task.prototype.hasTag = function (tag) {
        return this.taskText.toLocaleLowerCase().indexOf(TodoDocument.toTag(tag).toLocaleLowerCase()) !== -1;
    };
    Task.prototype.getTagRanges = function (tag) {
        var result = [];
        var regEx = /@[^@\s]+/g;
        var match;
        while (match = regEx.exec(this.taskText)) {
            if (TodoDocument.toTag(tag).toLocaleLowerCase() === match[0].toLocaleLowerCase()) {
                var start = this.taskLine.range.start;
                var lineText = this.taskLine.text;
                var startPosition = new vscode_1.Position(start.line, this.taskLine.firstNonWhitespaceCharacterIndex + match.index);
                var endPosition = new vscode_1.Position(start.line, this.taskLine.firstNonWhitespaceCharacterIndex + match.index + match[0].length);
                result.push(new vscode_1.Range(startPosition, endPosition));
            }
        }
        return result;
    };
    Task.prototype.getTags = function () {
        var result = [];
        var regEx = /@[^@\s]+/g;
        var match;
        while (match = regEx.exec(this.taskText)) {
            if (TodoDocument.toTag(TodoDocument.ACTION_CANCELLED) !== match[0] && TodoDocument.toTag(TodoDocument.ACTION_DONE) !== match[0]) {
                result.push(match[0]);
            }
        }
        return result;
    };
    Task.prototype.getTagsRanges = function () {
        var result = [];
        var regEx = /@[^@\s]+/g;
        var match;
        while (match = regEx.exec(this.taskText)) {
            if (TodoDocument.toTag(TodoDocument.ACTION_CANCELLED) !== match[0] && TodoDocument.toTag(TodoDocument.ACTION_DONE) !== match[0]) {
                var start = this.taskLine.range.start;
                var lineText = this.taskLine.text;
                var startPosition = new vscode_1.Position(start.line, this.taskLine.firstNonWhitespaceCharacterIndex + match.index);
                var endPosition = new vscode_1.Position(start.line, this.taskLine.firstNonWhitespaceCharacterIndex + match.index + match[0].length);
                result.push(new vscode_1.Range(startPosition, endPosition));
            }
        }
        return result;
    };
    return Task;
}());
exports.Task = Task;
var Project = (function () {
    function Project(line) {
        this.line = line;
    }
    return Project;
}());
exports.Project = Project;
//# sourceMappingURL=TodoDocument.js.map