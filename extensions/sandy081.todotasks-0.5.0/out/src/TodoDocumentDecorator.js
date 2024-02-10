'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var vscode_1 = require('vscode');
var TodoDocument_1 = require('./TodoDocument');
var TodoDocumentEditor = (function () {
    function TodoDocumentEditor(_textEditor) {
        this._textEditor = _textEditor;
        this.timeout = null;
    }
    TodoDocumentEditor.prototype.performDecoration = function (delayed) {
        var _this = this;
        if (delayed) {
            if (this.timeout) {
                clearTimeout(this.timeout);
            }
            this.timeout = setTimeout(function () { return _this.doPerform(); }, 200);
        }
        else {
            this.doPerform();
        }
    };
    TodoDocumentEditor.prototype.doPerform = function () {
        var _this = this;
        var todoDocument = new TodoDocument_1.TodoDocument(this._textEditor.document);
        var decorationTypes = new TaskDecorator().getDecorationTypes(todoDocument.getTasks());
        decorationTypes.forEach(function (decorationTypeWithRanges) {
            _this._textEditor.setDecorations(decorationTypeWithRanges.decorationType, decorationTypeWithRanges.ranges);
        }, this);
    };
    return TodoDocumentEditor;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TodoDocumentEditor;
var LineDecorator = (function () {
    function LineDecorator() {
    }
    LineDecorator.prototype.getRange = function (text, line) {
        var start = line.range.start;
        var lineText = line.text;
        var symbolIndex = lineText.indexOf(text);
        var startPositionToDecorate = new vscode_1.Position(start.line, symbolIndex);
        var endPositionToDecorate = new vscode_1.Position(start.line, symbolIndex + text.length);
        return new vscode_1.Range(startPositionToDecorate, endPositionToDecorate);
    };
    return LineDecorator;
}());
var TaskDecorator = (function () {
    function TaskDecorator() {
    }
    TaskDecorator.prototype.getDecorationTypes = function (tasks) {
        var result = [];
        result = result.concat(new DoneTasksDecorator().getDecorationTypes(tasks));
        result = result.concat(new CancelTasksDecorator().getDecorationTypes(tasks));
        result = result.concat(new TagsDecorator().getDecorationTypes(tasks));
        return result;
    };
    return TaskDecorator;
}());
var DoneTasksDecorator = (function (_super) {
    __extends(DoneTasksDecorator, _super);
    function DoneTasksDecorator() {
        _super.apply(this, arguments);
    }
    DoneTasksDecorator.prototype.getDecorationTypes = function (tasks) {
        var _this = this;
        var doneSymbolRanges = [];
        var doneActionRanges = [];
        var tagsRanges = [];
        tasks.forEach(function (task) {
            if (task.isDone()) {
                doneSymbolRanges.push(_this.getDoneSymbolRange(task));
                tagsRanges = tagsRanges.concat(task.getTagsRanges());
                doneActionRanges.push(_this.getDoneActionRange(task));
            }
        }, this);
        return [{ decorationType: DoneTasksDecorator.DECORATOR_DONE_SYMBOL, ranges: doneSymbolRanges },
            { decorationType: DoneTasksDecorator.DECORATOR_TAG, ranges: tagsRanges },
            { decorationType: DoneTasksDecorator.DECORATOR_DONE_ACTION, ranges: doneActionRanges }];
    };
    DoneTasksDecorator.prototype.getDoneSymbolRange = function (doneTask) {
        return _super.prototype.getRange.call(this, TodoDocument_1.TodoDocument.SYMBOL_DONE_TASK, doneTask.taskLine);
    };
    DoneTasksDecorator.prototype.getDoneActionRange = function (doneTask) {
        return _super.prototype.getRange.call(this, TodoDocument_1.TodoDocument.toTag(TodoDocument_1.TodoDocument.ACTION_DONE), doneTask.taskLine);
    };
    DoneTasksDecorator.DECORATOR_DONE_SYMBOL = vscode_1.window.createTextEditorDecorationType({
        light: {
            color: '#00723e',
        },
        dark: {
            color: '#00723e',
        }
    });
    DoneTasksDecorator.DECORATOR_DONE_ACTION = vscode_1.window.createTextEditorDecorationType({
        light: {
            color: '#ccc',
        },
        dark: {
            color: '#7D7D7D',
        }
    });
    DoneTasksDecorator.DECORATOR_TAG = vscode_1.window.createTextEditorDecorationType({
        light: {
            color: '#ccc',
        },
        dark: {
            color: '#7D7D7D',
        }
    });
    return DoneTasksDecorator;
}(LineDecorator));
var CancelTasksDecorator = (function (_super) {
    __extends(CancelTasksDecorator, _super);
    function CancelTasksDecorator() {
        _super.apply(this, arguments);
    }
    CancelTasksDecorator.prototype.getDecorationTypes = function (tasks) {
        var _this = this;
        var doneSymbolRanges = [];
        var doneActionRanges = [];
        var tagsRanges = [];
        tasks.forEach(function (task) {
            if (task.isCancelled()) {
                doneSymbolRanges.push(_this.getCancelSymbolRange(task));
                tagsRanges = tagsRanges.concat(task.getTagsRanges());
                doneActionRanges.push(_this.getCancelActionRange(task));
            }
        }, this);
        return [{ decorationType: CancelTasksDecorator.DECORATOR_CANCEL_SYMBOL, ranges: doneSymbolRanges },
            { decorationType: CancelTasksDecorator.DECORATOR_TAG, ranges: tagsRanges },
            { decorationType: CancelTasksDecorator.DECORATOR_CANCEL_ACTION, ranges: doneActionRanges }];
    };
    CancelTasksDecorator.prototype.getCancelSymbolRange = function (doneTask) {
        return _super.prototype.getRange.call(this, TodoDocument_1.TodoDocument.SYMBOL_CANCEL_TASK, doneTask.taskLine);
    };
    CancelTasksDecorator.prototype.getCancelActionRange = function (doneTask) {
        return _super.prototype.getRange.call(this, TodoDocument_1.TodoDocument.toTag(TodoDocument_1.TodoDocument.ACTION_CANCELLED), doneTask.taskLine);
    };
    CancelTasksDecorator.DECORATOR_CANCEL_SYMBOL = vscode_1.window.createTextEditorDecorationType({
        light: {
            color: 'red',
        },
        dark: {
            color: 'red',
        }
    });
    CancelTasksDecorator.DECORATOR_CANCEL_ACTION = vscode_1.window.createTextEditorDecorationType({
        light: {
            color: '#ccc',
        },
        dark: {
            color: '#7D7D7D',
        }
    });
    CancelTasksDecorator.DECORATOR_TAG = vscode_1.window.createTextEditorDecorationType({
        light: {
            color: '#ccc',
        },
        dark: {
            color: '#7D7D7D',
        }
    });
    return CancelTasksDecorator;
}(LineDecorator));
var TagsDecorator = (function (_super) {
    __extends(TagsDecorator, _super);
    function TagsDecorator() {
        _super.apply(this, arguments);
    }
    TagsDecorator.prototype.getDecorationTypes = function (tasks) {
        var criticalTagRanges = [];
        var highTagRanges = [];
        var lowTagRanges = [];
        var todayTagRanges = [];
        tasks.forEach(function (task) {
            if (!task.isCancelled() && !task.isDone()) {
                criticalTagRanges = criticalTagRanges.concat(task.getTagRanges(TodoDocument_1.TodoDocument.TAG_CRITICAL));
                highTagRanges = highTagRanges.concat(task.getTagRanges(TodoDocument_1.TodoDocument.TAG_HIGH));
                lowTagRanges = lowTagRanges.concat(task.getTagRanges(TodoDocument_1.TodoDocument.TAG_LOW));
                todayTagRanges = todayTagRanges.concat(task.getTagRanges(TodoDocument_1.TodoDocument.TAG_TODAY));
            }
        }, this);
        return [{ decorationType: TagsDecorator.DECORATOR_CRITICAL_TAG, ranges: criticalTagRanges },
            { decorationType: TagsDecorator.DECORATOR_HIGH_TAG, ranges: highTagRanges },
            { decorationType: TagsDecorator.DECORATOR_TODAY_TAG, ranges: todayTagRanges },
            { decorationType: TagsDecorator.DECORATOR_LOW_TAG, ranges: lowTagRanges }];
    };
    TagsDecorator.DECORATOR_CRITICAL_TAG = vscode_1.window.createTextEditorDecorationType({
        backgroundColor: '#FF0000',
        color: '#000'
    });
    TagsDecorator.DECORATOR_HIGH_TAG = vscode_1.window.createTextEditorDecorationType({
        backgroundColor: '#FF7F00',
        color: '#000'
    });
    TagsDecorator.DECORATOR_LOW_TAG = vscode_1.window.createTextEditorDecorationType({
        light: {
            backgroundColor: '#000',
            color: '#fff'
        },
        dark: {
            backgroundColor: '#fff',
            color: '#000',
        }
    });
    TagsDecorator.DECORATOR_TODAY_TAG = vscode_1.window.createTextEditorDecorationType({
        light: {
            backgroundColor: '#EADD4E',
            color: '#000'
        },
        dark: {
            backgroundColor: '#EADD4E',
            color: '#000',
        }
    });
    return TagsDecorator;
}(LineDecorator));
//# sourceMappingURL=TodoDocumentDecorator.js.map