'use strict';
var vscode_1 = require('vscode');
var TodoCommands_1 = require('./TodoCommands');
var TodoCompletionItemProvider_1 = require('./TodoCompletionItemProvider');
var TodoDocumentDecorator_1 = require('./TodoDocumentDecorator');
var TodoCodeActionProvider_1 = require('./TodoCodeActionProvider');
function activate(context) {
    context.subscriptions.push(vscode_1.languages.registerCompletionItemProvider('todo', new TodoCompletionItemProvider_1.default(), '@'));
    context.subscriptions.push(vscode_1.languages.registerCodeActionsProvider('todo', new TodoCodeActionProvider_1.default()));
    vscode_1.languages.setLanguageConfiguration('todo', {
        wordPattern: /(-?\d*\.\d\w*)|([^\-\`\~\!\#\%\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
        indentationRules: {
            increaseIndentPattern: /^\s*\w+.+:\s*$/,
            decreaseIndentPattern: /^\uffff$/ //Does not match any
        }
    });
    var todoCommands = new TodoCommands_1.TodoCommands();
    context.subscriptions.push(todoCommands.registerNewTaskCommand());
    context.subscriptions.push(todoCommands.registerCompleteTaskCommand());
    context.subscriptions.push(todoCommands.registerCancelTaskCommand());
    context.subscriptions.push(vscode_1.workspace.onDidChangeTextDocument(function (e) {
        _decorateEditor(true);
    }));
    vscode_1.window.onDidChangeActiveTextEditor(function (editor) {
        _decorateEditor();
    }, null, context.subscriptions);
    _decorateEditor();
}
exports.activate = activate;
function _decorateEditor(delayed) {
    var editor = vscode_1.window.activeTextEditor;
    if (editor && "todo" === editor.document.languageId) {
        new TodoDocumentDecorator_1.default(editor).performDecoration(delayed);
    }
}
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=TodoExtensionMain.js.map